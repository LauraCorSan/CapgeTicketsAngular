import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarEventoComponent } from './modificar-evento.component';

describe('ModificarEventoComponent', () => {
  let component: ModificarEventoComponent;
  let fixture: ComponentFixture<ModificarEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarEventoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
