import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  afterNextRender,
  inject,
} from '@angular/core';

@Directive({
  selector: '[xRipple]',
  host: {
    class: 'x-ripple',
  },
})
export class RippleDirective {
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  constructor() {
    afterNextRender(() => {
      const styleID = 'x-ripple-style';
      if (this.elementRef.nativeElement.ownerDocument.getElementById(styleID) === null) {
        const style: HTMLStyleElement = this.renderer.createElement('style');
        {
          this.renderer.setAttribute(style, 'id', styleID);
          style.textContent = `
            .x-ripple {
              overflow: hidden;
              position: relative;
            }
            .x-ink {
              background: var(--x-ripple-color, rgba(0, 0, 0, 0.1));
              border-radius: 50%;
              pointer-events: none;
              position: absolute;
              transform: scale(0);
            }
            .x-ink-active {
              animation: x-ripple 400ms linear;
            }
            @keyframes x-ripple {
              100% {
                opacity: 0;
                transform: scale(2.5);
              }
            }
        `;
        }

        this.renderer.appendChild(this.elementRef.nativeElement.ownerDocument.head, style);
      }

      const ink: HTMLElement = this.renderer.createElement('div');
      {
        this.renderer.addClass(ink, 'x-ink');
        this.renderer.setAttribute(ink, 'aria-hidden', 'true');
        this.renderer.setAttribute(ink, 'role', 'presentation');
      }

      this.renderer.appendChild(this.elementRef.nativeElement, ink);

      // Fallback for animationend, which does not fire when the element is removed from the DOM.
      // e.g. via content projection inside @if.
      let animationTimeoutID: number | undefined;

      const removeMousedownListener = this.renderer.listen(
        this.elementRef.nativeElement,
        'mousedown',
        (event: MouseEvent) => {
          clearTimeout(animationTimeoutID);
          ink.classList.remove('x-ink-active');

          if (ink.offsetWidth === 0 && ink.offsetHeight === 0) {
            const size = Math.max(
              this.elementRef.nativeElement.offsetWidth,
              this.elementRef.nativeElement.offsetHeight,
            );

            ink.style.width = `${size}px`;
            ink.style.height = `${size}px`;
          }

          const rect = this.elementRef.nativeElement.getBoundingClientRect();

          ink.style.left = `${event.clientX - rect.left - ink.offsetWidth / 2}px`;
          ink.style.top = `${event.clientY - rect.top - ink.offsetHeight / 2}px`;

          ink.classList.add('x-ink-active');
          animationTimeoutID = setTimeout(() => ink.classList.remove('x-ink-active'), 401);
        },
      );

      const removeAnimationendListener = this.renderer.listen(ink, 'animationend', () => {
        clearTimeout(animationTimeoutID);
        ink.classList.remove('x-ink-active');
      });

      this.destroyRef.onDestroy(() => {
        clearTimeout(animationTimeoutID);
        removeMousedownListener();
        removeAnimationendListener();
        ink.remove();
      });
    });
  }
}
