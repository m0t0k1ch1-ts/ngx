import { Component, input } from '@angular/core';

@Component({
  selector: 'x-overlay',
  imports: [],
  templateUrl: './overlay.html',
  styleUrl: './overlay.css',
})
export class OverlayComponent {
  public readonly isVisibleSignal = input.required<boolean>({
    alias: 'isVisible',
  });
  public readonly zIndexSignal = input<number>(50, {
    alias: 'zIndex',
  });
}
