import { Component, OnInit } from '@angular/core';
import { Formation } from 'src/app/backoffice/models/Formation';
import { ActualitemanagmentService } from 'src/app/backoffice/service/actualitemanagment.service';
import { ShowactualitedetailofficeComponent } from '../showactualitedetailoffice/showactualitedetailoffice.component';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.scss']
})
export class ActualiteComponent implements OnInit {
  formations: Formation[] = [];
  filteredFormations: Formation[] = [];  // Formations filtrées
  searchTermNom: string = '';
  searchTermDateDebut: string = '';
  searchTermDateFin: string = '';
  currentPage = 1;
  itemsPerPage = 8;
  currentIndex: number = 0;

  constructor(private actualiteService: ActualitemanagmentService) {}

  ngOnInit(): void {
    this.actualiteService.getAllFormations().subscribe({
      next: (data) => {
        const today = new Date();
        this.formations = data.filter(f => new Date(f.dateFin) >= today);
        this.filteredFormations = [...this.formations]; // copie pour les filtres
      },
      error: (err) => console.error('Erreur lors du chargement des formations', err)
    });
  }
  
  
  filterFormations(): void {
    this.currentPage = 1;
this.currentIndex = 0;

    this.filteredFormations = this.formations.filter(formation => {
      const matchesNom = formation.formationNom.toLowerCase().includes(this.searchTermNom.toLowerCase());
      const matchesDateDebut = this.searchTermDateDebut ? new Date(formation.dateDebut).toISOString().substring(0, 10) === this.searchTermDateDebut : true;
      const matchesDateFin = this.searchTermDateFin ? new Date(formation.dateFin).toISOString().substring(0, 10) === this.searchTermDateFin : true;

      return matchesNom && matchesDateDebut && matchesDateFin;
    });
  }

  showFormationDetails(formation: Formation, modal: ShowactualitedetailofficeComponent): void {
    modal.formation = formation;
    modal.openModal();
  }

  get paginatedFormations() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredFormations.slice(start, end);
  }
  
  get totalPages() {
    return Math.ceil(this.filteredFormations.length / this.itemsPerPage);
  }
  
 changePage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.currentIndex = 0;
  }
}


  get currentFormation() {
  return this.paginatedFormations[this.currentIndex];
}

  goToNextFormation() {
    if (this.currentIndex < this.paginatedFormations.length - 1) {
      this.currentIndex++;
    }
  }

prevFormation() {
  if (this.currentIndex > 0) {
    this.currentIndex--;
  }
}


get previousFormation() {
  return this.currentIndex > 0 ? this.paginatedFormations[this.currentIndex - 1] : null;
}

get nextFormation() {
  return this.currentIndex < this.paginatedFormations.length - 1 ? this.paginatedFormations[this.currentIndex + 1] : null;
}

}