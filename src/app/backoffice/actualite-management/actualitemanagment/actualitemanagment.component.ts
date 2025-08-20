import { Component, OnInit } from '@angular/core';
import { ActualitemanagmentService } from '../../service/actualitemanagment.service';
import { Formation } from '../../models/Formation';
import { Router } from '@angular/router';
import { AddeditActualiteComponent } from '../addedit-actualite/addedit-actualite.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ShowactualitedetailComponent } from '../showactualitedetail/showactualitedetail.component';
import { DeleteConfirmationactualiteComponent } from '../delete-confirmationactualite/delete-confirmationactualite.component';

@Component({
  selector: 'app-actualitemanagment',
  templateUrl: './actualitemanagment.component.html',
  styleUrls: ['./actualitemanagment.component.scss'],
 
})
export class ActualitemanagmentComponent implements OnInit {
  actualites: Formation[] = [];
   ref!: DynamicDialogRef;
   searchNom: string = '';
searchDateDebut: string = '';
searchDateFin: string = '';
filteredActualites: Formation[] = []


  constructor(
    private actualiteService: ActualitemanagmentService,
    private router: Router,
    
    private dialogService: DialogService // Injecter DialogService
  ) {}

  ngOnInit(): void {
    this.loadActualites();
  }

  loadActualites(): void {
    this.actualiteService.getAllFormations().subscribe((data) => {
      this.actualites = data;
      this.filteredActualites = [...data];
    });
  }


openAddModal(): void {
  this.ref = this.dialogService.open(AddeditActualiteComponent, {
    header: 'Ajouter une actualité',
    width: '40vw',
    height: '130vh',
    closable: true
  });

  // Optionnel : gérer la fermeture avec un retour
  this.ref.onClose.subscribe(() => {
    this.loadActualites(); // Recharge les actualités après fermeture
  });
}
openEditModal(actu: Formation): void {
  this.ref = this.dialogService.open(AddeditActualiteComponent, {
    header: 'Modifier une actualité',
    width: '40vw',
    height: '130vh',
    closable: true,
    data: actu, // Passing the selected formation directly here
  });
  

  this.ref.onClose.subscribe(() => {
    this.loadActualites(); // Recharge les actualités après fermeture
  });
}

  
  
showFormationDetails(formation: Formation, modal: ShowactualitedetailComponent): void {
  modal.formation = formation;
  modal.openModal();
}


  addActualite(): void {
    this.router.navigate(['/back-office/addeditactualite']);
  }

  deleteActualite(actu: Formation): void {
    this.ref = this.dialogService.open(DeleteConfirmationactualiteComponent, {
      header: 'Confirmer la suppression',
      width: '30vw',
      closable: false,
      data: {
        message: `Êtes-vous sûr de vouloir supprimer "${actu.formationNom}" ?`,
        id: actu.id  // Remplace "id" par "idAct" ici
      }
    });
    
      
   
  
    this.ref.onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.actualiteService.deleteFormation(actu.id).subscribe(() => {
          this.loadActualites(); // Recharge la liste après suppression
        });
      }
    });
  }


  filterActualites(): void {
    this.filteredActualites = this.actualites.filter(actu => {
      const nomMatch = this.searchNom ? actu.formationNom.toLowerCase().includes(this.searchNom.toLowerCase()) : true;
  
      const debutMatch = this.searchDateDebut
        ? new Date(actu.dateDebut).toISOString().slice(0, 10) === this.searchDateDebut
        : true;
  
      const finMatch = this.searchDateFin
        ? new Date(actu.dateFin).toISOString().slice(0, 10) === this.searchDateFin
        : true;
  
      return nomMatch && debutMatch && finMatch;
    });
  }
  
  resetFilters(): void {
    this.searchNom = '';
    this.searchDateDebut = '';
    this.searchDateFin = '';
    this.filteredActualites = [...this.actualites];
  }
  getImageUrl(imagePath: string): string {
    return 'http://localhost:8085/api/micro-formation/get-file/' + imagePath.replace('/downloadFile/', '');
  }
  
  
}