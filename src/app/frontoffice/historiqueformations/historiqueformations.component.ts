import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/backoffice/models/Feedback';
import { Formation } from 'src/app/backoffice/models/Formation';
import { ActualitemanagmentService } from 'src/app/backoffice/service/actualitemanagment.service';
import { FeedbackService } from 'src/app/backoffice/service/feedback.service';
import { PresenceService } from 'src/app/backoffice/service/presence.service';
import { KeycloakService } from 'src/app/services/keycloak/keycloack.service';
import { UserProfile } from 'src/app/services/keycloak/user-profile';

@Component({
  selector: 'app-historiqueformations',
  templateUrl: './historiqueformations.component.html',
  styleUrls: ['./historiqueformations.component.scss']
})
export class HistoriqueformationsComponent implements OnInit {
  user?: UserProfile;
  formationsTerminees: Formation[] = [];
  feedbacks: { [key: number]: Feedback & { hover?: number } } = {};
  feedbackEnvoye: { [key: number]: boolean } = {};

  constructor(
    private keycloakService: KeycloakService,
    private presenceService: PresenceService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.user = this.keycloakService.profile;
    console.log("Utilisateur connecté :", this.user);

    if (this.user?.id) {
      this.loadFormationsTerminees(this.user.id);
    }
  }

  loadFormationsTerminees(userId: string): void {
    this.presenceService.estFormationTerminee(userId).subscribe({
      next: (formations) => {
        this.formationsTerminees = formations;
        console.log("📚 Formations terminées :", formations);

        formations.forEach(f => {
          this.feedbacks[f.id] = {
            commentaire: '',
            etoiles: 0,
            hover: 0
          };
        });
      },
      error: (err) => {
        console.error("Erreur lors du chargement des formations terminées", err);
      }
    });
  }

  envoyerFeedback(formationId: number, feedback: Feedback): void {
    this.feedbackService.ajouterFeedback(formationId, feedback).subscribe({
      next: () => {
        this.feedbackEnvoye[formationId] = true;
      },
      error: (err) => {
        console.error('Erreur lors de l\'envoi du feedback', err);
      }
    });
  }
}

  

  
