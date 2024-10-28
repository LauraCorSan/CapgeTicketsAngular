import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetallesEventoComponent } from './ver-detalles-evento.component';

describe('VerDetallesEventoComponent', () => {
  let component: VerDetallesEventoComponent;
  let fixture: ComponentFixture<VerDetallesEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerDetallesEventoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDetallesEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
