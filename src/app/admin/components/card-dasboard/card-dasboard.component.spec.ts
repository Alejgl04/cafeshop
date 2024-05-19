import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDasboardComponent } from './card-dasboard.component';

describe('CardDasboardComponent', () => {
  let component: CardDasboardComponent;
  let fixture: ComponentFixture<CardDasboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDasboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
