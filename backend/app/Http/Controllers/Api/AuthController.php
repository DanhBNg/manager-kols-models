<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    private const SOCIAL_PROVIDERS = ['google', 'facebook'];

    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'max:20', 'unique:users,phone'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'type' => ['required', 'string', Rule::in(['talent', 'brand'])],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'password' => $validated['password'],
            'type' => $validated['type'],
            'status' => 'active',
            'is_verified' => false,
            'is_ghost' => false,
        ]);
        $this->ensureDefaultBusinessProfile($user);

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('auth-token')->plainTextToken,
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'string', 'lowercase', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Thông tin đăng nhập không đúng.'],
            ]);
        }

        $user->forceFill([
            'last_login_at' => now(),
        ])->save();

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('auth-token')->plainTextToken,
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $user = $request->user();
        $token = $user?->currentAccessToken();

        if ($token) {
            $token->delete();
        } else {
            $user?->tokens()->delete();
        }

        auth('sanctum')->forgetUser();

        return response()->json(null, 204);
    }

    public function socialRedirect(Request $request, string $provider): RedirectResponse
    {
        $this->ensureSupportedProvider($provider);

        $type = $this->validatedAccountType($request->query('type', 'talent'));
        $callbackUrl = url("/api/auth/social/{$provider}/callback").'?'.http_build_query([
            'type' => $type,
        ]);

        return Socialite::driver($provider)
            ->stateless()
            ->redirectUrl($callbackUrl)
            ->redirect();
    }

    public function socialCallback(Request $request, string $provider): RedirectResponse
    {
        $this->ensureSupportedProvider($provider);

        $type = $this->validatedAccountType($request->query('type', 'talent'));
        $socialUser = Socialite::driver($provider)->stateless()->user();
        $email = $socialUser->getEmail();

        if (! $email) {
            throw ValidationException::withMessages([
                'email' => ['Tài khoản mạng xã hội chưa cung cấp email.'],
            ]);
        }

        $user = User::where('social_provider', $provider)
            ->where('social_id', $socialUser->getId())
            ->first();

        $isNewUser = false;

        if (! $user) {
            $user = User::firstOrNew(['email' => $email]);
            $isNewUser = ! $user->exists;
        }

        $user->fill([
            'name' => $user->name ?: ($socialUser->getName() ?: $email),
            'email' => $email,
            'password' => $user->password ?: Str::random(32),
            'type' => $user->exists ? $user->type : $type,
            'status' => $user->status ?: 'active',
            'is_verified' => $user->is_verified ?? false,
            'is_ghost' => $user->is_ghost ?? false,
            'last_login_at' => now(),
            'social_provider' => $provider,
            'social_id' => $socialUser->getId(),
            'avatar' => $socialUser->getAvatar(),
        ]);
        $user->save();

        if ($isNewUser) {
            $this->ensureDefaultBusinessProfile($user);
        }

        $token = $user->createToken('auth-token')->plainTextToken;
        $frontendUrl = rtrim((string) config('app.frontend_url'), '/');

        return redirect()->away($frontendUrl.'/auth/social/callback?'.http_build_query([
            'token' => $token,
            'type' => $user->type,
        ]));
    }

    private function ensureSupportedProvider(string $provider): void
    {
        abort_unless(in_array($provider, self::SOCIAL_PROVIDERS, true), 404);
    }

    private function validatedAccountType(mixed $type): string
    {
        return in_array($type, ['talent', 'brand'], true) ? $type : 'talent';
    }

    private function ensureDefaultBusinessProfile(User $user): void
    {
        if ($user->type === 'talent') {
            $user->profile()->firstOrCreate(
                ['user_id' => $user->id],
                [
                    'full_name' => $user->name,
                    'display_name' => $user->name,
                    'slug' => Str::slug($user->name).'-'.$user->id,
                    'talent_types' => ['model'],
                    'city' => 'Chua cap nhat',
                    'profile_completion' => 10,
                    'verification_status' => 'pending',
                    'is_public' => false,
                ]
            );
        }

        if ($user->type === 'brand') {
            $user->partnerProfile()->firstOrCreate(
                ['user_id' => $user->id],
                [
                    'organization_name' => $user->name,
                    'organization_type' => 'brand',
                    'contact_name' => $user->name,
                    'contact_email' => $user->email,
                    'city' => 'Chua cap nhat',
                    'verification_status' => 'pending',
                ]
            );
        }
    }
}
