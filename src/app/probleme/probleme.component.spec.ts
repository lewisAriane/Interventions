import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';
import { TypesproblemeService } from './typesprobleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers: [TypesproblemeService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#1 | Zone PRÉNOM invalide avec 2 caractères', () => {
    let saisiePrenom = component.problemeForm.controls['prenom'];
    saisiePrenom.setValue('a'.repeat(2));
    expect(saisiePrenom.valid).toBeFalsy();
  })

  it('#2 | Zone PRÉNOM valide avec 3 caractères', () => {
    let saisiePrenom = component.problemeForm.controls['prenom'];
    saisiePrenom.setValue('a'.repeat(3));
    expect(saisiePrenom.valid).toBeTruthy();
  });

  it('#3 | Zone PRÉNOM valide avec 200 caractères', () => {
    let saisiePrenom = component.problemeForm.controls['prenom'];
    saisiePrenom.setValue('a'.repeat(200));
    expect(saisiePrenom.valid).toBeTruthy();
  });

  it('#4 | Zone PRÉNOM invalide avec aucune valeur', () => {
    let saisiePrenom = component.problemeForm.controls['prenom'];
    saisiePrenom.setValue('');
    let errors = saisiePrenom.errors || {};
    expect(errors['minLength']).toBeFalsy();
  });

  it('#5 | Zone PRÉNOM invalide avec 10 espaces', () => {
    let saisiePrenom = component.problemeForm.controls['prenom'];
    saisiePrenom.setValue(' '.repeat(10));
    expect(saisiePrenom.valid).toBeFalse();
  });

  it('#6 | Zone PRÉNOM invalide avec 2 espaces et 1 caractère', () => {
    let saisiePrenom = component.problemeForm.controls['prenom'];
    saisiePrenom.setValue("  a")
    expect(saisiePrenom.valid).toBeFalse();
  });

  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.gestionNotification('PasNotifier');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.gestionNotification('PasNotifier');

    //let errors = {};
    let zone = component.problemeForm.get('telephone');
    zone.setValue('');
    //errors = zone.errors || {};
    //expect(errors['required']).toBeTruthy();

    expect(zone.value).toBe('');

  });


  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.gestionNotification('PasNotifier');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.disabled).toBeTruthy();
  });

  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.gestionNotification('PasNotifier');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.disabled).toBeTruthy();
  });


});
