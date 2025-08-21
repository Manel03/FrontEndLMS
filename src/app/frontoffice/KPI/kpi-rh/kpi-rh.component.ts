
import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { saveAs } from 'file-saver';
import { ExportPdfService } from 'src/app/services/export-pdf.service';
import html2canvas from 'html2canvas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxEchartsDirective, NgxEchartsModule, provideEcharts } from 'ngx-echarts';


interface RhKPI {
  id: string;
  label: string;
  value: number;
  target: number;
  unit: string;
  icon: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  description: string;
  category: string;
}

interface DepartmentData {
  name: string;
  completionRate: number;
  avgScore: number;
  participation: number;
  retention: number;
  internalTrainings: number;
  satisfactionRate: number;
  totalHours: number;
  averageDuration: number;
}

interface AlertCollaborator {
  id: string;
  name: string;
  department: string;
  status: 'inactive' | 'at-risk' | 'non-compliant';
  lastActivity: Date;
  completionRate: number;
  timeSpent: number;
  achievementScore: number;
  riskLevel: 'low' | 'medium' | 'high';
}

interface TrainingEvaluation {
  type: 'test' | 'kpi' | 'deliverable' | 'survey';
  name: string;
  completionRate: number;
  averageScore: number;
  participantCount: number;
}

interface QuizType {
  type: 'true-false' | 'mcq' | 'open-question' | 'drag-drop' | 'fill-blank' | 'matching';
  name: string;
  count: number;
  averageScore: number;
}

@Component({
  selector: 'app-kpi-rh',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxEchartsDirective, 
  ],
  providers: [
    provideEcharts(),
  ],
  templateUrl: './kpi-rh.component.html',
  styleUrls: ['./kpi-rh.component.scss'],
})
export class KpiRhComponent implements OnInit {
  constructor(private pdfService: ExportPdfService) {}
  // View mode controls
  viewMode: 'cards' | 'table' | 'summary' = 'cards';
  
  // Filters
  selectedDepartment = '';
  selectedTimeframe = '30';
  selectedCategory = '';
  selectedRiskLevel = '';
  
  // Chart configurations
  globalCompletionChart: EChartsOption = {};
  departmentComparisonChart: EChartsOption = {};
  progressTrendChart: EChartsOption = {};
  participationFrequencyChart: EChartsOption = {};
  topThemesChart: EChartsOption = {};
  retentionChart: EChartsOption = {};
  geographicChart: EChartsOption = {};
  satisfactionChart: EChartsOption = {};
  evaluationChart: EChartsOption = {};
  quizTypesChart: EChartsOption = {};
  riskAnalysisChart: EChartsOption = {};
  complianceChart: EChartsOption = {};

