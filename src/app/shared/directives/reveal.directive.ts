import { afterNextRender, Directive, ElementRef, input, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnDestroy {
  readonly delay = input(0);
  readonly mask = input(false);
  readonly immediate = input(false);
  private observer?: IntersectionObserver;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) {
    afterNextRender(() => this.initialize());
  }

  private initialize(): void {
    const element = this.elementRef.nativeElement;
    this.renderer.addClass(element, 'reveal');
    this.renderer.setStyle(element, '--reveal-delay', `${this.delay()}ms`);
    if (this.mask()) this.renderer.addClass(element, 'reveal--mask');

    if (this.immediate()) {
      requestAnimationFrame(() => requestAnimationFrame(() => this.renderer.addClass(element, 'is-visible')));
      return;
    }

    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      this.renderer.addClass(element, 'is-visible');
      return;
    }

    this.observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      this.renderer.addClass(element, 'is-visible');
      this.observer?.disconnect();
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
