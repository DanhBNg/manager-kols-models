<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CampaignResource\Pages;
use App\Models\Campaign;
use App\Models\User;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CampaignResource extends Resource
{
    protected static ?string $model = Campaign::class;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';

    protected static ?string $navigationLabel = 'Campaign';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Select::make('owner_user_id')->label('Đối tác')->options(User::query()->where('type', 'brand')->pluck('name', 'id'))->searchable()->required(),
            TextInput::make('title')->label('Tiêu đề')->required(),
            TextInput::make('job_type')->label('Loại việc')->required(),
            TextInput::make('city')->label('Thành phố'),
            TextInput::make('location')->label('Địa điểm'),
            DatePicker::make('start_date')->label('Ngày bắt đầu'),
            DatePicker::make('end_date')->label('Ngày kết thúc'),
            TextInput::make('talent_quantity')->label('Số lượng')->numeric()->default(1),
            TextInput::make('budget_min')->label('Ngân sách từ')->numeric(),
            TextInput::make('budget_max')->label('Ngân sách đến')->numeric(),
            Select::make('status')->label('Trạng thái')->options([
                'draft' => 'Nháp',
                'published' => 'Đã đăng',
                'closed' => 'Đã đóng',
            ])->required(),
            Textarea::make('description')->label('Mô tả')->columnSpanFull(),
            Textarea::make('requirements')->label('Yêu cầu')->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')->label('Campaign')->searchable(),
                Tables\Columns\TextColumn::make('owner.name')->label('Đối tác'),
                Tables\Columns\TextColumn::make('job_type')->label('Loại việc')->badge(),
                Tables\Columns\TextColumn::make('city')->label('Thành phố'),
                Tables\Columns\TextColumn::make('status')->label('Trạng thái')->badge(),
                Tables\Columns\TextColumn::make('created_at')->label('Ngày tạo')->dateTime()->sortable(),
            ])
            ->actions([Tables\Actions\EditAction::make()])
            ->bulkActions([Tables\Actions\DeleteBulkAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCampaigns::route('/'),
            'create' => Pages\CreateCampaign::route('/create'),
            'edit' => Pages\EditCampaign::route('/{record}/edit'),
        ];
    }
}
