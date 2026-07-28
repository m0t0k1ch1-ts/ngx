import { Directive, computed, input } from '@angular/core';

@Directive({
  selector: '[xTextInput]',
  host: {
    class: 'block rounded-lg border px-3 py-2 transition-colors outline-none focus:ring-1',
    '[class]':
      "touchedAndInvalidSignal() ? ['border-red-400', 'focus:ring-red-400'] : ['border-gray-300', 'focus:border-blue-400', 'focus:ring-blue-400']",
  },
})
export class TextInputDirective {
  public readonly invalidSignal = input(false, {
    alias: 'invalid',
  });
  public readonly touchedSignal = input(false, {
    alias: 'touched',
  });

  public readonly touchedAndInvalidSignal = computed(
    () => this.touchedSignal() && this.invalidSignal(),
  );
}
