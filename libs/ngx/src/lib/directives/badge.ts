import {
  Directive,
  ElementRef,
  Renderer2,
  afterNextRender,
  effect,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[xBadge]',
  host: {
    class: 'relative',
  },
})
export class BadgeDirective {
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  public readonly borderColorSignal = input<string | undefined>(undefined, {
    alias: 'xBadgeBorderColor',
  });
  public readonly colorSignal = input<string | undefined>(undefined, {
    alias: 'xBadgeColor',
  });
  public readonly sizeSignal = input<string | undefined>(undefined, {
    alias: 'xBadgeSize',
  });
  public readonly translateSignal = input<string | undefined>(undefined, {
    alias: 'xBadgeTranslate',
  });

  private badge: HTMLElement | undefined;

  constructor() {
    afterNextRender(() => {
      const badge: HTMLElement = (this.badge = this.renderer.createElement('div'));
      {
        this.renderer.setStyle(badge, 'border-radius', 'calc(infinity * 1px)');
        this.renderer.setStyle(badge, 'border-style', 'solid');
        this.renderer.setStyle(badge, 'border-width', '1px');
        this.renderer.setStyle(badge, 'position', 'absolute');
        this.renderer.setStyle(badge, 'right', '0');
        this.renderer.setStyle(badge, 'text-align', 'center');
        this.renderer.setStyle(badge, 'top', '0');
      }

      this.renderer.appendChild(this.elementRef.nativeElement, badge);

      this.sync();
    });

    effect(() => this.sync());
  }

  private sync(): void {
    const borderColor = this.borderColorSignal();
    const color = this.colorSignal();
    const size = this.sizeSignal();
    const translate = this.translateSignal();

    const badge = this.badge;
    if (badge === undefined) {
      return;
    }

    this.renderer.setStyle(badge, 'background-color', color ?? 'oklch(63.7% 0.237 25.331)'); // default: red-500
    this.renderer.setStyle(
      badge,
      'border-color',
      borderColor ?? 'var(--x-badge-border-color, #fff)',
    );
    this.renderer.setStyle(badge, 'height', size ?? 'var(--x-badge-size, 0.5rem)');
    this.renderer.setStyle(badge, 'translate', translate ?? 'var(--x-badge-translate, 50% -50%)');
    this.renderer.setStyle(badge, 'width', size ?? 'var(--x-badge-size, 0.5rem)');
  }
}
