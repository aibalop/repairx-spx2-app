import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-cancel-buttons-form-modal',
  templateUrl: './confirm-cancel-buttons-form-modal.component.html',
  styleUrls: ['./confirm-cancel-buttons-form-modal.component.scss'],
})
export class ConfirmCancelButtonsFormModalComponent implements OnInit {

  @Input() cancelText: string = 'Cancelar';

  @Input() confirmText: string = 'Aceptar';

  @Input() isSend: boolean = false;

  constructor(public modalController: ModalController) { }

  ngOnInit() { }

}
