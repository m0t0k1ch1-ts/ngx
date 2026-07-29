import { Component, computed, input, model } from '@angular/core';
import { FormCheckboxControl } from '@angular/forms/signals';

@Component({
  selector: 'x-toggle-switch',
  imports: [],
  templateUrl: './toggle-switch.html',
  styleUrl: './toggle-switch.css',
  host: {
    '[style.--resolved-checked-background-color]': 'resolvedCheckedBackgroundColorSignal()',
    '[style.--resolved-padding]': 'resolvedPaddingSignal()',
    '[style.--resolved-switch-color]': 'resolvedSwitchColorSignal()',
    '[style.--resolved-switch-size]': 'resolvedSwitchSizeSignal()',
    '[style.--resolved-unchecked-background-color]': 'resolvedUncheckedBackgroundColorSignal()',
  },
})
export class ToggleSwitchComponent implements FormCheckboxControl {
  public readonly checkedBackgroundColorSignal = input<string | undefined>(undefined, {
    alias: 'checkedBackgroundColor',
  });
  public readonly paddingSignal = input<string | undefined>(undefined, {
    alias: 'padding',
  });
  public readonly switchColorSignal = input<string | undefined>(undefined, {
    alias: 'switchColor',
  });
  public readonly switchSizeSignal = input<string | undefined>(undefined, {
    alias: 'switchSize',
  });
  public readonly uncheckedBackgroundColorSignal = input<string | undefined>(undefined, {
    alias: 'uncheckedBackgroundColor',
  });

  public readonly resolvedCheckedBackgroundColorSignal = computed(
    () =>
      this.checkedBackgroundColorSignal() ??
      'var(--x-toggle-switch-checked-background-color, var(--color-blue-500))',
  );
  public readonly resolvedPaddingSignal = computed(
    () => this.paddingSignal() ?? 'var(--x-toggle-switch-padding, 0.125rem)',
  );
  public readonly resolvedSwitchColorSignal = computed(
    () => this.switchColorSignal() ?? 'var(--x-toggle-switch-switch-color, var(--color-white))',
  );
  public readonly resolvedSwitchSizeSignal = computed(
    () => this.switchSizeSignal() ?? 'var(--x-toggle-switch-switch-size, 1.25rem)',
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
