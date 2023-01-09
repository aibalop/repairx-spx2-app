import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderRepairPaidStatusComponent } from './order-repair-paid-status.component';

describe('OrderRepairPaidStatusComponent', () => {
  let component: OrderRepairPaidStatusComponent;
  let fixture: ComponentFixture<OrderRepairPaidStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderRepairPaidStatusComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderRepairPaidStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