  // Enhanced RH KPIs data
  rhKPIs: RhKPI[] = [
    {
      id: 'global-completion',
      label: 'Taux de Complétion Global',
      value: 78,
      target: 85,
      unit: '%',
      icon: '📊',
      trend: 'up',
      trendValue: 5.2,
      description: 'Pourcentage global de formations terminées',
      category: 'performance'
    },
    {
      id: 'global-progression',
      label: 'Progression Globale',
      value: 82,
      target: 80,
      unit: '%',
      icon: '📈',
      trend: 'up',
      trendValue: 3.8,
      description: 'Évolution moyenne des collaborateurs',
      category: 'performance'
    },
    {
      id: 'avg-evaluation-score',
      label: 'Score Moyen Évaluations',
      value: 84,
      target: 85,
      unit: '/100',
      icon: '🎯',
      trend: 'down',
      trendValue: -1.2,
      description: 'Note moyenne aux évaluations',
      category: 'quality'
    },
    {
      id: 'monthly-participation',
      label: 'Participation Mensuelle',
      value: 156,
      target: 150,
      unit: '',
      icon: '👥',
      trend: 'up',
      trendValue: 8.5,
      description: 'Nombre de participants par mois',
      category: 'engagement'
    },
    {
      id: 'retention-rate',
      label: 'Taux de Rétention',
      value: 91,
      target: 90,
      unit: '%',
      icon: '🔄',
      trend: 'up',
      trendValue: 2.1,
      description: 'Maintien dans le parcours formation',
      category: 'engagement'
    },
    {
      id: 'at-risk-collaborators',
      label: 'Collaborateurs à Risque',
      value: 12,
      target: 5,
      unit: '',
      icon: '⚠️',
      trend: 'down',
      trendValue: -15.3,
      description: 'Collaborateurs inactifs ou en difficulté',
      category: 'risk'
    },
    {
      id: 'internal-trainings',
      label: 'Formations Internes',
      value: 45,
      target: 40,
      unit: '',
      icon: '🏢',
      trend: 'up',
      trendValue: 12.5,
      description: 'Nombre de formations internes dispensées',
      category: 'capacity'
    },
    {
      id: 'satisfaction-rate',
      label: 'Taux de Satisfaction',
      value: 87,
      target: 85,
      unit: '%',
      icon: '😊',
      trend: 'up',
      trendValue: 4.3,
      description: 'Satisfaction des apprenants',
      category: 'quality'
    },
    {
      id: 'compliance-rate',
      label: 'Taux de Conformité',
      value: 92,
      target: 95,
      unit: '%',
      icon: '✅',
      trend: 'stable',
      trendValue: 0.5,
      description: 'Conformité aux standards de formation',
      category: 'compliance'
    }
  ];

  // Enhanced Department data
  departmentData: DepartmentData[] = [
    { 
      name: 'RH', 
      completionRate: 85, 
      avgScore: 88, 
      participation: 95, 
      retention: 92,
      internalTrainings: 12,
      satisfactionRate: 89,
      totalHours: 240,
      averageDuration: 2.5
    },
    { 
      name: 'Tech', 
      completionRate: 82, 
      avgScore: 86, 
      participation: 78, 
      retention: 89,
      internalTrainings: 18,
      satisfactionRate: 85,
      totalHours: 320,
      averageDuration: 3.2
    },
    { 
      name: 'Commerce', 
      completionRate: 70, 
      avgScore: 82, 
      participation: 85, 
      retention: 88,
      internalTrainings: 8,
      satisfactionRate: 83,
      totalHours: 180,
      averageDuration: 2.1
    },
    { 
      name: 'Admin', 
      completionRate: 65, 
      avgScore: 80, 
      participation: 72, 
      retention: 85,
      internalTrainings: 6,
      satisfactionRate: 78,
      totalHours: 120,
      averageDuration: 1.8
    },
    { 
      name: 'Finance', 
      completionRate: 88, 
      avgScore: 90, 
      participation: 88, 
      retention: 94,
      internalTrainings: 10,
      satisfactionRate: 91,
      totalHours: 200,
      averageDuration: 2.8
    }
  ];

  // Enhanced Alert collaborators
  alertCollaborators: AlertCollaborator[] = [
    {
      id: '1',
      name: 'Jean Dupont',
      department: 'Commerce',
      status: 'inactive',
      lastActivity: new Date('2024-01-10'),
      completionRate: 45,
      timeSpent: 12,
      achievementScore: 62,
      riskLevel: 'high'
    },
    {
      id: '2',
      name: 'Marie Martin',
      department: 'Admin',
      status: 'at-risk',
      lastActivity: new Date('2024-01-15'),
      completionRate: 38,
      timeSpent: 8,
      achievementScore: 55,
      riskLevel: 'high'
    },
    {
      id: '3',
      name: 'Pierre Durand',
      department: 'Tech',
      status: 'inactive',
      lastActivity: new Date('2024-01-08'),
      completionRate: 52,
      timeSpent: 15,
      achievementScore: 68,
      riskLevel: 'medium'
    },
    {
      id: '4',
      name: 'Sophie Leblanc',
      department: 'Finance',
      status: 'non-compliant',
      lastActivity: new Date('2024-01-20'),
      completionRate: 28,
      timeSpent: 5,
      achievementScore: 42,
      riskLevel: 'high'
    }
  ];

