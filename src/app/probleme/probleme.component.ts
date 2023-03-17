import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/validerzones/longueur-minimum.component';
@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css'],
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['', [Validators.required, VerifierCaracteresValidator.longueurMinimum(3)]],
    });
  }
  save(): void {}
}
