import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'x-overlay',
  imports: [],
  templateUrl: './overlay.html',
  styleUrl: './overlay.css',
  host: {
    '[style]': `{
      '--x-overlay-resolved-z-index': resolvedZIndexSignal(),
    }`,
  },
})
export class OverlayComponent {
  public readonly isVisibleSignal = input.required<boolean>({
    alias: 'isVisible',
  });
  public readonly zIndexSignal = input<number | undefined>(undefined, {
    alias: 'zIndex',
  });

  public readonly resolvedZIndexSignal = computed(() => {
    return this.zIndexSignal() ?? 'var(--x-overlay-z-index, 50)';
  });
}
