import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashSaleModalComponent } from './flash-sale-modal.component';

describe('FlashSaleModalComponent', () => {
  let component: FlashSaleModalComponent;
  let fixture: ComponentFixture<FlashSaleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashSaleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashSaleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
