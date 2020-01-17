import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FAQAssetsAPIPage } from './faq-assets-api.page';

describe('FAQAssetsAPIPage', () => {
  let component: FAQAssetsAPIPage;
  let fixture: ComponentFixture<FAQAssetsAPIPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FAQAssetsAPIPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FAQAssetsAPIPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
