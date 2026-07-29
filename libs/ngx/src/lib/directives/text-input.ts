import { Directive, computed, input } from '@angular/core';

@Directive({
  selector: '[xTextInput]',
  host: {
    class:
      'block rounded-lg border border-(--current-border-color) px-3 py-2 transition-colors outline-none focus:border-(--current-focused-border-color) focus:ring-1 focus:ring-(--current-focused-border-color)',
    '[style]': `{
      '--current-border-color': currentBorderColorSignal(),
      '--current-focused-border-color': currentFocusedBorderColorSignal(),
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

  private readonly resolvedDefaultBorderColorSignal = computed(() => {
    return (
      this.defaultBorderColorSignal() ??
      'var(--x-text-input-default-border-color, var(--color-gray-300))'
    );
  });
  private readonly resolvedErrorBorderColorSignal = computed(() => {
    return (
      this.errorBorderColorSignal() ??
      'var(--x-text-input-error-border-color, var(--color-red-400))'
    );
  });
  private readonly resolvedFocusedBorderColorSignal = computed(() => {
    return (
      this.focusedBorderColorSignal() ??
      'var(--x-text-input-focused-border-color, var(--color-blue-400))'
    );
  });

  public readonly currentBorderColorSignal = computed(() => {
    return this.touchedAndInvalidSignal()
      ? this.resolvedErrorBorderColorSignal()
      : this.resolvedDefaultBorderColorSignal();
  });

  public readonly currentFocusedBorderColorSignal = computed(() => {
    return this.touchedAndInvalidSignal()
      ? this.resolvedErrorBorderColorSignal()
      : this.resolvedFocusedBorderColorSignal();
  });
}
