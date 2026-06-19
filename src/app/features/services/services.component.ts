import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SERVICES } from '../../shared/data/landing.data';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RevealDirective, TiltDirective],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
  readonly services = SERVICES;
}
