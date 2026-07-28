import { Component, computed, inject, input } from '@angular/core';

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

  public readonly idSignal = input<number | string | null>(null, {
    alias: 'id',
  });

  public readonly toastsSignal = computed(() => {
    const id = this.idSignal();
    const toasts = this.toastService.toastsSignal();

    return toasts.filter((toast) => {
      return id === null || toast.containerID === id;
    });
  });
}
