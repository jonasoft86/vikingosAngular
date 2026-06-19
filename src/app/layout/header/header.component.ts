import { afterNextRender, ChangeDetectionStrategy, Component, OnDestroy, signal } from '@angular/core';
import { NAV_ITEMS } from '../../shared/data/landing.data';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy {
  readonly navItems = NAV_ITEMS;
  readonly activeSection = signal('inicio');
  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);
  private observer?: IntersectionObserver;
  private readonly onScroll = (): void => this.scrolled.set(window.scrollY > 20);

  constructor() {
    afterNextRender(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      this.onScroll();
      this.observeSections();
    });
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  private observeSections(): void {
    const sections = document.querySelectorAll<HTMLElement>('main > section[id]');
    this.observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) this.activeSection.set(visible.target.id);
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0.05, 0.25, 0.5] });
    sections.forEach((section) => this.observer?.observe(section));
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    this.observer?.disconnect();
  }
}
