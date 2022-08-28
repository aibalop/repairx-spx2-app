import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-charge-form-modal',
  templateUrl: './charge-form-modal.component.html',
  styleUrls: ['./charge-form-modal.component.scss'],
})
export class ChargeFormModalComponent implements OnInit {

  @Input() isView: boolean = false;

  @Input() isEdit: boolean = false;

  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null)
  });

  isSend = false;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  onSubmit(): void {
    console.log(this.form.value);
    
  }

}
