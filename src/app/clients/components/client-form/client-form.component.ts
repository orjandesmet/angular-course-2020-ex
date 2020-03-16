import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  @Output() formSubmit = new EventEmitter<Client>();
  @Output() deleteClient = new EventEmitter<string>();
  @Input() set selectedClient(client: Client) {
    if (this.clientForm) {
      if (client) {
        this.clientForm.patchValue(client);
      } else {
        this.clientForm.reset();
      }
    }
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.clientForm.valid) {
      this.formSubmit.emit(this.clientForm.value);
    } else {
      this.clientForm.markAllAsTouched();
    }
  }

  onDeleteClicked() {
    if (this.clientForm.get('id').value) {
      this.deleteClient.emit(this.clientForm.get('id').value);
      this.clientForm.reset();
    }
  }

}
