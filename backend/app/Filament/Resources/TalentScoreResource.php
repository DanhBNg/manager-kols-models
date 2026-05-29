<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TalentScoreResource\Pages;
use App\Models\TalentScore;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class TalentScoreResource extends Resource
{
    protected static ?string $model = TalentScore::class;

    protected static ?string $navigationIcon = 'heroicon-o-chart-bar';

    protected static ?string $navigationLabel = 'Điểm tier';

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('criterion_code')->label('Tiêu chí')->required(),
            TextInput::make('score')->label('Điểm')->numeric()->required(),
            Select::make('tier')->label('Tier')->options(['S' => 'S', 'A' => 'A', 'B' => 'B', 'C' => 'C'])->required(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')->label('Talent')->searchable(),
                Tables\Columns\TextColumn::make('criterion_code')->label('Tiêu chí')->badge(),
                Tables\Columns\TextColumn::make('score')->label('Điểm')->sortable(),
                Tables\Columns\TextColumn::make('tier')->label('Tier')->badge(),
                Tables\Columns\TextColumn::make('calculated_at')->label('Ngày tính')->dateTime()->sortable(),
            ])
            ->actions([Tables\Actions\EditAction::make()])
            ->bulkActions([Tables\Actions\DeleteBulkAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTalentScores::route('/'),
            'edit' => Pages\EditTalentScore::route('/{record}/edit'),
        ];
    }
}
