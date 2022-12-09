import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompleteOrderRepairModalComponent } from './complete-order-repair-modal.component';

describe('CompleteOrderRepairModalComponent', () => {
  let component: CompleteOrderRepairModalComponent;
  let fixture: ComponentFixture<CompleteOrderRepairModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteOrderRepairModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompleteOrderRepairModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
