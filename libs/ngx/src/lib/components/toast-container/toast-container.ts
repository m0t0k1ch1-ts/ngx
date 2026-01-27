import { Component, inject } from '@angular/core';

import { ToastService } from '../../services';

import { ToastComponent } from '../toast/toast';

@Component({
  selector: 'x-toast-container',
  imports: [ToastComponent],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.css',
})
export class ToastContainerComponent {
  private readonly toastService = inject(ToastService);

  public readonly toastsSignal = this.toastService.toastsSignal;
}
