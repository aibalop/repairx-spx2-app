import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-header-generic-form-modal',
  templateUrl: './header-generic-form-modal.component.html',
  styleUrls: ['./header-generic-form-modal.component.scss'],
})
export class HeaderGenericFormModalComponent implements OnInit {

  @Input() isView: boolean = false;

  @Input() isEdit: boolean = false;

  @Input() isSend: boolean = false;

  @Input() editText: string;

  @Input() addText: string;

  @Input() viewText: string;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    this.editText = this.editText ?? 'Editar';
    this.addText = this.addText ?? 'Agregar';
    this.viewText = this.viewText ?? 'Ver';
  }

}
