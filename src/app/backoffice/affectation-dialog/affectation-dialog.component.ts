import { Component } from '@angular/core';
import { User } from '../models/User';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-affectation-dialog',
  templateUrl: './affectation-dialog.component.html',
  styleUrls: ['./affectation-dialog.component.scss']
})
export class AffectationDialogComponent {
  
  selectedUsers: User[] = [];

  users: User[] = [];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.users = this.config.data.users;
  }

 confirm() {
  this.ref.close(this.selectedUsers);
}


  cancel() {
    this.ref.close(null);
  }
}
