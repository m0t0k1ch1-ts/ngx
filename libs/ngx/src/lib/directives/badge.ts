import {
  Directive,
  ElementRef,
  Renderer2,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[xBadge]',
  host: {
    class: 'relative',
    '[style]': `{
      '--x-badge-resolved-border-color': resolvedBorderColorSignal(),
      '--x-badge-resolved-border-width': resolvedBorderWidthSignal(),
      '--x-badge-resolved-color': resolvedColorSignal(),
      '--x-badge-resolved-display': resolvedDisplaySignal(),
      '--x-badge-resolved-font-size': resolvedFontSizeSignal(),
      '--x-badge-resolved-font-weight': resolvedFontWeightSignal(),
      '--x-badge-resolved-padding-x': resolvedPaddingXSignal(),
      '--x-badge-resolved-padding-y': resolvedPaddingYSignal(),
      '--x-badge-resolved-size': resolvedSizeSignal(),
      '--x-badge-resolved-text-color': resolvedTextColorSignal(),
      '--x-badge-resolved-translate-x': resolvedTranslateXSignal(),
      '--x-badge-resolved-translate-y': resolvedTranslateYSignal(),
    }`,
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
  public readonly paddingXSignal = input<string | undefined>(undefined, {
    alias: 'xBadgePaddingX',
  });
  public readonly paddingYSignal = input<string | undefined>(undefined, {
    alias: 'xBadgePaddingY',
  });
  public readonly sizeSignal = input<string | undefined>(undefined, {
    alias: 'xBadgeSize',
  });
  public readonly textColorSignal = input<string | undefined>(undefined, {
    alias: 'xBadgeTextColor',
  });
  public readonly translateXSignal = input<string | undefined>(undefined, {
    alias: 'xBadgeTranslateX',
  });
  public readonly translateYSignal = input<string | undefined>(undefined, {
    alias: 'xBadgeTranslateY',
  });
  public readonly valueSignal = input<number | string | undefined>(undefined, {
    alias: 'xBadgeValue',
  });

  public readonly resolvedBorderColorSignal = computed(() => {
    return this.borderColorSignal() ?? 'var(--x-badge-border-color, var(--color-white))';
  });
  public readonly resolvedBorderWidthSignal = computed(() => {
    return this.borderWidthSignal() ?? 'var(--x-badge-border-width, 1px)';
  });
  public readonly resolvedColorSignal = computed(() => {
    return this.colorSignal() ?? 'var(--x-badge-color, var(--color-red-500))';
  });
  public readonly resolvedDisplaySignal = computed(() => {
    return this.valueSignal() !== 0 ? 'flex' : 'none';
  });
  public readonly resolvedFontSizeSignal = computed(() => {
    return this.fontSizeSignal() ?? 'var(--x-badge-font-size, 0.5rem)';
  });
  public readonly resolvedFontWeightSignal = computed(() => {
    return this.fontWeightSignal() ?? 'var(--x-badge-font-weight, var(--font-weight-normal))';
  });
  public readonly resolvedPaddingXSignal = computed(() => {
    return (
      this.paddingXSignal() ??
      `var(--x-badge-padding-x, ${this.resolvedValueSignal() !== undefined ? '0.25rem' : '0px'})`
    );
  });
  public readonly resolvedPaddingYSignal = computed(() => {
    return this.paddingYSignal() ?? 'var(--x-badge-padding-y, 0px)';
  });
  public readonly resolvedSizeSignal = computed(() => {
    return (
      this.sizeSignal() ??
      `var(--x-badge-size, ${this.resolvedValueSignal() !== undefined ? '1rem' : '0.5rem'})`
    );
  });
  public readonly resolvedTextColorSignal = computed(() => {
    return this.textColorSignal() ?? 'var(--x-badge-text-color, var(--color-white))';
  });
  public readonly resolvedTranslateXSignal = computed(() => {
    return this.translateXSignal() ?? 'var(--x-badge-translate-x, 50%)';
  });
  public readonly resolvedTranslateYSignal = computed(() => {
    return this.translateYSignal() ?? 'var(--x-badge-translate-y, -50%)';
  });
  public readonly resolvedValueSignal = computed(() => {
    const value = this.valueSignal();

    return value !== undefined && value !== '' ? value.toString() : undefined;
  });

  private badge: HTMLElement | undefined;

  constructor() {
    afterNextRender(() => {
      const badge: HTMLElement = (this.badge = this.renderer.createElement('div'));
      {
        for (const className of [
          'absolute',
          'bg-(--x-badge-resolved-color)',
          'border-(--x-badge-resolved-border-color)',
          'border-(length:--x-badge-resolved-border-width)',
          'box-border',
          'font-(--x-badge-resolved-font-weight)',
          'h-(--x-badge-resolved-size)',
          'items-center',
          'justify-center',
          'leading-none',
          'min-w-(--x-badge-resolved-size)',
          'px-(--x-badge-resolved-padding-x)',
          'py-(--x-badge-resolved-padding-y)',
          'right-0',
          'rounded-full',
          'text-(--x-badge-resolved-text-color)',
          'text-(length:--x-badge-resolved-font-size)',
          'top-0',
          'translate-x-(--x-badge-resolved-translate-x)',
          'translate-y-(--x-badge-resolved-translate-y)',
        ]) {
          this.renderer.addClass(badge, className);
        }
        this.renderer.setStyle(badge, 'display', 'var(--x-badge-resolved-display)');
      }

      this.renderer.appendChild(this.elementRef.nativeElement, badge);

      this.syncValue();
    });

    effect(() => this.syncValue());
  }

  private syncValue(): void {
    const value = this.resolvedValueSignal();

    const badge = this.badge;
    if (badge === undefined) {
      return;
    }

    this.renderer.setProperty(badge, 'textContent', value ?? '');
    this.renderer.setAttribute(badge, 'aria-hidden', value === undefined ? 'true' : 'false');
  }
}
