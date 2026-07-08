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
  private sections: HTMLElement[] = [];
  private ticking = false;
  private readonly onScroll = (): void => {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.updateMenuPosition();
      this.ticking = false;
    });
  };
  private readonly onHashChange = (): void => {
    requestAnimationFrame(() => this.updateMenuPosition());
  };

  constructor() {
    afterNextRender(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('hashchange', this.onHashChange);
      this.sections = Array.from(document.querySelectorAll<HTMLElement>('main > section[id]'));
      this.updateMenuPosition();
      requestAnimationFrame(() => this.updateMenuPosition());
    });
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  setActiveSection(sectionId: string): void {
    this.activeSection.set(sectionId);
    this.closeMenu();
  }

  private updateMenuPosition(): void {
    this.scrolled.set(window.scrollY > 20);
    if (!this.sections.length) return;

    const headerHeight = document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 0;
    const readingLine = headerHeight + window.innerHeight * 0.32;
    const currentSection = this.sections.reduce((current, section) => {
      const top = section.getBoundingClientRect().top;
      return top <= readingLine ? section : current;
    }, this.sections[0]);

    this.activeSection.set(currentSection.id);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('hashchange', this.onHashChange);
  }
}
