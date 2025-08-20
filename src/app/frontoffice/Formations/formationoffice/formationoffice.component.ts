import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formation } from 'src/app/backoffice/models/Formation';
import { ActualitemanagmentService } from 'src/app/backoffice/service/actualitemanagment.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-formationoffice',
  templateUrl: './formationoffice.component.html',
  styleUrls: ['./formationoffice.component.scss']
})
export class FormationofficeComponent implements OnInit{
 formations: Formation[] = [];
  filteredFormations: Formation[] = [];
  searchTermReference: string = '';  
  allFormations: Formation[] = []; 
  


  uniqueCategories: string[] = [];
  uniqueTypes: string[] = [];

  selectedCategories: string[] = [];
  selectedTypes: string[]= [];

  searchTermNom: string = '';
  searchTermDateDebut: string = '';
  searchTermDateFin: string = '';
  logoDataUrl: string = '';

  currentPage = 1;
  itemsPerPage =3;

  constructor(private actualiteService: ActualitemanagmentService, private router: Router) {}

  
  ngOnInit(): void {
    this.actualiteService.getAllFormations().subscribe({
      next: (data) => {
        this.formations = data;
        this.loadLogo(); // 🔁 pour charger le logo en base64

        this.allFormations = data; // 🔧 nécessaire pour la sidebar
        this.filteredFormations = data;
       this.uniqueCategories = [...new Set(data.map(f => f.categorie).filter(Boolean))];
    this.uniqueTypes = [...new Set(data.map(f => f.type).filter(Boolean))];
  


      },
      error: (err) => console.error('Erreur lors du chargement des formations', err)
    });
  }
  

  filterFormations(): void {
    this.filteredFormations = this.formations.filter(formation => {
      const matchesNom = formation.formationNom.toLowerCase().includes(this.searchTermNom.toLowerCase());
      const matchesDateDebut = this.searchTermDateDebut 
        ? new Date(formation.dateDebut).toISOString().substring(0, 10) === this.searchTermDateDebut 
        : true;
      const matchesDateFin = this.searchTermDateFin 
        ? new Date(formation.dateFin).toISOString().substring(0, 10) === this.searchTermDateFin 
        : true;
      const matchesReference = this.searchTermReference 
        ? formation.reference.toLowerCase().includes(this.searchTermReference.toLowerCase()) 
        : true;  
  
      return matchesNom && matchesDateDebut && matchesDateFin && matchesReference;  
    });
  }
  
  

  showFormationDetails(formation: Formation): void {
      this.router.navigate(['/front-office/formation-detail', formation.id]);
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
    }
  }

  onCategoryChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedCategories.push(value);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== value);
    }
  }
  
  onTypeChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedTypes.push(value);
    } else {
      this.selectedTypes = this.selectedTypes.filter(t => t !== value);
    }
  }
  
  applyFilters() {
    this.formations = this.allFormations.filter(f =>
      (this.selectedCategories.length === 0 || this.selectedCategories.includes(f.categorie)) &&
      (this.selectedTypes.length === 0 || this.selectedTypes.includes(f.type))
    );
    this.filteredFormations = this.formations; // 🔄 important pour l'affichage
  }
  
  
  resetFilters() {
    this.selectedCategories = [];
    this.selectedTypes = [];
  
    const inputs = document.querySelectorAll('.sidebar input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    inputs.forEach(input => input.checked = false);
  
    this.formations = [...this.allFormations];
    this.filteredFormations = [...this.allFormations]; // 🔄 reset visuel
  }
  
  
    exportToPDF(): void {
    const doc = new jsPDF();

    // En-tête
    this.addPdfHeader(doc, 'Catalogue des Formations');

    let y = 30;

    const groupedByCategorie = this.groupBy(this.allFormations, 'categorie');

    for (const categorie in groupedByCategorie) {
      if (y > 250) {
        doc.addPage();
        this.addPdfHeader(doc, 'Catalogue des Formations (suite)');
        y = 30;
      }

      doc.setFontSize(14);
      doc.setTextColor('#000000');
      doc.text(`Catégorie : ${categorie}`, 14, y);
      y += 8;

      const formationsByType = this.groupBy(groupedByCategorie[categorie], 'type');

      for (const type in formationsByType) {
        if (y > 250) {
          doc.addPage();
          this.addPdfHeader(doc, 'Catalogue des Formations (suite)');
          y = 30;
        }

        doc.setFontSize(12);
        doc.setTextColor('#4CAF50');
        doc.text(`Type : ${type}`, 18, y);
        y += 6;

        const rows = formationsByType[type].map((f: Formation) => [
          f.formationNom,
          f.reference,
          f.description
        ]);

        // Récupération du résultat pour connaître la position finale
       const tableResult = autoTable(doc, {
  startY: y,
  head: [['Nom', 'Référence', 'Description']],
  body: rows,
  headStyles: {
    fillColor: '#000000',
    textColor: '#FFFFFF',
    halign: 'center'
  },
  bodyStyles: {
    textColor: '#000000',
    fontSize: 10
  },
  styles: {
    cellPadding: 3,
    lineColor: '#4CAF50',
    lineWidth: 0.3
  },
  alternateRowStyles: {
    fillColor: '#F0FFF0'
  },
  columnStyles: {
    0: { cellWidth: 40 }, // Nom
    1: { cellWidth: 30 }, // Référence
    2: { cellWidth: 100 } // Description étendue ✨
  },
  margin: { left: 18, right: 18 },
  didDrawPage: (data) => {
    if (data.cursor) {
      y = data.cursor.y + 10; // met à jour y après le tableau
    }
  }
});

      }
    }

    doc.save('catalogue_formations.pdf');
  }

  private addPdfHeader(doc: jsPDF, title: string): void {
    doc.setFillColor('#000000');
    doc.rect(0, 0, 210, 20, 'F');
    doc.setFontSize(16);
    doc.setTextColor('#FFFFFF');
    doc.text(title, 105, 12, { align: 'center' });

    if (this.logoDataUrl) {
    doc.addImage(this.logoDataUrl, 'PNG', 10, 3, 40, 14); // x=10, y=3, largeur=14, hauteur=14
  }
  }

  private groupBy(array: any[], key: string): { [key: string]: any[] } {
    return array.reduce((result, currentValue) => {
      const groupKey = currentValue[key] || 'Non défini';
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(currentValue);
      return result;
    }, {});
  }


  loadLogo(): void {
  const img = new Image();
  img.src = 'assets/images/logos/actialogo.png'; // 🖼️ mets ici le bon chemin vers ton logo
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0);
      this.logoDataUrl = canvas.toDataURL('image/png');

    }
  };
}

}


