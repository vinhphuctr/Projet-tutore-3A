import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BesoinAideComponent } from './besoin-aide.component';

describe('BesoinAideComponent', () => {
  let component: BesoinAideComponent;
  let fixture: ComponentFixture<BesoinAideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BesoinAideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BesoinAideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
