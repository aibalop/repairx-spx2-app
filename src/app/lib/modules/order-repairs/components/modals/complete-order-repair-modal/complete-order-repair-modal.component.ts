import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/lib/core/services/toast.service';
import { RegexUtil } from 'src/app/lib/core/utils/regex.util';

@Component({
  selector: 'app-complete-order-repair-modal',
  templateUrl: './complete-order-repair-modal.component.html',
  styleUrls: ['./complete-order-repair-modal.component.scss'],
})
export class CompleteOrderRepairModalComponent implements OnInit {

  today = new Date().toISOString();
  form = new FormGroup({
    advanceAmount: new FormControl(null, [Validators.required, Validators.pattern(RegexUtil.CURRENCY)]),
    deliveryDate: new FormControl(this.today, Validators.required)
  });
  isSend = false;

  constructor(
    private _modalController: ModalController,
    private _toastService: ToastService,
  ) { }

  ngOnInit() { }

  onSubmit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this._toastService.warning('Complete los campos obligatorios', 'Datos Incompletos');
      return;
    }

    this.isSend = true;

    this._modalController.dismiss(this.form.value);
  }
}
