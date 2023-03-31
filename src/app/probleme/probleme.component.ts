import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/validerzones/longueur-minimum.component';
import { TypesproblemeService } from './typesprobleme.service';
import { ITypeProbleme } from "./typesprobleme";

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: string;

  constructor(private fb: FormBuilder, private typesprobleme: TypesproblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['' , [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      nom: ['' , [Validators.maxLength(50), Validators.required]],
      typesprobleme: ['', [Validators.required]],
      notification: ['PasNotifier'],
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
      }),
    telephone: [{value: '', disabled: true}],
    });
  
    this.typesprobleme.obtenirTypesProbleme()
    .subscribe(prob => this.typesProbleme = prob,
              error => this.errorMessage = <any>error);
  
  }

  save(): void {
  }


  gestionNotification(typeNotification: string): void {
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();

    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();
    courrielConfirmationControl.disable();

    const telephoneControl = this.problemeForm.get('telephone');
    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();

    if (typeNotification === 'ParCourriel') {   
      courrielControl.enable();  
      courrielControl.setValidators([Validators.required]);
      courrielConfirmationControl.enable();    
      courrielConfirmationControl.setValidators([Validators.required]);       
    }
    else
      {
        if(typeNotification === 'ParTelephone')
        {
          telephoneControl.enable();     
          telephoneControl.setValidators([Validators.required]);  
        }
        else if(typeNotification === 'PasNotifier'){
          courrielControl.disable();  
          courrielConfirmationControl.disable(); 
          telephoneControl.disable();
        }
      }

    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
  }


}
