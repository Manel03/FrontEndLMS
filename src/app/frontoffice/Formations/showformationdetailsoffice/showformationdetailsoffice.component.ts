import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Formation } from 'src/app/backoffice/models/Formation';
import { User, UserDetails } from 'src/app/backoffice/models/User';
import { ActualitemanagmentService } from 'src/app/backoffice/service/actualitemanagment.service';
import { UserManagementService } from 'src/app/backoffice/service/user-management.service';
import { KeycloakService } from 'src/app/services/keycloak/keycloack.service';
import { DialogSuccessComponent } from '../../dialog-success/dialog-success.component';

@Component({
  selector: 'app-showformationdetailsoffice',
  templateUrl: './showformationdetailsoffice.component.html',
  styleUrls: ['./showformationdetailsoffice.component.scss']
})
export class ShowformationdetailsofficeComponent {
 formation!: Formation;
 formationsSimilaires: Formation[] = [];


  constructor(
    private route: ActivatedRoute,
    private formationService: ActualitemanagmentService,
    private keycloakService: KeycloakService,
    private router: Router,
    private dialog: MatDialog,
    private userManagementService: UserManagementService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.formationService.getFormationById(id).subscribe(data => {
      this.formation = data;
  
      // Après avoir récupéré la formation, on récupère toutes les autres
      this.formationService.getAllFormations().subscribe(allFormations => {
        this.formationsSimilaires = allFormations.filter(f =>
          f.categorie === this.formation.categorie && f.id !== this.formation.id
        );
      });
    });
  }

  getImageUrl(imagePath: string): string {
    return 'http://localhost:8085/api/micro-formation/get-file/' + imagePath.replace('/downloadFile/', '');
  }

  inscription() {
    const user = this.keycloakService.profile;
    if (user?.id) {
      this.userManagementService.getMangersByUser(user.id).subscribe({
        next: (res: UserDetails[]) => {
          console.log('res ====> '+res);
          if (res && res.length > 0) {
            const inscription = {
              formation: this.formation,
              userId: user.id,
              validateurId: res[0].userUuid
            };
  
            this.formationService.createInscription(inscription).subscribe({
              next: () => {
                this.openSuccessDialog(); // Succès
              },
              error: (err) => {
                console.error('Erreur lors de l’inscription :', err);
                console.log('Message d’erreur retourné :', err?.error?.message); // 🟡 Affiche le vrai message d’erreur
  
                // Vérifie si le message contient une indication de doublon
                if (err?.error?.message?.includes('déjà fait une demande')) {
                  this.dialog.open(DialogSuccessComponent, {
                    width: '350px',
                    data: { message: 'Vous avez déjà demandé cette formation.' }
                  });
                } else {
                  // Si autre erreur, tu peux afficher un autre message générique si tu veux
                  this.dialog.open(DialogSuccessComponent, {
                    width: '350px',
                    data: { message: 'Vous avez déjà demandé cette formation.' }
                  });
                }
              }
            });
          } else {
            console.log('Aucun manager trouvé.');
          }
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des managers:', err);
        }
      });
    }
  }
  
  
  showFormationDetails(formation: Formation): void {
    this.router.navigate(['/front-office/formation-detail', formation.id]);
  }

  logNavigation(id: number) {
    console.log('Attempting to navigate to formation ID:', id);
    this.router.navigate(['/front-office/formation-detail', id]).then(nav => {
      console.log('Navigation success:', nav);
    }, err => {
      console.error('Navigation failed:', err);
    });
  }

  openSuccessDialog(): void {
    this.dialog.open(DialogSuccessComponent, {
      width: '350px',
      data: { message: 'Inscription effectuée avec succès !' }
    });
  }
}
