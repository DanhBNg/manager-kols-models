<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProfileResource\Pages;
use App\Models\Profile;
use App\Models\User;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ProfileResource extends Resource
{
    protected static ?string $model = Profile::class;

    protected static ?string $navigationIcon = 'heroicon-o-identification';

    protected static ?string $navigationLabel = 'Hồ sơ talent';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Select::make('user_id')->label('Talent')->options(User::query()->where('type', 'talent')->pluck('name', 'id'))->searchable()->required(),
            TextInput::make('display_name')->label('Tên hiển thị')->required(),
            TextInput::make('slug')->label('Slug')->required(),
            TagsInput::make('talent_types')->label('Loại talent')->required(),
            TextInput::make('city')->label('Thành phố')->required(),
            TextInput::make('gender')->label('Giới tính'),
            TextInput::make('height_cm')->label('Chiều cao')->numeric(),
            TextInput::make('weight_kg')->label('Cân nặng')->numeric(),
            TextInput::make('measurements')->label('Số đo'),
            TagsInput::make('skills')->label('Kỹ năng'),
            Textarea::make('bio')->label('Giới thiệu')->columnSpanFull(),
            Select::make('tier')->label('Tier')->options(['S' => 'S', 'A' => 'A', 'B' => 'B', 'C' => 'C']),
            Select::make('verification_status')->label('Duyệt hồ sơ')->options([
                'pending' => 'Chờ duyệt',
                'verified' => 'Đã duyệt',
                'rejected' => 'Từ chối',
            ])->required(),
            Toggle::make('is_public')->label('Công khai'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('display_name')->label('Talent')->searchable(),
                Tables\Columns\TextColumn::make('user.email')->label('Email')->searchable(),
                Tables\Columns\TextColumn::make('city')->label('Thành phố')->searchable(),
                Tables\Columns\TextColumn::make('tier')->label('Tier')->badge(),
                Tables\Columns\TextColumn::make('profile_completion')->label('% hoàn thiện')->sortable(),
                Tables\Columns\TextColumn::make('verification_status')->label('Duyệt')->badge(),
                Tables\Columns\IconColumn::make('is_public')->label('Công khai')->boolean(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('verification_status')->options([
                    'pending' => 'Chờ duyệt',
                    'verified' => 'Đã duyệt',
                    'rejected' => 'Từ chối',
                ]),
            ])
            ->actions([Tables\Actions\EditAction::make()])
            ->bulkActions([Tables\Actions\DeleteBulkAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProfiles::route('/'),
            'create' => Pages\CreateProfile::route('/create'),
            'edit' => Pages\EditProfile::route('/{record}/edit'),
        ];
    }
}
