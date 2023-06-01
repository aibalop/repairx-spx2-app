import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertDialogService } from 'src/app/lib/core/services/alert-dialog.service';
import { ToastService } from 'src/app/lib/core/services/toast.service';
import { ConfirmPasswordValidator } from 'src/app/lib/core/validators/confirmed-password.validator';
import { AuthApiService } from 'src/app/lib/modules/auth/api/auth.api.service';

@Component({
  selector: 'app-change-password-form-modal',
  templateUrl: './change-password-form-modal.component.html',
  styleUrls: ['./change-password-form-modal.component.scss'],
})
export class ChangePasswordFormModalComponent implements OnInit {

  @Input() username: string;

  form = new FormGroup({
    currentPassword: new FormControl(null, Validators.required),
    newPassword: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, [Validators.required]),
  }, {
    validators: ConfirmPasswordValidator("newPassword", "confirmPassword") as ValidatorFn
  });

  isSend = false;

  constructor(
    private _modalController: ModalController,
    private _alertDialogService: AlertDialogService,
    private _toastService: ToastService,
    private _authService: AuthApiService,
  ) { }

  ngOnInit() {
  }

  onSubmit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this._toastService.warning('Complete los campos obligatorios', 'Datos Incompletos');
      return;
    }

    this.isSend = true;

    this._updatePassword();

  }

  private async _updatePassword(): Promise<void> {

    try {
      const { currentPassword, newPassword } = this.form.value;
      await this._authService.changePassword(this.username, currentPassword, newPassword).toPromise();
      this._toastService.success('Contraseña actualizada correctamente');
      this._modalController.dismiss();
    } catch (error) {
      this.isSend = false;
      this._toastService.danger('No se pudo completar la actualización');
      this._alertDialogService.catchError(error);
    }

  }

}
