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

    let zone = component.problemeForm.get('telephone');
    zone.setValue('');

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

  it('#19 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.gestionNotification('PasNotifier');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED'); 
  });

  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.gestionNotification('Courriel');
    
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.disabled).toBeFalsy();
  });

  
  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.gestionNotification('Courriel');
    
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.disabled).toBeFalsy();
  });

  
  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.gestionNotification('Courriel');
    
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('');

    expect(zone.valid).toBeFalse();
  });

  
  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.gestionNotification('Courriel');
    
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('');

    expect(zone.valid).toBeFalse();
  });

  
  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.gestionNotification('Courriel');
    
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('mauvaisCourriel');

    expect(zone.valid).toBeFalse();
  });

  
  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    component.gestionNotification('Courriel');
    //let errors = {};
    
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');

    let groupe = component.problemeForm.get('courrielGroup');
    
    zoneCourriel.setValue('');
    zoneCourrielConfirmation.setValue('lewis.ariane@gmail.com');

    
    //let errors = groupe.errors || {};
    
    expect(groupe.invalid).toBeTruthy();
  });

  
  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.gestionNotification('Courriel');
    
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');

    zoneCourriel.setValue('lewis.ariane@gmail.com');
    zoneCourrielConfirmation.setValue('');

    let groupe = component.problemeForm.get('courrielGroup');
    //errors = groupe.errors || {};
    
    expect(groupe.invalid).toBeTruthy();
  });

  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.gestionNotification('Courriel');

    let errors = {};
    
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');

    zoneCourriel.setValue('lewis.ariane@gmail.com');
    zoneCourrielConfirmation.setValue('l.ariane@gmail.com');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};
    
    expect(errors['match']).toBeTrue();
    
  });

  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.gestionNotification('Courriel');

    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');

    zoneCourriel.setValue('lewis.ariane@gmail.com');
    zoneCourrielConfirmation.setValue('lewis.ariane@gmail.com');

    let groupe = component.problemeForm.get('courrielGroup');
    let errors = groupe.errors || {};
    
    expect(errors['match']).toBeFalse();
  });

});
