import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinDetialComponent } from './coin-detial.component';

describe('CoinDetialComponent', () => {
  let component: CoinDetialComponent;
  let fixture: ComponentFixture<CoinDetialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinDetialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinDetialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
