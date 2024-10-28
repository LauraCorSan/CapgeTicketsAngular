import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarAltaEventoComponent } from './dar-alta-evento.component';

describe('DarAltaEventoComponent', () => {
  let component: DarAltaEventoComponent;
  let fixture: ComponentFixture<DarAltaEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DarAltaEventoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarAltaEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
