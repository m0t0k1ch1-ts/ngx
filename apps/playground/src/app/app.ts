import { Component, inject } from '@angular/core';

import { ToastContainerComponent, ToastService } from 'ngx';

@Component({
  selector: 'app-root',
  imports: [ToastContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly toastService = inject(ToastService);

  public onClickAddErrorToastButton(): void {
    this.toastService.add({
      type: 'ERROR',
      title: 'ERROR',
      message: 'something went wrong',
      lifetime: 5_000,
    });
  }
}
