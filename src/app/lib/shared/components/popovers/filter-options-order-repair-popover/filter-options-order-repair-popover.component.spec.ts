import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilterOptionsOrderRepairPopoverComponent } from './filter-options-order-repair-popover.component';

describe('FilterOptionsOrderRepairPopoverComponent', () => {
  let component: FilterOptionsOrderRepairPopoverComponent;
  let fixture: ComponentFixture<FilterOptionsOrderRepairPopoverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterOptionsOrderRepairPopoverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterOptionsOrderRepairPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
