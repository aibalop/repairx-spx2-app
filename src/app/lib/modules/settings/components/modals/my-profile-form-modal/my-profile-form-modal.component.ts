import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {UserApiService} from '../../../../users/api/user.api.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertDialogService} from '../../../../../core/services/alert-dialog.service';
import {ToastService} from '../../../../../core/services/toast.service';
import {IUser} from '../../../../users/interfaces/user.interface';

@Component({
  selector: 'app-my-profile-form-modal',
  templateUrl: './my-profile-form-modal.component.html',
  styleUrls: ['./my-profile-form-modal.component.scss'],
})
export class MyProfileFormModalComponent implements OnInit {

  @Input() userId: string;

  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  isSend = false;

  constructor(
    private _modalController: ModalController,
    private _userApiService: UserApiService,
    private _alertDialogService: AlertDialogService,
    private _toastService: ToastService,
  ) {
  }

  ngOnInit() {
    this._getUser();
  }

  onSubmit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this._toastService.warning('Complete los campos obligatorios', 'Datos Incompletos');
      return;
    }

    this.isSend = true;

    this._update();

  }

  private async _update(): Promise<void> {

    try {
      const data = this.form.value as IUser;
      await this._userApiService.update(this.userId, data).toPromise();
      this._toastService.success('Perfil actualizado correctamente');
      this._modalController.dismiss({_id: this.userId, ...data});
    } catch (error) {
      this.isSend = false;
      this._toastService.danger('No se pudo completar la actualización');
      this._alertDialogService.catchError(error);
    }

  }

  private async _getUser(): Promise<void> {

    try {
      const data = await this._userApiService.getById(this.userId).toPromise();
      this.form.patchValue(data);
    } catch (error) {
      this._toastService.danger('No se pudo completar la actualización');
      this._alertDialogService.catchError(error);
      this._modalController.dismiss();
    }

  }

}
