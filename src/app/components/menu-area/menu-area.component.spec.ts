import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAreaComponent } from './menu-area.component';

describe('MenuAreaComponent', () => {
  let component: MenuAreaComponent;
  let fixture: ComponentFixture<MenuAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
