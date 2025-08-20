import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActualitemanagmentService } from '../service/actualitemanagment.service';
import { Formation } from '../models/Formation';
import { InscriptionService } from '../service/inscription.service';
import { InscritFormationUser } from '../models/InscritFormationUser';
import { User } from '../models/User';
import { UserManagementService } from '../service/user-management.service';
import { AffectationDialogComponent } from '../affectation-dialog/affectation-dialog.component';

@Component({
  selector: 'app-effectuerformation',
  templateUrl: './effectuerformation.component.html',
  styleUrls: ['./effectuerformation.component.scss']
})
export class EffectuerformationComponent {
  formations: Formation[] = [];
  filteredFormations: Formation[] = [];
  users: User[] = [];
  ref!: DynamicDialogRef;

  // filtres
  searchNom: string = '';
  searchDateDebut: string = '';
  searchDateFin: string = '';

  constructor(
    private formationService: ActualitemanagmentService,
    private router: Router,
    private dialogService: DialogService,
    private inscriptionService: InscriptionService,
    private userService: UserManagementService
  ) {}

  ngOnInit(): void {
    this.loadFormations();
    this.loadUsers();
  }

   loadUsers(): void {
  this.userService.getAllUsers().subscribe(data => {
    this.users = data;
  });
}
  loadFormations(): void {
    this.formationService.getAllFormations().subscribe(data => {
      this.formations = data;
      this.filteredFormations = [...data];
    });
  }

  // Recherche
  filterFormations(): void {
    this.filteredFormations = this.formations.filter(f => {
      const nomMatch = this.searchNom
        ? f.formationNom.toLowerCase().includes(this.searchNom.toLowerCase())
        : true;
      const debutMatch = this.searchDateDebut
        ? new Date(f.dateDebut).toISOString().slice(0, 10) === this.searchDateDebut
        : true;
      const finMatch = this.searchDateFin
        ? new Date(f.dateFin).toISOString().slice(0, 10) === this.searchDateFin
        : true;
      return nomMatch && debutMatch && finMatch;
    });
  }

  // Réinitialisation
  resetFilters(): void {
    this.searchNom = '';
    this.searchDateDebut = '';
    this.searchDateFin = '';
    this.filteredFormations = [...this.formations];
  }

 

  openAffectationDialog(formation: Formation) {
  this.ref = this.dialogService.open(AffectationDialogComponent, {
    header: 'Affectation',
    width: '400px',
    style: { height: '430px' },
    data: {
      users: this.users
    }
  });

 this.ref.onClose.subscribe((selectedUsers: User[]) => {
  if (selectedUsers && selectedUsers.length) {
    selectedUsers.forEach(user => {
      const inscription: InscritFormationUser = {
        dateInscription: new Date(),
        formation: formation,
        etat: 'APPROUVEE',
        userId: user.id,
        validateurId: '',
        nextValidateurId: '',
        validateurs: [],
        isValideRh: true,
        isValideManager: true,
        motif: '',
        isValidAvecCertif: false
      };

      this.inscriptionService.inscrireDirectementParRH(inscription).subscribe({
        next: () => console.log(`Inscription réussie pour ${user.firstName}`),
        error: (err) => alert("Erreur : " + err.error.message)
      });
    });
    alert("Affectation réussie !");
  }
});

}




  

  // URL image getting picture showurl
  getImageUrl(imagePath: string): string {
    return 'http://localhost:8085/api/micro-formation/get-file/' 
           + imagePath.replace('/downloadFile/', '');
  }

}
