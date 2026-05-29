<?php

namespace App\Filament\Pages;

use App\Services\AdminPasswordService;
use Filament\Actions\Action;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Illuminate\Support\Facades\Auth;

class ChangePassword extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-key';

    protected static ?string $navigationLabel = 'Đổi mật khẩu';

    protected static ?string $title = 'Đổi mật khẩu admin';

    protected static ?int $navigationSort = 99;

    protected static string $view = 'filament.pages.change-password';

    protected static bool $shouldRegisterNavigation = false;

    /**
     * @var array<string, mixed>|null
     */
    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill();
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('current_password')
                    ->label('Mật khẩu hiện tại')
                    ->password()
                    ->revealable()
                    ->required(),
                TextInput::make('password')
                    ->label('Mật khẩu mới')
                    ->password()
                    ->revealable()
                    ->required()
                    ->minLength(8)
                    ->confirmed(),
                TextInput::make('password_confirmation')
                    ->label('Nhập lại mật khẩu mới')
                    ->password()
                    ->revealable()
                    ->required(),
            ])
            ->statePath('data');
    }

    protected function getFormActions(): array
    {
        return [
            Action::make('save')
                ->label('Cập nhật mật khẩu')
                ->submit('save'),
        ];
    }

    public function save(AdminPasswordService $service): void
    {
        $data = $this->form->getState();

        $service->changePassword(Auth::user(), $data['current_password'], $data['password']);

        $this->form->fill();

        Notification::make()
            ->title('Đã cập nhật mật khẩu')
            ->success()
            ->send();
    }
}
