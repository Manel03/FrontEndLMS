import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-motif-dialog',
  template: `
    <h2 mat-dialog-title>Motif du refus</h2>
    <mat-dialog-content>
      <p>{{ data.motif || 'Aucun motif fourni.' }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Fermer</button>
    </mat-dialog-actions>
  `
})
export class MotifDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { motif: string }) {}
}
