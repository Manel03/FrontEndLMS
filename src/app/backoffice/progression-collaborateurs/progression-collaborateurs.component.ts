import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak/keycloack.service';
import { UserManagementService } from '../service/user-management.service';
import { UserDetails } from '../models/User';
import { InscriptionService } from '../service/inscription.service';

@Component({
  selector: 'app-progression-collaborateurs',
  templateUrl: './progression-collaborateurs.component.html',
  styleUrls: ['./progression-collaborateurs.component.scss']
})
export class ProgressionCollaborateursComponent implements OnInit {
  userId!: string;
  collaborateurs: UserDetails[] = [];

  constructor(
    private keycloakService: KeycloakService,
    private userManagementService: UserManagementService,
    private inscriptionService: InscriptionService
  ) {}

  ngOnInit(): void {
    const user = this.keycloakService.profile;
    if (user?.id) {
      this.userId = user.id;
      this.getCollaborateurs();
    }
  }

 getCollaborateurs() {
  this.userManagementService.getCollaborateursByUser(this.userId).subscribe({
    next: (res: UserDetails[]) => {
      console.error(`res progression pour:`, res);
      if (res && res.length > 0) {
        let loadedCount = 0;
        const total = res.length;
        const collaborateursAvecProgression: UserDetails[] = [];

        res.forEach(collaborateur => {
          console.error(`res collaborateur pour:`, collaborateur);
          this.inscriptionService.getProgressionParUtilisateur(collaborateur.userUuid).subscribe({
            next: (data) => {
              if (data && data.length > 0) {
                collaborateur.progressions = data;
                collaborateursAvecProgression.push(collaborateur);
              }
              loadedCount++;
              if (loadedCount === total) {
                this.collaborateurs = collaborateursAvecProgression;
              }
            },
            error: (err) => {
              console.error(`❌ Erreur progression pour ${collaborateur.userUuid}:`, err);
              loadedCount++;
              if (loadedCount === total) {
                this.collaborateurs = collaborateursAvecProgression;
              }
            }
          });
        });
      }
    },
    error: (err) => {
      console.error('❌ Erreur lors de la récupération des collaborateurs:', err);
    }
  });
}

}
