import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from '../../domain/client';

@Component({
  selector: 'jworks-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientFormComponent implements OnInit {

  clientForm = this.formBuilder.group({
    id: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: [''],
    birthday: [''],
    city: [''],
    zip: ['']
  });

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: { selectedClient: Client },
    private matDialogRef: MatDialogRef<ClientFormComponent, Client>,
  ) { }

  ngOnInit(): void {
    if (this.data?.selectedClient) {
      this.clientForm.patchValue(this.data?.selectedClient);
    } else {
      this.clientForm.reset();
    }
  }

  onSubmit() {
    if (this.clientForm.valid) {
      this.matDialogRef.close(this.clientForm.value);
    } else {
      this.clientForm.markAllAsTouched();
    }
  }

}
