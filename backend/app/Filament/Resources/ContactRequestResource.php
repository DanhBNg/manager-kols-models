<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ContactRequestResource\Pages;
use App\Models\ContactRequest;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ContactRequestResource extends Resource
{
    protected static ?string $model = ContactRequest::class;

    protected static ?string $navigationIcon = 'heroicon-o-inbox';

    protected static ?string $navigationLabel = 'Yêu cầu liên hệ';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Select::make('status')->label('Trạng thái')->options([
                'pending' => 'Chờ xử lý',
                'viewed' => 'Đã xem',
                'accepted' => 'Đã nhận',
                'declined' => 'Từ chối',
                'cancelled' => 'Đã hủy',
            ])->required(),
            Textarea::make('message')->label('Nội dung')->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('brand.name')->label('Đối tác'),
                Tables\Columns\TextColumn::make('talent.name')->label('Talent'),
                Tables\Columns\TextColumn::make('status')->label('Trạng thái')->badge(),
                Tables\Columns\TextColumn::make('created_at')->label('Ngày tạo')->dateTime()->sortable(),
            ])
            ->actions([Tables\Actions\EditAction::make()])
            ->bulkActions([Tables\Actions\DeleteBulkAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListContactRequests::route('/'),
            'edit' => Pages\EditContactRequest::route('/{record}/edit'),
        ];
    }
}
