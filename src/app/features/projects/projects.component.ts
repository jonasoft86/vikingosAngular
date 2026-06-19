import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROJECTS } from '../../shared/data/landing.data';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RevealDirective, TiltDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  readonly projects = PROJECTS;
}
