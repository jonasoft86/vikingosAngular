import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutComponent } from './features/about/about.component';
import { ContactComponent } from './features/contact/contact.component';
import { HeroComponent } from './features/hero/hero.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { ServicesComponent } from './features/services/services.component';
import { HeaderComponent } from './layout/header/header.component';
import { ScrollRailComponent } from './layout/scroll-rail/scroll-rail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    ScrollRailComponent,
    HeroComponent,
    ServicesComponent,
    ProjectsComponent,
    AboutComponent,
    ContactComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
