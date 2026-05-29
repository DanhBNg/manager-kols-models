<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class TalentController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Profile::query()
            ->public()
            ->with(['user:id,name,type,is_verified,avatar', 'photos', 'videos', 'socialAccounts']);

        $this->applyFilters($query, $request);
        $this->applySort($query, (string) $request->query('sort', 'latest'));

        return response()->json([
            'data' => $query->paginate((int) $request->query('per_page', 12))->items(),
        ]);
    }

    public function show(Profile $profile): JsonResponse
    {
        abort_unless($profile->is_public, 404);

        return response()->json([
            'data' => $profile->load([
                'user:id,name,type,is_verified,avatar',
                'photos',
                'videos',
                'socialAccounts',
            ]),
        ]);
    }

    private function applyFilters(Builder $query, Request $request): void
    {
        if ($request->filled('q')) {
            $keyword = '%'.$request->string('q')->toString().'%';
            $query->where(function (Builder $builder) use ($keyword): void {
                $builder->where('display_name', 'like', $keyword)
                    ->orWhere('bio', 'like', $keyword)
                    ->orWhere('experience', 'like', $keyword);
            });
        }

        if ($request->filled('type')) {
            $query->where('talent_types', 'like', '%"'.$request->string('type')->toString().'"%');
        }

        foreach (['city', 'gender', 'tier'] as $field) {
            if ($request->filled($field)) {
                $query->where($field, $request->query($field));
            }
        }

        if ($request->boolean('verified')) {
            $query->where('verification_status', 'verified');
        }

        if ($request->filled('min_age')) {
            $query->whereDate('birth_date', '<=', Carbon::now()->subYears((int) $request->query('min_age'))->toDateString());
        }

        if ($request->filled('max_age')) {
            $query->whereDate('birth_date', '>=', Carbon::now()->subYears((int) $request->query('max_age') + 1)->addDay()->toDateString());
        }

        if ($request->filled('min_height')) {
            $query->where('height_cm', '>=', (int) $request->query('min_height'));
        }

        if ($request->filled('max_height')) {
            $query->where('height_cm', '<=', (int) $request->query('max_height'));
        }
    }

    private function applySort(Builder $query, string $sort): void
    {
        match ($sort) {
            'rating' => $query->orderByDesc('rating'),
            'completion' => $query->orderByDesc('profile_completion'),
            'match' => $query->orderByDesc('profile_completion')->orderByDesc('rating'),
            default => $query->latest(),
        };
    }
}
