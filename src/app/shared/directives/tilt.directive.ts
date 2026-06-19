import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective {
  private readonly enabled =
    matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) {}

  @HostListener('pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.enabled) return;
    const element = this.elementRef.nativeElement;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    this.renderer.setStyle(element, '--tilt-x', `${(0.5 - y) * 7}deg`);
    this.renderer.setStyle(element, '--tilt-y', `${(x - 0.5) * 7}deg`);
    this.renderer.setStyle(element, '--glow-x', `${x * 100}%`);
    this.renderer.setStyle(element, '--glow-y', `${y * 100}%`);
    this.renderer.addClass(element, 'is-tilting');
  }

  @HostListener('pointerleave')
  onPointerLeave(): void {
    const element = this.elementRef.nativeElement;
    this.renderer.removeClass(element, 'is-tilting');
  }
}
