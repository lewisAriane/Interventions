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
      typesprobleme: ['', [Validators.required]]
      
    });
  
    this.typesprobleme.obtenirTypesProbleme()
    .subscribe(prob => this.typesProbleme = prob,
              error => this.errorMessage = <any>error);
  
  }

  save(): void {
  }


}
