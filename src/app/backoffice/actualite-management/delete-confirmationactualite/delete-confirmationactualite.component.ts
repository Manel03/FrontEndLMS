import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActualitemanagmentService } from '../../service/actualitemanagment.service';



@Component({
  selector: 'app-delete-confirmationactualite',
  templateUrl: './delete-confirmationactualite.component.html',
  styleUrls: ['./delete-confirmationactualite.component.scss']
})
export class DeleteConfirmationactualiteComponent {
  public message: string = '';
  public id: number = 0;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private actualiteService: ActualitemanagmentService
  ) {
    this.message = config.data.message;
    this.id = config.data.id;
  }

  confirmDelete(): void {
    // Correction ici : Utilisation de this.config.data.idAct
    this.actualiteService.deleteFormation(this.config.data.id).subscribe(() => {
      this.ref.close(true);
    });
  }

  cancel(): void {
    this.ref.close(false);
  }
}