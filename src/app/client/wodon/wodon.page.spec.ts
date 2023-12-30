import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WodonPage } from './wodon.page';

describe('WodonPage', () => {
  let component: WodonPage;
  let fixture: ComponentFixture<WodonPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WodonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
