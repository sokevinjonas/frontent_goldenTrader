import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChoisirAnalystePage } from './choisir-analyste.page';

describe('ChoisirAnalystePage', () => {
  let component: ChoisirAnalystePage;
  let fixture: ComponentFixture<ChoisirAnalystePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoisirAnalystePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
