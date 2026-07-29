import { Directive, computed, input } from '@angular/core';

@Directive({
  selector: '[xTextInput]',
  host: {
    class:
      'block rounded-lg border border-(--x-text-input-resolved-border-color) px-3 py-2 transition-colors outline-none focus:border-(--x-text-input-resolved-focused-border-color) focus:ring-1 focus:ring-(--x-text-input-resolved-focused-border-color)',
    '[style]': `{
      '--x-text-input-resolved-border-color': resolvedBorderColorSignal(),
      '--x-text-input-resolved-focused-border-color': resolvedFocusedBorderColorSignal(),
    }`,
  },
})
export class TextInputDirective {
  public readonly invalidSignal = input(false, {
    alias: 'invalid',
  });
  public readonly touchedSignal = input(false, {
    alias: 'touched',
  });

  public readonly defaultBorderColorSignal = input<string | undefined>(undefined, {
    alias: 'xTextInputDefaultBorderColor',
  });
  public readonly errorBorderColorSignal = input<string | undefined>(undefined, {
    alias: 'xTextInputErrorBorderColor',
  });
  public readonly focusedBorderColorSignal = input<string | undefined>(undefined, {
    alias: 'xTextInputFocusedBorderColor',
  });

  public readonly touchedAndInvalidSignal = computed(
    () => this.touchedSignal() && this.invalidSignal(),
  );

  public readonly resolvedBorderColorSignal = computed(() => {
    return this.touchedAndInvalidSignal()
      ? (this.errorBorderColorSignal() ??
          'var(--x-text-input-error-border-color, var(--color-red-400))')
      : (this.defaultBorderColorSignal() ??
          'var(--x-text-input-default-border-color, var(--color-gray-300))');
  });
  public readonly resolvedFocusedBorderColorSignal = computed(() => {
    return this.touchedAndInvalidSignal()
      ? (this.errorBorderColorSignal() ??
          'var(--x-text-input-error-border-color, var(--color-red-400))')
      : (this.focusedBorderColorSignal() ??
          'var(--x-text-input-focused-border-color, var(--color-blue-400))');
  });
}