  // Training evaluations data
  trainingEvaluations: TrainingEvaluation[] = [
    { type: 'test', name: 'Tests de Compétences', completionRate: 78, averageScore: 84, participantCount: 156 },
    { type: 'kpi', name: 'Évaluations KPI', completionRate: 92, averageScore: 88, participantCount: 143 },
    { type: 'deliverable', name: 'Livrables Projet', completionRate: 65, averageScore: 82, participantCount: 98 },
    { type: 'survey', name: 'Enquêtes Satisfaction', completionRate: 89, averageScore: 87, participantCount: 178 }
  ];

  // Quiz types data
  quizTypes: QuizType[] = [
    { type: 'true-false', name: 'Vrai/Faux', count: 45, averageScore: 82 },
    { type: 'mcq', name: 'QCM', count: 89, averageScore: 78 },
    { type: 'open-question', name: 'Questions Ouvertes', count: 32, averageScore: 85 },
    { type: 'drag-drop', name: 'Glisser/Déposer', count: 23, averageScore: 76 },
    { type: 'fill-blank', name: 'Texte à Trou', count: 34, averageScore: 80 },
    { type: 'matching', name: 'Correspondance', count: 28, averageScore: 83 }
  ];

  // Filter options
  departments = ['Tous', 'RH', 'Tech', 'Commerce', 'Admin', 'Finance'];
  timeframes = [
    { value: '7', label: '7 derniers jours' },
    { value: '30', label: '30 derniers jours' },
    { value: '90', label: '3 derniers mois' },
    { value: '365', label: 'Année complète' }
  ];
  categories = ['Tous', 'performance', 'quality', 'engagement', 'risk', 'capacity', 'compliance'];
  riskLevels = ['Tous', 'low', 'medium', 'high'];

  activeDepartments: number = this.departmentData.filter(dept => dept.retention >= 75).length;

  ngOnInit(): void {
    this.initializeCharts();
  }

  initializeCharts(): void {
    this.initBasicCharts();
    this.initAdvancedCharts();
  }

