import { Component, OnInit } from '@angular/core';
import { InscriptionService } from 'src/app/backoffice/service/inscription.service';
import { KeycloakService } from 'src/app/services/keycloak/keycloack.service';
import { UserProfile } from 'src/app/services/keycloak/user-profile';

@Component({
  selector: 'app-progression',
  templateUrl: './progression.component.html',
  styleUrls: ['./progression.component.scss']
})
export class ProgressionComponent implements OnInit {

  user?: UserProfile;
  progressions: any[] = [];

  constructor(
    private keycloakService: KeycloakService,
    private inscriptionService: InscriptionService
  ) {}

  ngOnInit(): void {
    this.user = this.keycloakService.profile;
    console.log('👤 Utilisateur connecté :', this.user);

    if (this.user?.id) {
      this.loadProgression(this.user.id);
    }
  }

  loadProgression(userId: string): void {
    this.inscriptionService.getProgressionParUtilisateur(userId).subscribe({
      next: (data) => {
        this.progressions = data;
        console.log('📊 Progressions récupérées :', data);
      },
      error: (err) => {
        console.error('❌ Erreur lors de la récupération des progressions :', err);
      }
    });
  }
}
