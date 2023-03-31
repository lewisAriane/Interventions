import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/validerzones/longueur-minimum.component';
import { TypeProblemeService } from './typeProbleme.service';
import { ITypeProbleme } from "./typeProbleme";

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css'],
})

export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typeProbleme: ITypeProbleme[];
  errorMessage: string;

  constructor(private fb: FormBuilder, private typeprobleme: TypeProblemeService) {}
  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['' , [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      nom: ['' , [Validators.maxLength(50), Validators.required]],
      typeprobleme: ['', [Validators.required]]
    });

    this.typesprobleme.obtenirTypeProbleme()
    .subscribe(prob => this.typeProbleme = prob,
              error => this.errorMessage = <any>error);



  }
  save(): void {}
}
