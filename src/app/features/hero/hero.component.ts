import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, OnDestroy } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements OnDestroy {
  private ticking = false;
  private readonly reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  private readonly onScroll = (): void => {
    if (this.ticking || this.reduceMotion.matches) return;
    this.ticking = true;
    requestAnimationFrame(() => this.updateParallax());
  };

  constructor(private readonly host: ElementRef<HTMLElement>) {
    afterNextRender(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      this.updateParallax();
    });
  }

  private updateParallax(): void {
    const section = this.host.nativeElement.querySelector<HTMLElement>('.hero');
    if (!section || window.scrollY > section.offsetHeight * 1.25) {
      this.ticking = false;
      return;
    }

    const layers: readonly [string, number][] = [
      ['.hero-scene__mountains', .035],
      ['.hero-scene__tide--back', .055],
      ['.hero-scene__tide--middle', .075],
      ['.hero-scene__tide--front', .095],
      ['.hero-scene__ship', .06],
      ['.hero-scene__foreground-tide', .11],
      ['.hero-scene__hull-wave--back', .12],
      ['.hero-scene__hull-wave--front', .12],
    ];

    layers.forEach(([selector, speed]) => {
      const layer = section.querySelector<HTMLElement>(selector);
      if (layer) layer.style.translate = `0 ${Math.round(window.scrollY * speed)}px`;
    });
    this.ticking = false;
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
  }
}
