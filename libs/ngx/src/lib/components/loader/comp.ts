import { Component, input } from '@angular/core';

@Component({
  selector: 'x-loader',
  templateUrl: './comp.html',
  styleUrls: ['./comp.css'],
  imports: [],
})
export class LoaderComponent {
  public readonly sizeSignal = input<string>('80px', {
    alias: 'size',
  });
  public readonly strokeWidthSignal = input<number>(8, {
    alias: 'strokeWidth',
  });
}
