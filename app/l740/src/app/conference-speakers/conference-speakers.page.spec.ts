import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConferenceSpeakersPage } from './conference-speakers.page';

describe('ConferenceSpeakersPage', () => {
  let component: ConferenceSpeakersPage;
  let fixture: ComponentFixture<ConferenceSpeakersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConferenceSpeakersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConferenceSpeakersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
