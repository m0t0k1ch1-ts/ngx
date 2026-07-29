import { Component, computed, input, model } from '@angular/core';
import { FormCheckboxControl } from '@angular/forms/signals';

@Component({
  selector: 'x-toggle-switch',
  imports: [],
  templateUrl: './toggle-switch.html',
  styleUrl: './toggle-switch.css',
  host: {
    '[style.--resolved-checked-background-color]': 'resolvedCheckedBackgroundColorSignal()',
    '[style.--resolved-color]': 'resolvedColorSignal()',
    '[style.--resolved-padding]': 'resolvedPaddingSignal()',
    '[style.--resolved-size]': 'resolvedSizeSignal()',
    '[style.--resolved-unchecked-background-color]': 'resolvedUncheckedBackgroundColorSignal()',
  },
})
export class ToggleSwitchComponent implements FormCheckboxControl {
  public readonly checkedBackgroundColorSignal = input<string | undefined>(undefined, {
    alias: 'checkedBackgroundColor',
  });
  public readonly colorSignal = input<string | undefined>(undefined, {
    alias: 'color',
  });
  public readonly paddingSignal = input<string | undefined>(undefined, {
    alias: 'padding',
  });
  public readonly sizeSignal = input<string | undefined>(undefined, {
    alias: 'size',
  });
  public readonly uncheckedBackgroundColorSignal = input<string | undefined>(undefined, {
    alias: 'uncheckedBackgroundColor',
  });

  public readonly resolvedCheckedBackgroundColorSignal = computed(
    () =>
      this.checkedBackgroundColorSignal() ??
      'var(--x-toggle-switch-checked-background-color, var(--color-blue-500))',
  );
  public readonly resolvedColorSignal = computed(
    () => this.colorSignal() ?? 'var(--x-toggle-switch-color, var(--color-white))',
  );
  public readonly resolvedPaddingSignal = computed(
    () => this.paddingSignal() ?? 'var(--x-toggle-switch-padding, 0.125rem)',
  );
  public readonly resolvedSizeSignal = computed(
    () => this.sizeSignal() ?? 'var(--x-toggle-switch-size, 1.25rem)',
  );
  public readonly resolvedUncheckedBackgroundColorSignal = computed(
    () =>
      this.uncheckedBackgroundColorSignal() ??
      'var(--x-toggle-switch-unchecked-background-color, var(--color-gray-300))',
  );

  public readonly checked = model(false);

  public onClicked(): void {
    this.checked.update((checked) => !checked);
  }
}
