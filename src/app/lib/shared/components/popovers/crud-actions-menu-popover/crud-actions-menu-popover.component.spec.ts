import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrudActionsMenuPopoverComponent } from './crud-actions-menu-popover.component';

describe('CrudActionsMenuPopoverComponent', () => {
  let component: CrudActionsMenuPopoverComponent;
  let fixture: ComponentFixture<CrudActionsMenuPopoverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudActionsMenuPopoverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrudActionsMenuPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
