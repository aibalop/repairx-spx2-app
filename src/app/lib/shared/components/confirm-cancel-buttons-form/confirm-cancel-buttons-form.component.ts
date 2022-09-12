import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-cancel-buttons-form',
  templateUrl: './confirm-cancel-buttons-form.component.html',
  styleUrls: ['./confirm-cancel-buttons-form.component.scss'],
})
export class ConfirmCancelButtonsFormComponent implements OnInit {

  @Input() cancelText: string = 'Cancelar';

  @Input() confirmText: string = 'Aceptar';

  @Input() isSend: boolean = false;

  constructor(public location: Location) { }

  ngOnInit() { }

}
