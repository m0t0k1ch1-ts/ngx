import { Component, computed, input, model } from '@angular/core';

@Component({
  selector: 'x-overlay',
  templateUrl: './comp.html',
  styleUrls: ['./comp.css'],
  imports: [],
  host: {
    '[style]': `{
      '--x-overlay-resolved-color': resolvedColorSignal(),
      '--x-overlay-resolved-z-index': resolvedZIndexSignal(),
    }`,
  },
})
export class OverlayComponent {
  public readonly colorSignal = input<string | undefined>(undefined, {
    alias: 'color',
  });
  public readonly isCloseOnClickDisabledSignal = input(false, {
    alias: 'isCloseOnClickDisabled',
  });
  public readonly zIndexSignal = input<string | number | undefined>(undefined, {
    alias: 'zIndex',
  });

  public readonly isVisibleSignal = model.required<boolean>({
    alias: 'isVisible',
  });

  public readonly resolvedColorSignal = computed(() => {
    return (
      this.colorSignal() ??
      'var(--x-overlay-color, color-mix(in oklab, var(--color-black) 50%, transparent))'
    );
  });
  public readonly resolvedZIndexSignal = computed(() => {
    return this.zIndexSignal() ?? 'var(--x-overlay-z-index, 50)';
  });

  public onClicked(): void {
    if (this.isCloseOnClickDisabledSignal()) {
      return;
    }

    this.isVisibleSignal.set(false);
  }
}
