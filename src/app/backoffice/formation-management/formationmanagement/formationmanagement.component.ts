import { Component, OnInit } from '@angular/core';
import { Formation } from '../../models/Formation';
import { ActualitemanagmentService } from '../../service/actualitemanagment.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { DeleteConfirmationFormationComponent } from '../delete-confirmation-formation/delete-confirmation-formation.component';

@Component({
  selector: 'app-formationmanagement',
  templateUrl: './formationmanagement.component.html',
  styleUrls: ['./formationmanagement.component.scss']
})
export class FormationmanagementComponent implements OnInit {
  formations: Formation[] = [];
  filteredFormations: Formation[] = [];
  ref!: DynamicDialogRef;

  // filtres
  searchNom: string = '';
  searchDateDebut: string = '';
  searchDateFin: string = '';

  constructor(
    private formationService: ActualitemanagmentService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loadFormations();
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

 

  showFormationDetails(formation: Formation): void {
    this.router.navigate(['/back-office/formation-detail', formation.id]);
  }
  


  // Suppression
  deleteFormation(f: Formation): void {
    this.ref = this.dialogService.open(DeleteConfirmationFormationComponent, {
      header: 'Confirmer la suppression',
      width: '30vw',
      closable: false,
      data: {
        message: `Êtes-vous sûr de vouloir supprimer "${f.formationNom}" ?`,
        id: f.id
      }
    });
    this.ref.onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.formationService.deleteFormation(f.id).subscribe(() => this.loadFormations());
      }
    });
  }

  // URL image getting picture showurl
  getImageUrl(imagePath: string): string {
    return 'http://localhost:8085/api/micro-formation/get-file/' 
           + imagePath.replace('/downloadFile/', '');
  }
// Routing without modal
  addFormation(): void {
      this.router.navigate(['/back-office/addeditformation']);
    }
  
    editFormation(formation: Formation): void {
      this.router.navigate(['/back-office/addeditformation', formation.id]);
    }
}