  initBasicCharts(): void {
    // Global completion by department
    this.globalCompletionChart = {
      title: {
        text: 'Taux de Complétion par Service',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c}%'
      },
      xAxis: {
        type: 'category',
        data: this.departmentData.map(d => d.name)
      },
      yAxis: {
        type: 'value',
        max: 100,
        axisLabel: { formatter: '{value}%' }
      },
      series: [{
        data: this.departmentData.map(d => d.completionRate),
        type: 'bar',
        itemStyle: {
          color: (params: any) => {
            const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
            return colors[params.dataIndex % colors.length];
          }
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}%'
        }
      }]
    };

    // Department comparison radar
    this.departmentComparisonChart = {
      title: {
        text: 'Comparaison entre Départements',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: {},
      radar: {
        indicator: [
          { name: 'Complétion', max: 100 },
          { name: 'Score Moyen', max: 100 },
          { name: 'Participation', max: 100 },
          { name: 'Rétention', max: 100 },
          { name: 'Satisfaction', max: 100 }
        ]
      },
      series: [{
        type: 'radar',
        data: this.departmentData.slice(0, 3).map((dept, index) => ({
          value: [dept.completionRate, dept.avgScore, dept.participation, dept.retention, dept.satisfactionRate],
          name: dept.name,
          areaStyle: {
            color: `rgba(${index === 0 ? '52, 152, 219' : 
                          index === 1 ? '155, 89, 182' : '231, 76, 60'}, 0.3)`
          }
        }))
      }]
    };

    // Progression trend
    this.progressTrendChart = {
      title: {
        text: 'Progression Globale des Collaborateurs',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun']
      },
      yAxis: { type: 'value', max: 100 },
      series: [{
        data: [72, 75, 78, 80, 82, 84],
        type: 'line',
        smooth: true,
        itemStyle: { color: '#27ae60' },
        areaStyle: { color: 'rgba(39, 174, 96, 0.1)' }
      }]
    };
  }

  initAdvancedCharts(): void {
    // Satisfaction chart
    this.satisfactionChart = {
      title: {
        text: 'Taux de Satisfaction par Département',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: this.departmentData.map(d => d.name)
      },
      yAxis: { type: 'value', max: 100 },
      series: [{
        data: this.departmentData.map(d => d.satisfactionRate),
        type: 'bar',
        itemStyle: { color: '#f39c12' },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}%'
        }
      }]
    };

    // Evaluation types chart
    this.evaluationChart = {
      title: {
        text: 'Types d\'Évaluations - Taux de Complétion',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}% ({d}%)'
      },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        data: this.trainingEvaluations.map((evaluation, index) => ({
          value: evaluation.completionRate,
          name: evaluation.name,
          itemStyle: {
            color: ['#e74c3c', '#3498db', '#2ecc71', '#f39c12'][index]
          }
        }))
      }]
    };

    // Quiz types distribution
    this.quizTypesChart = {
      title: {
        text: 'Distribution des Types de Quiz',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: this.quizTypes.map(q => q.name),
        axisLabel: { rotate: 45 }
      },
      yAxis: [
        { type: 'value', name: 'Nombre', position: 'left' },
        { type: 'value', name: 'Score (%)', position: 'right', max: 100 }
      ],
      series: [
        {
          name: 'Nombre de Quiz',
          data: this.quizTypes.map(q => q.count),
          type: 'bar',
          itemStyle: { color: '#3498db' }
        },
        {
          name: 'Score Moyen',
          data: this.quizTypes.map(q => q.averageScore),
          type: 'line',
          yAxisIndex: 1,
          itemStyle: { color: '#e74c3c' }
        }
      ]
    };

    // Risk analysis chart
    this.riskAnalysisChart = {
      title: {
        text: 'Analyse des Risques par Département',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: this.departments.slice(1)
      },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'Risque Élevé',
          data: [2, 3, 4, 1, 2],
          type: 'bar',
          stack: 'risk',
          itemStyle: { color: '#e74c3c' }
        },
        {
          name: 'Risque Moyen',
          data: [1, 2, 3, 2, 1],
          type: 'bar',
          stack: 'risk',
          itemStyle: { color: '#f39c12' }
        },
        {
          name: 'Risque Faible',
          data: [3, 2, 1, 4, 3],
          type: 'bar',
          stack: 'risk',
          itemStyle: { color: '#2ecc71' }
        }
      ]
    };

    // Compliance trends
    this.complianceChart = {
      title: {
        text: 'Évolution de la Conformité',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun']
      },
      yAxis: { type: 'value', max: 100 },
      series: [{
        data: [88, 90, 89, 91, 92, 92],
        type: 'line',
        smooth: true,
        itemStyle: { color: '#8e44ad' },
        areaStyle: { color: 'rgba(142, 68, 173, 0.1)' },
        markLine: {
          data: [{ type: 'average', name: 'Moyenne' }]
        }
      }]
    };
  }

  // View mode methods
  setViewMode(mode: 'cards' | 'table' | 'summary'): void {
    this.viewMode = mode;
  }

  // Filter methods
  setDepartmentFilter(dept: string): void {
    this.selectedDepartment = dept;
    this.applyFilters();
  }

  setTimeframeFilter(timeframe: string): void {
    this.selectedTimeframe = timeframe;
    this.applyFilters();
  }

  setCategoryFilter(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  setRiskLevelFilter(risk: string): void {
    this.selectedRiskLevel = risk;
    this.applyFilters();
  }

  applyFilters(): void {
    // Logic to filter data based on selected filters
    console.log('Applying filters:', {
      department: this.selectedDepartment,
      timeframe: this.selectedTimeframe,
      category: this.selectedCategory,
      riskLevel: this.selectedRiskLevel
    });
    // Re-initialize charts with filtered data
    this.initializeCharts();
  }

  clearFilters(): void {
    this.selectedDepartment = '';
    this.selectedTimeframe = '30';
    this.selectedCategory = '';
    this.selectedRiskLevel = '';
    this.applyFilters();
  }

  // Utility methods
  getDaysInactive(lastActivity: Date): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastActivity.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getStatusLabel(status: string): string {
    const labels = {
      'inactive': 'Inactif',
      'at-risk': 'À Risque',
      'non-compliant': 'Non Conforme'
    };
    return labels[status as keyof typeof labels] || status;
  }

  getRiskLevelLabel(level: string): string {
    const labels = {
      'low': 'Faible',
      'medium': 'Moyen',
      'high': 'Élevé'
    };
    return labels[level as keyof typeof labels] || level;
  }

  getRiskLevelColor(level: string): string {
    const colors = {
      'low': '#2ecc71',
      'medium': '#f39c12',
      'high': '#e74c3c'
    };
    return colors[level as keyof typeof colors] || '#95a5a6';
  }

  // Action methods
  contactCollaborator(id: string): void {
    console.log(`Contacting collaborator with ID: ${id}`);
    // Implementation for contacting collaborator
  }

  generateRiskReport(): void {
    console.log('Generating risk analysis report...');
    // Implementation for risk report generation
  }

  generateComplianceReport(): void {
    console.log('Generating compliance report...');
    // Implementation for compliance report generation
  }

  exportToExcel(): void {
    console.log('Exporting RH data to Excel...');
    // Implementation for Excel export
  }

  exportToPDF(): void {
    console.log('Exporting RH data to PDF...');
    // Implementation for PDF export
  }

  scheduleAudit(): void {
    console.log('Scheduling audit...');
    // Implementation for audit scheduling
  }

  // Computed properties
  get totalCollaborators(): number {
    return this.departmentData.reduce((sum, dept) => sum + dept.participation, 0);
  }

  get averageCompletionRate(): number {
    return Math.round(
      this.departmentData.reduce((sum, dept) => sum + dept.completionRate, 0) / 
      this.departmentData.length
    );
  }

  get averageTimeBetweenTrainings(): number {
    return 18; // days - could be calculated from real data
  }

  get totalInternalTrainings(): number {
    return this.departmentData.reduce((sum, dept) => sum + dept.internalTrainings, 0);
  }

  get averageSatisfactionRate(): number {
    return Math.round(
      this.departmentData.reduce((sum, dept) => sum + dept.satisfactionRate, 0) / 
      this.departmentData.length
    );
  }

  get totalTrainingHours(): number {
    return this.departmentData.reduce((sum, dept) => sum + dept.totalHours, 0);
  }

  get highRiskCollaborators(): AlertCollaborator[] {
    return this.alertCollaborators.filter(c => c.riskLevel === 'high');
  }

  get filteredKPIs(): RhKPI[] {
    if (!this.selectedCategory || this.selectedCategory === 'Tous') {
      return this.rhKPIs;
    }
    return this.rhKPIs.filter(kpi => kpi.category === this.selectedCategory);
  }

  get filteredAlertCollaborators(): AlertCollaborator[] {
    let filtered = this.alertCollaborators;
    
    if (this.selectedDepartment && this.selectedDepartment !== 'Tous') {
      filtered = filtered.filter(c => c.department === this.selectedDepartment);
    }
    
    if (this.selectedRiskLevel && this.selectedRiskLevel !== 'Tous') {
      filtered = filtered.filter(c => c.riskLevel === this.selectedRiskLevel);
    }
    
    return filtered;
  }
  exportDashboardAsPdf() {
    const dashboardElement = document.getElementById('kpi-dashboard'); // id à mettre dans ton HTML

    if (dashboardElement) {
      html2canvas(dashboardElement).then((canvas) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const formData = new FormData();
            formData.append('image', blob, 'dashboard.png');

            this.pdfService.sendDashboardImage(formData).subscribe((response: Blob) => {
              const file = new Blob([response], { type: 'application/pdf' });
              const fileURL = URL.createObjectURL(file);
              const a = document.createElement('a');
              a.href = fileURL;
              a.download = 'rapport-kpi.pdf';
              a.click();
            });
          }
        });
      });
    }
  }
}
