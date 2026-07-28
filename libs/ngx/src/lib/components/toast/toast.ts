import { Component, inject, input } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroCheckCircleSolid,
  heroExclamationCircleSolid,
  heroXMarkSolid,
} from '@ng-icons/heroicons/solid';

import { ToastService } from '../../services';
import { Toast } from '../../types';

@Component({
  selector: 'x-toast',
  imports: [NgIcon],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
  providers: [provideIcons({ heroCheckCircleSolid, heroExclamationCircleSolid, heroXMarkSolid })],
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
