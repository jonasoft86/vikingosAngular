import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../../layout/footer/footer.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, RevealDirective, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private readonly formBuilder = inject(FormBuilder);
  readonly status = signal('');
  readonly statusType = signal<'success' | 'error' | ''>('');

  readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.statusType.set('error');
      this.status.set('Revisa los campos obligatorios antes de continuar.');
      return;
    }

    this.statusType.set('success');
    this.status.set('Formulario validado. Falta conectar el servicio de envío.');
  }

  hasError(controlName: keyof ContactComponent['form']['controls']): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }
}
