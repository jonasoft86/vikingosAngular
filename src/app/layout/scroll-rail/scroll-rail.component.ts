import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-scroll-rail',
  standalone: true,
  template: '<aside class="scroll-rail" aria-hidden="true"><span></span><b>ᛘ</b><i></i><em></em><span></span><strong></strong><span></span></aside>',
  styleUrl: './scroll-rail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollRailComponent {}
