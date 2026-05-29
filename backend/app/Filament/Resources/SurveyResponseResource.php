<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SurveyResponseResource\Pages;
use App\Models\SurveyResponse;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class SurveyResponseResource extends Resource
{
    protected static ?string $model = SurveyResponse::class;

    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-list';

    protected static ?string $navigationLabel = 'Khảo sát talent';

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('section')->label('Phần')->required(),
            TextInput::make('question_code')->label('Mã câu hỏi')->required(),
            Textarea::make('answer_value')->label('Câu trả lời JSON')->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')->label('Talent')->searchable(),
                Tables\Columns\TextColumn::make('section')->label('Phần')->badge(),
                Tables\Columns\TextColumn::make('question_code')->label('Câu hỏi')->searchable(),
                Tables\Columns\TextColumn::make('submitted_at')->label('Ngày gửi')->dateTime()->sortable(),
            ])
            ->actions([Tables\Actions\EditAction::make()])
            ->bulkActions([Tables\Actions\DeleteBulkAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSurveyResponses::route('/'),
            'edit' => Pages\EditSurveyResponse::route('/{record}/edit'),
        ];
    }
}
