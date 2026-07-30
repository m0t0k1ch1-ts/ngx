import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'x-overlay',
  imports: [],
  templateUrl: './overlay.html',
  styleUrl: './overlay.css',
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
  public readonly isVisibleSignal = input.required<boolean>({
    alias: 'isVisible',
  });
  public readonly zIndexSignal = input<number | undefined>(undefined, {
    alias: 'zIndex',
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
}
