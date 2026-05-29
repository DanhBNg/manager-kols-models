<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PartnerProfileResource\Pages;
use App\Models\PartnerProfile;
use App\Models\User;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PartnerProfileResource extends Resource
{
    protected static ?string $model = PartnerProfile::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-office';

    protected static ?string $navigationLabel = 'Hồ sơ đối tác';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Select::make('user_id')->label('Tài khoản brand')->options(User::query()->where('type', 'brand')->pluck('name', 'id'))->searchable()->required(),
            TextInput::make('organization_name')->label('Tên tổ chức')->required(),
            Select::make('organization_type')->label('Loại tổ chức')->options([
                'brand' => 'Brand',
                'agency' => 'Agency',
                'recruiter' => 'Nhà tuyển dụng',
                'event_organizer' => 'Event organizer',
            ])->required(),
            TextInput::make('industry')->label('Ngành hàng'),
            TextInput::make('contact_name')->label('Người phụ trách')->required(),
            TextInput::make('contact_phone')->label('Số điện thoại'),
            TextInput::make('contact_email')->label('Email')->email()->required(),
            TextInput::make('city')->label('Thành phố')->required(),
            Select::make('verification_status')->label('Trạng thái duyệt')->options([
                'pending' => 'Chờ duyệt',
                'verified' => 'Đã duyệt',
                'rejected' => 'Từ chối',
            ])->required(),
            Textarea::make('description')->label('Mô tả')->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('organization_name')->label('Tổ chức')->searchable(),
                Tables\Columns\TextColumn::make('organization_type')->label('Loại')->badge(),
                Tables\Columns\TextColumn::make('contact_name')->label('Liên hệ'),
                Tables\Columns\TextColumn::make('city')->label('Thành phố'),
                Tables\Columns\TextColumn::make('verification_status')->label('Duyệt')->badge(),
            ])
            ->actions([Tables\Actions\EditAction::make()])
            ->bulkActions([Tables\Actions\DeleteBulkAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPartnerProfiles::route('/'),
            'create' => Pages\CreatePartnerProfile::route('/create'),
            'edit' => Pages\EditPartnerProfile::route('/{record}/edit'),
        ];
    }
}
