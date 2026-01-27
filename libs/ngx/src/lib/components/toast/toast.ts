import { Component, computed, inject, input } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroExclamationCircleSolid, heroXMarkSolid } from '@ng-icons/heroicons/solid';

import { ToastService } from '../../services';
import { Toast } from '../../types';

@Component({
  selector: 'x-toast',
  imports: [NgIcon],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
  providers: [provideIcons({ heroExclamationCircleSolid, heroXMarkSolid })],
})
export class ToastComponent {
  private readonly toastService = inject(ToastService);

  public readonly toastSignal = input.required<Toast>({
    alias: 'toast',
  });

  public readonly iconNameSignal = computed(() => {
    switch (this.toastSignal().type) {
      case 'ERROR':
        return 'heroExclamationCircleSolid';
      default:
        return null;
    }
  });
  public readonly iconColorSignal = computed(() => {
    switch (this.toastSignal().type) {
      case 'ERROR':
        return '#fb2c36'; // text-red-500
      default:
        return null;
    }
  });

  public onClickCloseButton(): void {
    this.toastService.remove(this.toastSignal().id);
  }
}
