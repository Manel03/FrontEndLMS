import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import html2canvas from 'html2canvas';
import * as ExcelJS from 'exceljs';

import * as FileSaver from 'file-saver';
import * as html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';



@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss']
})

export class kpiComponent {
  completionRate = 82;
  averageDuration = '45 min';
  activeTime = '3h 20min';
  averageScore = 88;
  totalCourses = 12;

  selectedDepartment = '';
  selectedManager = '';
  startDate: string = '';
  endDate: string = '';
  departments = ['RH', 'Technique', 'Commercial'];
  managers = ['Mme Yassine', 'M. Ali'];


  completionChart: EChartsOption = {
    title: { text: 'Taux de complétion moyen', left: 'center' },
    xAxis: { type: 'category' as const, data: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai'] },
    yAxis: { type: 'value' as const },
    series: [{
      data: [70, 75, 80, 85, 82],
      type: 'line' as const,
      smooth: true
    }]
  };

  participationChart: EChartsOption = {
    title: { text: 'Participation par département', left: 'center' },
    tooltip: {},
    xAxis: { type: 'category' as const, data: ['RH', 'Technique', 'Commercial'] },
    yAxis: { type: 'value' as const },
    series: [{
      data: [12, 19, 8],
      type: 'bar' as const
    }]
  };

  satisfactionChart: EChartsOption = {
    title: { text: 'Taux de satisfaction', left: 'center' },
    tooltip: { trigger: 'item' as const },
    series: [{
      type: 'pie' as const,
      radius: '50%',
      data: [
        { value: 1048, name: 'Très Satisfait' },
        { value: 735, name: 'Satisfait' },
        { value: 580, name: 'Peu satisfait' },
        { value: 484, name: 'Insatisfait' }
      ]
    }]
  };

  applyFilters() {
    console.log('Filtres appliqués');
  }

  resetFilters() {
    this.selectedDepartment = '';
    this.selectedManager = '';
    this.startDate = '';
    this.endDate = '';
  }
 myData = [
    { TauxCompletion: '82%', DureeMoyenne: '45 min', TempsActif: '3h20', ScoreMoyen: '88/100', Formations: 12 },
    { TauxCompletion: '75%', DureeMoyenne: '38 min', TempsActif: '2h50', ScoreMoyen: '80/100', Formations: 10 }
  ];
async exportToExcelWithCharts() {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('KPI Formation');

  // 1. Ajout de l'entête
  sheet.addRow([
    'Taux de complétion',
    'Durée moyenne',
    'Temps actif',
    'Score moyen',
    'Formations suivies'
  ]);
  sheet.addRow([
    `${this.completionRate}%`,
    this.averageDuration,
    this.activeTime,
    `${this.averageScore}/100`,
    this.totalCourses
  ]);

  // 2. Identifiants des divs de graphiques
  const chartIds = ['completionChart', 'satisfactionChart']; // Ajoute les bons IDs HTML ici
  let imageIndex = 0;

  for (let chartId of chartIds) {
    const chartEl = document.getElementById(chartId);
    if (!chartEl) continue;

    // Pause pour que le DOM soit bien prêt
    await new Promise(resolve => setTimeout(resolve, 300));

    const canvas = await html2canvas(chartEl);
    const imgData = canvas.toDataURL('image/png');

  const imageId = workbook.addImage({
  base64: imgData,
  extension: 'png'
});


    // 3. Calcul de la position
    const startRow = 4 + imageIndex * 20; // Décalage entre les images
    const endRow = startRow + 14;

    // Fusionner cellules pour avoir l'espace image
    sheet.mergeCells(`A${startRow}:F${endRow}`);

    // Insertion image
    sheet.addImage(imageId, {
      tl: { col: 0, row: startRow },
      ext: { width: 600, height: 300 }
    });

    imageIndex++;
  }

  // 4. Génération et téléchargement
  const buffer = await workbook.xlsx.writeBuffer();
  FileSaver.saveAs(new Blob([buffer]), 'dashboard_kpi.xlsx');
}
 selectedRole: 'collaborateur' | 'manager' | 'rh' = 'collaborateur';

selectRole(role: 'collaborateur' | 'manager' | 'rh') {
  this.selectedRole = role;
}

  exportToPDF(): void {
  const element = document.getElementById('pdfContent');
  if (!element) return;

  const opt = {
    margin:       0,
    filename:     'dashboard_kpi.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  (html2pdf as any)().set(opt).from(element).save();
}



  // Export to Excel function
 exportToExcel(): void {
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.myData);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'KPI');
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'KPI.xlsx');
}
exportExcelFromJson() {
  const myData = [
    {
      TauxCompletion: `${this.completionRate}%`,
      DureeMoyenne: this.averageDuration,
      TempsActif: this.activeTime,
      ScoreMoyen: `${this.averageScore}/100`,
      Formations: this.totalCourses
    }
  ];

  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(myData);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'KPI');
  XLSX.writeFile(wb, 'kpi.xlsx');
}
exportExcel() {
    const data = [
      {
        'Taux de Complétion': `${this.completionRate}%`,
        'Durée Moyenne': this.averageDuration,
        'Temps Actif': this.activeTime,
        'Score Moyen': `${this.averageScore}/100`,
        'Nombre de Formations': this.totalCourses
      }
    ];

    // Convertir en worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Nouveau classeur
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'KPI');

    // Sauvegarde
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'KPI.xlsx');
  }

}