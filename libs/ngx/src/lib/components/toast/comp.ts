import { Component, computed, inject, input } from '@angular/core';

import { IconName, NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroCheckCircleSolid,
  heroExclamationCircleSolid,
  heroXMarkSolid,
} from '@ng-icons/heroicons/solid';

import { ToastService } from '../../services';
import { Toast } from '../../types';

@Component({
  selector: 'x-toast',
  templateUrl: './comp.html',
  imports: [NgIcon],
  providers: [provideIcons({ heroCheckCircleSolid, heroExclamationCircleSolid, heroXMarkSolid })],
  host: {
    '[style]': `{
      '--this-border-color': borderColorSignal(),
      '--this-icon-color': iconColorSignal(),
      '--this-title-color': titleColorSignal()
    }`,
  },
})
export class ToastComponent {
  private readonly toastService = inject(ToastService);

  public readonly toastSignal = input.required<Toast>({
    alias: 'toast',
  });

  public readonly borderColorSignal = computed(() => {
    switch (this.toastSignal().type) {
      case 'SUCCESS':
        return 'var(--color-green-100)';
      case 'ERROR':
        return 'var(--color-red-100)';
    }
  });
  public readonly iconColorSignal = computed(() => {
    switch (this.toastSignal().type) {
      case 'SUCCESS':
        return 'var(--color-green-500)';
      case 'ERROR':
        return 'var(--color-red-500)';
    }
  });
  public readonly iconNameSignal = computed<IconName>(() => {
    switch (this.toastSignal().type) {
      case 'SUCCESS':
        return 'heroCheckCircleSolid';
      case 'ERROR':
        return 'heroExclamationCircleSolid';
    }
  });
  public readonly titleColorSignal = computed(() => {
    switch (this.toastSignal().type) {
      case 'SUCCESS':
        return 'var(--color-green-500)';
      case 'ERROR':
        return 'var(--color-red-500)';
    }
  });

  public onCloseButtonClicked(): void {
    this.toastService.remove(this.toastSignal().id);
  }
}
