import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqOrderComponent } from './req-order.component';

describe('ReqOrderComponent', () => {
  let component: ReqOrderComponent;
  let fixture: ComponentFixture<ReqOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReqOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReqOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
