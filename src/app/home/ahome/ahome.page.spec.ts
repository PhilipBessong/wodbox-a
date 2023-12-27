import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AhomePage } from './ahome.page';

describe('AhomePage', () => {
  let component: AhomePage;
  let fixture: ComponentFixture<AhomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AhomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
