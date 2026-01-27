import { Component, inject, signal } from '@angular/core';

import { LoaderComponent, OverlayComponent, ToastContainerComponent, ToastService } from 'ngx';

@Component({
  selector: 'app-root',
  imports: [LoaderComponent, OverlayComponent, ToastContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly toastService = inject(ToastService);

  public isOverlayVisibleSignal = signal<boolean>(false);

  public onClickShowOverlayButton(): void {
    this.isOverlayVisibleSignal.set(true);
  }

  public onClickHideOverlayButton(): void {
    this.isOverlayVisibleSignal.set(false);
  }

  public onClickAddErrorToastButton(): void {
    this.toastService.add({
      type: 'ERROR',
      title: 'ERROR',
      message: 'something went wrong',
      lifetime: 5_000,
    });
  }
}
