import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROCESS_STEPS, VALUES } from '../../shared/data/landing.data';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  readonly values = VALUES;
  readonly steps = PROCESS_STEPS;
}
