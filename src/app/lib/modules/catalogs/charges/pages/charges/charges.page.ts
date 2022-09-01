import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChargeFormModalComponent } from '../../components/modals/charge-form-modal/charge-form-modal.component';

@Component({
  selector: 'app-charges',
  templateUrl: './charges.page.html',
  styleUrls: ['./charges.page.scss'],
})
export class ChargesPage implements OnInit {

  constructor(
    private _modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async onAdd(): Promise<void> {

    const createModal = await this._modalController.create({
      component: ChargeFormModalComponent,
      breakpoints: [0.25, 0.5, 0.75],
      initialBreakpoint: 0.75,
      backdropDismiss: false
    });

    await createModal.present();

    const { data } = await createModal.onDidDismiss();

    if (data) {
      // TODO: reload page list
      console.log(data);
    }

  }

  onSearch($event: string): void {
    console.log($event);
  }

  onUpdate(): void {
    console.log('OnUpdate');
  }

  onDelete(): void {
    console.log('OnDelete');
  }

}
