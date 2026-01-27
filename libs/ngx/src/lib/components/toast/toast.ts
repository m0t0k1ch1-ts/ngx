import { Component, inject, input } from '@angular/core';

import { ToastService } from '../../services';
import { Toast } from '../../types';

@Component({
  selector: 'x-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class ToastComponent {
  private readonly toastService = inject(ToastService);

  public readonly toastSignal = input.required<Toast>({
    alias: 'toast',
  });

  public onClickCloseButton(): void {
    this.toastService.remove(this.toastSignal().id);
  }
}
