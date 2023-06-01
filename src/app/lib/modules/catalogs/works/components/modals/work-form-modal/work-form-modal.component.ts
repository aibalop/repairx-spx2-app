import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertDialogService } from 'src/app/lib/core/services/alert-dialog.service';
import { ToastService } from 'src/app/lib/core/services/toast.service';
import { RegexUtil } from 'src/app/lib/core/utils/regex.util';
import { WorkApiService } from '../../../api/work.api.service';
import { IWork } from '../../../interfaces/work.interface';

@Component({
  selector: 'app-work-form-modal',
  templateUrl: './work-form-modal.component.html',
  styleUrls: ['./work-form-modal.component.scss'],
})
export class WorkFormModalComponent implements OnInit {

  @Input() isView: boolean = false;

  @Input() isEdit: boolean = false;

  @Input() workId: string;
  
  @Input() addText: string;

  form = new FormGroup({
    key: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    description: new FormControl(null),
    amount: new FormControl(null, [Validators.required, Validators.pattern(RegexUtil.CURRENCY)])
  });

  isSend = false;

  constructor(
    private _modalController: ModalController,
    private _alertDialogService: AlertDialogService,
    private _toastService: ToastService,
    private _workApiService: WorkApiService
  ) { }

  ngOnInit() {
    if (this.workId) {
      this._getWork();
    }
  }

  onSubmit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this._toastService.warning('Complete los campos obligatorios', 'Datos Incompletos');
      return;
    }

    this.isSend = true;

    if (this.isEdit) {
      this._update();
    } else {
      this._create();
    }

  }

  private async _getWork(): Promise<void> {

    try {
      const work = await this._workApiService.getById(this.workId).toPromise();
      this.form.patchValue(work);
    } catch (error) {
      this._toastService.danger('No se pudo obtener los datos del servicio');
      this._alertDialogService.catchError(error);
      this._modalController.dismiss(true);
    }

  }

  private async _create(): Promise<void> {

    try {
      const workCreated = await this._workApiService.create(this.form.value as IWork).toPromise();
      this._toastService.success('Servicio creado correctamente');
      this._modalController.dismiss(workCreated);
    } catch (error) {
      this.isSend = false;
      this._toastService.danger('No se pudo completar el registro');
      this._alertDialogService.catchError(error);
    }

  }

  private async _update(): Promise<void> {

    try {
      const workUpdated = await this._workApiService.update(this.workId, this.form.value as IWork).toPromise();
      this._toastService.success('Servicio actualizado correctamente');
      this._modalController.dismiss(workUpdated);
    } catch (error) {
      this.isSend = false;
      this._toastService.danger('No se pudo completar la actualización');
      this._alertDialogService.catchError(error);
    }

  }

}
