import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContributorsPage } from './contributors.page';

describe('ContributorsPage', () => {
  let component: ContributorsPage;
  let fixture: ComponentFixture<ContributorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributorsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContributorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
