<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BookingResource\Pages;
use App\Models\Booking;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BookingResource extends Resource
{
    protected static ?string $model = Booking::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';

    protected static ?string $navigationLabel = 'Booking';

    public static function form(Form $form): Form
    {
        return $form->schema([
            DateTimePicker::make('starts_at')->label('Bắt đầu')->required(),
            DateTimePicker::make('ends_at')->label('Kết thúc')->required(),
            TextInput::make('location')->label('Địa điểm'),
            TextInput::make('compensation_amount')->label('Thù lao')->numeric(),
            Select::make('status')->label('Trạng thái')->options([
                'pending' => 'Chờ xác nhận',
                'confirmed' => 'Đã xác nhận',
                'completed' => 'Hoàn tất',
                'cancelled' => 'Đã hủy',
                'disputed' => 'Tranh chấp',
            ])->required(),
            Select::make('payment_status')->label('Thanh toán')->options([
                'pending' => 'Chờ thanh toán',
                'escrowed' => 'Đã giữ tiền',
                'released' => 'Đã giải ngân',
                'refunded' => 'Đã hoàn tiền',
            ])->required(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('partner.name')->label('Đối tác'),
                Tables\Columns\TextColumn::make('talent.name')->label('Talent'),
                Tables\Columns\TextColumn::make('starts_at')->label('Bắt đầu')->dateTime()->sortable(),
                Tables\Columns\TextColumn::make('status')->label('Trạng thái')->badge(),
                Tables\Columns\TextColumn::make('payment_status')->label('Thanh toán')->badge(),
            ])
            ->actions([Tables\Actions\EditAction::make()])
            ->bulkActions([Tables\Actions\DeleteBulkAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBookings::route('/'),
            'edit' => Pages\EditBooking::route('/{record}/edit'),
        ];
    }
}
