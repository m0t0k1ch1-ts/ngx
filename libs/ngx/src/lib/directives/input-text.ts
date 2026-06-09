import { Directive, computed, input } from '@angular/core';

@Directive({
  selector: '[xInputText]',
  host: {
    class: 'block rounded-lg border px-3 py-2 transition-colors outline-none focus:ring-1',
    '[class.border-gray-300]': '!touchedAndInvalidSignal()',
    '[class.border-red-400]': 'touchedAndInvalidSignal()',
    '[class.focus:border-blue-400]': '!touchedAndInvalidSignal()',
    '[class.focus:ring-blue-400]': '!touchedAndInvalidSignal()',
    '[class.focus:ring-red-400]': 'touchedAndInvalidSignal()',
  },
})
export class InputTextDirective {
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
