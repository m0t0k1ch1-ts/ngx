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
  public readonly borderWidthSignal = input<string | undefined>(undefined, {
    alias: 'xBadgeBorderWidth',
  });
  public readonly colorSignal = input<string | undefined>(undefined, {
    alias: 'xBadgeColor',
  });
  public readonly fontSizeSignal = input<string | undefined>(undefined, {
    alias: 'xBadgeFontSize',
  });
  public readonly fontWeightSignal = input<string | undefined>(undefined, {
    alias: 'xBadgeFontWeight',
  });
  public readonly paddingSignal = input<string | undefined>(undefined, {
    alias: 'xBadgePadding',
  });
  public readonly sizeSignal = input<string | undefined>(undefined, {
    alias: 'xBadgeSize',
  });
  public readonly textColorSignal = input<string | undefined>(undefined, {
    alias: 'xBadgeTextColor',
  });
  public readonly translateSignal = input<string | undefined>(undefined, {
    alias: 'xBadgeTranslate',
  });
  public readonly valueSignal = input<number | string | undefined>(undefined, {
    alias: 'xBadgeValue',
  });

  private badge: HTMLElement | undefined;

  constructor() {
    afterNextRender(() => {
      const badge: HTMLElement = (this.badge = this.renderer.createElement('div'));
      {
        this.renderer.setStyle(badge, 'align-items', 'center');
        this.renderer.setStyle(badge, 'border-radius', 'calc(infinity * 1px)');
        this.renderer.setStyle(badge, 'border-style', 'solid');
        this.renderer.setStyle(badge, 'box-sizing', 'border-box');
        this.renderer.setStyle(badge, 'justify-content', 'center');
        this.renderer.setStyle(badge, 'line-height', '1');
        this.renderer.setStyle(badge, 'position', 'absolute');
        this.renderer.setStyle(badge, 'right', '0');
        this.renderer.setStyle(badge, 'top', '0');
      }

      this.renderer.appendChild(this.elementRef.nativeElement, badge);

      this.sync();
    });

    effect(() => this.sync());
  }

  private sync(): void {
    const borderColor = this.borderColorSignal();
    const borderWidth = this.borderWidthSignal();
    const color = this.colorSignal();
    const fontSize = this.fontSizeSignal();
    const fontWeight = this.fontWeightSignal();
    const padding = this.paddingSignal();
    const size = this.sizeSignal();
    const textColor = this.textColorSignal();
    const translate = this.translateSignal();
    const value = this.valueSignal();

    const badge = this.badge;
    if (badge === undefined) {
      return;
    }

    if (value === 0) {
      this.renderer.setStyle(badge, 'display', 'none');
      return;
    }

    this.renderer.setStyle(badge, 'display', 'flex');

    const hasValue = value !== undefined && value !== '';
    const defaultSize = hasValue ? '1rem' : '0.5rem';

    this.renderer.setProperty(badge, 'textContent', hasValue ? value.toString() : '');
    if (hasValue) {
      this.renderer.removeAttribute(badge, 'aria-hidden');
    } else {
      this.renderer.setAttribute(badge, 'aria-hidden', 'true');
    }

    this.renderer.setStyle(
      badge,
      'background-color',
      color ?? 'var(--x-badge-color, var(--color-red-500))',
    );
    this.renderer.setStyle(
      badge,
      'border-color',
      borderColor ?? 'var(--x-badge-border-color, var(--color-white))',
    );
    this.renderer.setStyle(
      badge,
      'border-width',
      borderWidth ?? 'var(--x-badge-border-width, 1px)',
    );
    this.renderer.setStyle(
      badge,
      'color',
      textColor ?? 'var(--x-badge-text-color, var(--color-white))',
    );
    this.renderer.setStyle(badge, 'font-size', fontSize ?? 'var(--x-badge-font-size, 0.5rem)');
    this.renderer.setStyle(
      badge,
      'font-weight',
      fontWeight ?? 'var(--x-badge-font-weight, var(--font-weight-normal))',
    );
    this.renderer.setStyle(badge, 'height', size ?? `var(--x-badge-size, ${defaultSize})`);
    this.renderer.setStyle(badge, 'min-width', size ?? `var(--x-badge-size, ${defaultSize})`);
    this.renderer.setStyle(
      badge,
      'padding',
      hasValue ? (padding ?? 'var(--x-badge-padding, 0 0.25rem)') : '0',
    );
    this.renderer.setStyle(badge, 'translate', translate ?? 'var(--x-badge-translate, 50% -50%)');
  }
}
