import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubmodelPage } from './submodel.page';

describe('SubmodelPage', () => {
  let component: SubmodelPage;
  let fixture: ComponentFixture<SubmodelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmodelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubmodelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
