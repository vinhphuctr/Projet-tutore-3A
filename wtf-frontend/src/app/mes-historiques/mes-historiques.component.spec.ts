import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesHistoriquesComponent } from './mes-historiques.component';

describe('MesHistoriquesComponent', () => {
  let component: MesHistoriquesComponent;
  let fixture: ComponentFixture<MesHistoriquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesHistoriquesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesHistoriquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
