import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfirmCancelButtonsFormComponent } from './confirm-cancel-buttons-form.component';

describe('ConfirmCancelButtonsFormComponent', () => {
  let component: ConfirmCancelButtonsFormComponent;
  let fixture: ComponentFixture<ConfirmCancelButtonsFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmCancelButtonsFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmCancelButtonsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
