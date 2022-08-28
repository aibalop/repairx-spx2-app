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
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async onAdd(): Promise<void> {
    console.log('Se dio click en agregar');
    const createModal = await this.modalController.create({
      component: ChargeFormModalComponent,
      breakpoints: [0.25, 0.5, 0.75],
      initialBreakpoint: 0.75,
      backdropDismiss: false
    });

    await createModal.present();
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
