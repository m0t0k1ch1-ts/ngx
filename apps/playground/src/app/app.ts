import { Component, inject, signal } from '@angular/core';
import { FormField, FormRoot, form, validateStandardSchema } from '@angular/forms/signals';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBell } from '@ng-icons/heroicons/outline';
import { z } from 'zod';

import {
  BadgeDirective,
  InputTextDirective,
  LoaderComponent,
  OverlayComponent,
  RippleDirective,
  ToastContainerComponent,
  ToastService,
} from 'ngx';

const formSchema = z.object({
  name: z.string().nonempty({
    error: 'Required',
  }),
});

type FormInput = z.infer<typeof formSchema>;

@Component({
  selector: 'app-root',
  imports: [
    FormField,
    FormRoot,
    NgIcon,
    BadgeDirective,
    InputTextDirective,
    LoaderComponent,
    OverlayComponent,
    RippleDirective,
    ToastContainerComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  viewProviders: [provideIcons({ heroBell })],
})
export class App {
  private readonly toastService = inject(ToastService);

  public readonly userAgent = navigator.userAgent;

  private readonly formModel = signal<FormInput>({
    name: '',
  });

  public readonly form = form(
    this.formModel,
    (schemaPath) => {
      return validateStandardSchema(schemaPath, formSchema);
    },
    {
      submission: {
        action: async (field) => {
          this.toastService.add({
            type: 'SUCCESS',
            title: 'Form Submitted',
            message: `Hello, ${field().value().name}!`,
            lifetime: 5_000,
          });
        },
      },
    },
  );

  public readonly isOverlayVisibleSignal = signal<boolean>(false);

  public onClickShowOverlayButton(): void {
    this.isOverlayVisibleSignal.set(true);
  }

  public onClickHideOverlayButton(): void {
    this.isOverlayVisibleSignal.set(false);
  }

  public onClickAddSuccessToastButton(): void {
    this.toastService.add({
      type: 'SUCCESS',
      title: 'SUCCESS',
      message: 'something succeeded',
      lifetime: 5_000,
    });
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
