import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActualitemanagmentService } from 'src/app/backoffice/service/actualitemanagment.service';
import { InscriptionService } from 'src/app/backoffice/service/inscription.service';
import { KeycloakService } from 'src/app/services/keycloak/keycloack.service';
import { MotifDialogComponent } from '../motif-dialog/motif-dialog.component';

@Component({
  selector: 'app-historique-demande',
  templateUrl: './historique-demande.component.html',
  styleUrls: ['./historique-demande.component.scss']
})
export class HistoriqueDemandeComponent implements OnInit {
  inscriptions: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private keycloakService: KeycloakService,
    private formationService: ActualitemanagmentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUserInscriptions();
  }

  loadUserInscriptions(): void {
    const user = this.keycloakService.profile;
    if (user?.id) {
      this.isLoading = true;
      this.formationService.getUserInscriptions(user.id).subscribe({
        next: (data) => {
          this.inscriptions = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des inscriptions:', err);
          this.errorMessage = 'Une erreur est survenue lors du chargement de vos inscriptions.';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'Utilisateur non connecté.';
      this.isLoading = false;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'VALIDEE':
        return 'status-valid';
      case 'REFUSEE':
        return 'status-refused';
      case 'EN_ATTENTE':
        return 'status-pending';
      default:
        return '';
    }
  }

  openMotifDialog(motif: string): void {
  this.dialog.open(MotifDialogComponent, {
    data: { motif }
  });
}
}