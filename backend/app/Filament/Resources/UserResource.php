<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms\Form;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';

    protected static ?string $navigationLabel = 'Người dùng';

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('name')->label('Tên')->required()->maxLength(255),
            TextInput::make('email')->label('Email')->email()->required()->maxLength(255),
            TextInput::make('phone')->label('Số điện thoại')->maxLength(20),
            Select::make('type')->label('Loại tài khoản')->options([
                'talent' => 'Talent',
                'brand' => 'Brand',
                'admin' => 'Admin',
            ])->required(),
            Select::make('status')->label('Trạng thái')->options([
                'active' => 'Hoạt động',
                'inactive' => 'Không hoạt động',
                'suspended' => 'Tạm khóa',
            ])->required(),
            Toggle::make('is_verified')->label('Đã xác minh'),
            Toggle::make('is_ghost')->label('Hồ sơ do agency tạo'),
            TextInput::make('password')
                ->label('Mật khẩu mới')
                ->password()
                ->revealable()
                ->minLength(8)
                ->required(fn (string $operation): bool => $operation === 'create')
                ->dehydrateStateUsing(fn (?string $state) => filled($state) ? $state : null)
                ->dehydrated(fn (?string $state) => filled($state)),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->sortable(),
                Tables\Columns\TextColumn::make('name')->label('Tên')->searchable(),
                Tables\Columns\TextColumn::make('email')->label('Email')->searchable(),
                Tables\Columns\TextColumn::make('type')->label('Loại')->badge(),
                Tables\Columns\TextColumn::make('status')->label('Trạng thái')->badge(),
                Tables\Columns\IconColumn::make('is_verified')->label('Xác minh')->boolean(),
                Tables\Columns\TextColumn::make('created_at')->label('Ngày tạo')->dateTime()->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('type')->options([
                    'talent' => 'Talent',
                    'brand' => 'Brand',
                    'admin' => 'Admin',
                ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
