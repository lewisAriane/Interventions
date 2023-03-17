import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#1 | Zone PRÉNOM invalide avec 2 caractères', () => { 
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue('a'.repeat(2));
    expect(prenom.valid).toBeFalsy();
  });
});
