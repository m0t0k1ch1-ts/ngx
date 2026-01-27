import { Injectable, signal } from '@angular/core';

import { Toast } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private lastToastID = 0;
  private readonly toastIDToTimeoutID = new Map<number, number>();

  public readonly toastsSignal = signal<Toast[]>([]);

  public add(toastWithoutID: Omit<Toast, 'id'>): void {
    const toast = {
      id: this.lastToastID++,
      ...toastWithoutID,
    };

    this.toastsSignal.update((toasts) => [...toasts, toast]);

    const timerHandler = () => this.remove(toast.id);
    const timeoutID = setTimeout(timerHandler, toastWithoutID.lifetime);

    this.toastIDToTimeoutID.set(toast.id, timeoutID);
  }

  public remove(toastID: number): void {
    const timeoutID = this.toastIDToTimeoutID.get(toastID);
    if (timeoutID !== undefined) {
      clearTimeout(timeoutID);
      this.toastIDToTimeoutID.delete(toastID);
    }

    this.toastsSignal.update((toasts) => toasts.filter((toast) => toast.id !== toastID));
  }
}
