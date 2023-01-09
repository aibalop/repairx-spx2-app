import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderRepairDeviceStatusComponent } from './order-repair-device-status.component';

describe('OrderRepairDeviceStatusComponent', () => {
  let component: OrderRepairDeviceStatusComponent;
  let fixture: ComponentFixture<OrderRepairDeviceStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderRepairDeviceStatusComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderRepairDeviceStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
