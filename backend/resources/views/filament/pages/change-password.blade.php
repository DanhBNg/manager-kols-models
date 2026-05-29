<x-filament-panels::page>
    <form wire:submit="save" class="max-w-xl space-y-6">
        {{ $this->form }}

        <x-filament-panels::form.actions
            :actions="$this->getFormActions()"
        />
    </form>
</x-filament-panels::page>
