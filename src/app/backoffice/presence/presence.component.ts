import { Component, Input, OnInit } from '@angular/core';
import { InscritFormationUser } from '../models/InscritFormationUser';
import { Presence } from '../models/Presence';
import { PresenceService } from '../service/presence.service';
import { ActualitemanagmentService } from '../service/actualitemanagment.service';
import { Formation } from '../models/Formation';
import { InscriptionService } from '../service/inscription.service';
import { forkJoin, Observable } from 'rxjs';
import { User } from '../models/User';
import { UserManagementService } from '../service/user-management.service';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.scss']
})
export class PresenceComponent implements OnInit {
  formations: Formation[] = [];
  presencesExistantes: Presence[] = [];

  selectedFormationId: number | null = null;
  inscrits: InscritFormationUser[] = [];
  presences: { [inscritId: number]: boolean } = {};
  selectedDate: string = new Date().toISOString().split('T')[0];
  errorMessage: string = '';
  successMessage: string = '';
  dateMin: string = '';
  dateMax: string = '';



  constructor(
    private formationService: ActualitemanagmentService,
    private inscriptionService: InscriptionService,
    private presenceService: PresenceService,
    private userService: UserManagementService
  ) {}

  ngOnInit(): void {
    this.formationService.getAllFormations().subscribe({
      next: (formations) => {
        this.formations = formations;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des formations.';
        console.error(err);
      }
    });
  }

 onFormationChange(): void {
  if (this.selectedFormationId) {
    this.formationService.getFormationById(this.selectedFormationId).subscribe({
      next: (formation: Formation) => {
        console.log("formation", formation);

        this.inscrits = (formation?.inscriptions ?? []).filter(inscrit => inscrit.etat === 'APPROUVEE');


       this.dateMin = this.formatDateStrict(new Date(formation.dateDebut), 0);  // +1 jour
       this.dateMax = this.formatDateStrict(new Date(formation.dateFin), 0);   // -1 jour
       this.selectedDate = '';
       this.presencesExistantes = []; // reset si précédente invalide

      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des formations.';
        console.error(err);
      }
    });
  } else {
    this.inscrits = [];
    this.presences = {};
    this.dateMin = '';
    this.dateMax = '';
  }
}
onDateChange(): void {
  if (this.selectedFormationId && this.selectedDate) {
    this.presenceService.getPresencesByFormationAndDate(this.selectedFormationId, this.selectedDate)
      .subscribe({
        next: (presences) => {
          this.presencesExistantes = presences;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des présences existantes :', err);
        }
      });
  } else {
    this.presencesExistantes = [];
  }
}

formatDateStrict(date: Date, daysOffset: number): string {
  const adjustedDate = new Date(date);
  adjustedDate.setDate(adjustedDate.getDate() + daysOffset);
  return adjustedDate.toISOString().split('T')[0];
}
estDejaPresent(inscritId: number): boolean {
  return this.presencesExistantes.some(p => p.inscrit && p.inscrit.id === inscritId);
}

  enregistrerPresences(): void {
    if (!this.selectedFormationId || !this.selectedDate) {
      this.errorMessage = 'Veuillez sélectionner une formation et une date.';
      return;
    }

    const presenceObservables: Observable<Presence>[] = [];

   this.inscrits.forEach(inscrit => {
  if (
    inscrit.id !== undefined &&
    this.presences[inscrit.id] && // cochée
    !this.presencesExistantes.some(p => p.inscrit.id === inscrit.id) // déjà existante ?
  ) {
    const presence: Presence = {
      inscrit: inscrit,
      datePresence: new Date(this.selectedDate),
      estPresent: true
    };
    presenceObservables.push(this.presenceService.enregistrerPresence(presence));
  }
});


    if (presenceObservables.length === 0) {
      this.errorMessage = 'Aucun participant avec un ID valide.';
      return;
    }

    Promise.all(
      presenceObservables.map(obs => obs.toPromise())
    ).then(() => {
      this.successMessage = 'Présences enregistrées avec succès !';
      this.errorMessage = '';
      this.inscrits.forEach(inscrit => {
        if (inscrit.id !== undefined) {
          this.presences[inscrit.id] = false;
        }
      });
    }).catch(err => {
      this.errorMessage = 'Erreur lors de l\'enregistrement des présences.';
      console.error(err);
    });
  }
}
