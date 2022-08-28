import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfirmCancelButtonsFormModalComponent } from './confirm-cancel-buttons-form-modal.component';

describe('ConfirmCancelButtonsFormModalComponent', () => {
  let component: ConfirmCancelButtonsFormModalComponent;
  let fixture: ComponentFixture<ConfirmCancelButtonsFormModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmCancelButtonsFormModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmCancelButtonsFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
