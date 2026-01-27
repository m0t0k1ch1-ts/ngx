import { Component, input } from '@angular/core';

@Component({
  selector: 'x-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class LoaderComponent {
  public readonly sizeSignal = input<string>('80px', {
    alias: 'size',
  });
  public readonly strokeWidthSignal = input<number>(8, {
    alias: 'strokeWidth',
  });
}
