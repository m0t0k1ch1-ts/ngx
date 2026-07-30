import { Directive, computed, input } from '@angular/core';

@Directive({
  selector: '[xTextInput]',
  host: {
    class:
      'block rounded-(--x-text-input-resolved-border-radius) border border-(--x-text-input-resolved-border-color) px-(--x-text-input-resolved-padding-x) py-(--x-text-input-resolved-padding-y) transition-colors outline-none focus:border-(--x-text-input-resolved-focused-border-color) focus:ring-1 focus:ring-(--x-text-input-resolved-focused-border-color)',
    '[style]': `{
      '--x-text-input-resolved-border-color': resolvedBorderColorSignal(),
      '--x-text-input-resolved-border-radius': resolvedBorderRadiusSignal(),
      '--x-text-input-resolved-focused-border-color': resolvedFocusedBorderColorSignal(),
      '--x-text-input-resolved-padding-x': resolvedPaddingXSignal(),
      '--x-text-input-resolved-padding-y': resolvedPaddingYSignal(),
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

  public readonly borderRadiusSignal = input<string | undefined>(undefined, {
    alias: 'xTextInputBorderRadius',
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
  public readonly paddingXSignal = input<string | undefined>(undefined, {
    alias: 'xTextInputPaddingX',
  });
  public readonly paddingYSignal = input<string | undefined>(undefined, {
    alias: 'xTextInputPaddingY',
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
  public readonly resolvedBorderRadiusSignal = computed(() => {
    return this.borderRadiusSignal() ?? 'var(--x-text-input-border-radius, var(--radius-md))';
  });
  public readonly resolvedFocusedBorderColorSignal = computed(() => {
    return this.touchedAndInvalidSignal()
      ? (this.errorBorderColorSignal() ??
          'var(--x-text-input-error-border-color, var(--color-red-400))')
      : (this.focusedBorderColorSignal() ??
          'var(--x-text-input-focused-border-color, var(--color-blue-400))');
  });
  public readonly resolvedPaddingXSignal = computed(() => {
    return this.paddingXSignal() ?? 'var(--x-text-input-padding-x, 0.75rem)';
  });
  public readonly resolvedPaddingYSignal = computed(() => {
    return this.paddingYSignal() ?? 'var(--x-text-input-padding-y, 0.5rem)';
  });
}
