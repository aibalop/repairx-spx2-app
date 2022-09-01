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

  @Input() editText: string = 'Editar';

  @Input() addText: string = 'Agregar';

  @Input() viewText: string = 'Ver';

  constructor(public modalController: ModalController) { }

  ngOnInit() { }

}
