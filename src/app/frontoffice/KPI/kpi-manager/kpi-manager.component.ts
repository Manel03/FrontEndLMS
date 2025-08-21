
import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

interface ManagerKPI {
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

interface Collaborator {
  id: string;
  name: string;
  email: string;
  department: string;
  team: string;
  position: string;
  avatar: string;
  individualScore: number;
  engagementScore: number;
  trainingTimeSpent: number;
  completionRate: number;
  lastActivity: Date;
  status: 'active' | 'inactive' | 'at-risk';
  mandatoryTrainingsCompleted: number;
  mandatoryTrainingsTotal: number;
  objectivesAchieved: number;
  objectivesTotal: number;
  progressHistory: ProgressPoint[];
  currentTrainings: string[];
  upcomingDeadlines: TrainingDeadline[];
}

interface ProgressPoint {
  date: Date;
  score: number;
  completionRate: number;
}

interface TrainingDeadline {
  trainingName: string;
  dueDate: Date;
  status: 'pending' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
}

interface Team {
  id: string;
  name: string;
  memberCount: number;
  averageScore: number;
  averageEngagement: number;
}

interface Alert {
  id: string;
  type: 'inactivity' | 'missing-training' | 'low-performance' | 'deadline';
  collaboratorId: string;
  collaboratorName: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  date: Date;
  acknowledged: boolean;
}

interface TrainingSuggestion {
  id: string;
  trainingName: string;
  description: string;
  recommendedFor: string[];
  reason: string;
  priority: number;
  estimatedDuration: number;
}

@Component({
  selector: 'app-kpi-manager',
  templateUrl: './kpi-manager.component.html',
  styleUrls: ['./kpi-manager.component.scss']
})
export class KpiManagerComponent implements OnInit {
  // View controls
  viewMode: 'overview' | 'team-details' | 'individual' | 'alerts' | 'suggestions' = 'overview';
  selectedTeam = '';
  selectedCollaborator = '';
  selectedPeriod = '30';
  showAllTeams = false;
  alertsEnabled = true;
  individualScoresVisible = true;
  mandatoryTrainingNotifications = true;
  autoSuggestions = true;

  // Charts
  teamPerformanceChart: EChartsOption = {};
  engagementTrendChart: EChartsOption = {};
  trainingCompletionChart: EChartsOption = {};
  individualComparisonChart: EChartsOption = {};
  progressHistoryChart: EChartsOption = {};
  timeSpentChart: EChartsOption = {};

  // Data
  managerKPIs: ManagerKPI[] = [
    {
      id: 'team-average-score',
      label: 'Score Moyen Équipe',
      value: 86,
      target: 85,
      unit: '/100',
      icon: '👥',
      trend: 'up',
      trendValue: 4.2,
      description: 'Score moyen de performance de l\'équipe',
      category: 'performance'
    },
    {
      id: 'team-engagement',
      label: 'Engagement Moyen',
      value: 78,
      target: 80,
      unit: '%',
      icon: '🎯',
      trend: 'down',
      trendValue: -2.1,
      description: 'Niveau d\'engagement moyen des collaborateurs',
      category: 'engagement'
    },
    {
      id: 'completion-rate',
      label: 'Taux de Complétion',
      value: 92,
      target: 90,
      unit: '%',
      icon: '✅',
      trend: 'up',
      trendValue: 6.3,
      description: 'Pourcentage de formations terminées',
      category: 'completion'
    },
    {
      id: 'mandatory-compliance',
      label: 'Conformité Obligatoire',
      value: 95,
      target: 100,
      unit: '%',
      icon: '📋',
      trend: 'stable',
      trendValue: 0.5,
      description: 'Formations obligatoires complétées',
      category: 'compliance'
    },
    {
      id: 'objectives-achieved',
      label: 'Objectifs Atteints',
      value: 73,
      target: 75,
      unit: '%',
      icon: '🏆',
      trend: 'up',
      trendValue: 3.8,
      description: 'Pourcentage d\'objectifs atteints par l\'équipe',
      category: 'objectives'
    },
    {
      id: 'training-hours',
      label: 'Heures Formation/Mois',
      value: 24,
      target: 20,
      unit: 'h',
      icon: '📚',
      trend: 'up',
      trendValue: 12.5,
      description: 'Temps moyen de formation par collaborateur',
      category: 'time'
    }
  ];

  teams: Team[] = [
    {
      id: 'team-1',
      name: 'Équipe Développement Frontend',
      memberCount: 8,
      averageScore: 88,
      averageEngagement: 82
    },
    {
      id: 'team-2',
      name: 'Équipe Développement Backend',
      memberCount: 6,
      averageScore: 85,
      averageEngagement: 79
    },
    {
      id: 'team-3',
      name: 'Équipe DevOps',
      memberCount: 4,
      averageScore: 91,
      averageEngagement: 85
    },
    {
      id: 'team-4',
      name: 'Équipe QA',
      memberCount: 5,
      averageScore: 83,
      averageEngagement: 76
    }
  ];

  collaborators: Collaborator[] = [
    {
      id: 'collab-1',
      name: 'Marie Dubois',
      email: 'marie.dubois@company.com',
      department: 'IT',
      team: 'team-1',
      position: 'Senior Developer',
      avatar: '👩‍💻',
      individualScore: 92,
      engagementScore: 88,
      trainingTimeSpent: 28,
      completionRate: 95,
      lastActivity: new Date('2024-02-05'),
      status: 'active',
      mandatoryTrainingsCompleted: 4,
      mandatoryTrainingsTotal: 4,
      objectivesAchieved: 6,
      objectivesTotal: 8,
      progressHistory: [
        { date: new Date('2024-01-01'), score: 85, completionRate: 80 },
        { date: new Date('2024-01-15'), score: 88, completionRate: 85 },
        { date: new Date('2024-02-01'), score: 92, completionRate: 95 }
      ],
      currentTrainings: ['Angular Avancé', 'Microservices'],
      upcomingDeadlines: [
        {
          trainingName: 'Sécurité Web',
          dueDate: new Date('2024-02-20'),
          status: 'pending',
          priority: 'high'
        }
      ]
    },
    {
      id: 'collab-2',
      name: 'Pierre Martin',
      email: 'pierre.martin@company.com',
      department: 'IT',
      team: 'team-1',
      position: 'Developer',
      avatar: '👨‍💻',
      individualScore: 78,
      engagementScore: 65,
      trainingTimeSpent: 15,
      completionRate: 70,
      lastActivity: new Date('2024-01-25'),
      status: 'at-risk',
      mandatoryTrainingsCompleted: 2,
      mandatoryTrainingsTotal: 4,
      objectivesAchieved: 3,
      objectivesTotal: 8,
      progressHistory: [
        { date: new Date('2024-01-01'), score: 80, completionRate: 75 },
        { date: new Date('2024-01-15'), score: 78, completionRate: 72 },
        { date: new Date('2024-02-01'), score: 78, completionRate: 70 }
      ],
      currentTrainings: ['JavaScript ES6'],
      upcomingDeadlines: [
        {
          trainingName: 'Formation Obligatoire Sécurité',
          dueDate: new Date('2024-02-10'),
          status: 'overdue',
          priority: 'high'
        }
      ]
    },
    {
      id: 'collab-3',
      name: 'Sophie Lambert',
      email: 'sophie.lambert@company.com',
      department: 'IT',
      team: 'team-2',
      position: 'Backend Developer',
      avatar: '👩‍🔬',
      individualScore: 89,
      engagementScore: 84,
      trainingTimeSpent: 32,
      completionRate: 88,
      lastActivity: new Date('2024-02-06'),
      status: 'active',
      mandatoryTrainingsCompleted: 4,
      mandatoryTrainingsTotal: 4,
      objectivesAchieved: 7,
      objectivesTotal: 8,
      progressHistory: [
        { date: new Date('2024-01-01'), score: 82, completionRate: 78 },
        { date: new Date('2024-01-15'), score: 86, completionRate: 83 },
        { date: new Date('2024-02-01'), score: 89, completionRate: 88 }
      ],
      currentTrainings: ['Architecture Cloud', 'API Design'],
      upcomingDeadlines: []
    },
    {
      id: 'collab-4',
      name: 'Thomas Rousseau',
      email: 'thomas.rousseau@company.com',
      department: 'IT',
      team: 'team-3',
      position: 'DevOps Engineer',
      avatar: '👨‍🔧',
      individualScore: 94,
      engagementScore: 91,
      trainingTimeSpent: 35,
      completionRate: 98,
      lastActivity: new Date('2024-02-06'),
      status: 'active',
      mandatoryTrainingsCompleted: 4,
      mandatoryTrainingsTotal: 4,
      objectivesAchieved: 8,
      objectivesTotal: 8,
      progressHistory: [
        { date: new Date('2024-01-01'), score: 88, completionRate: 90 },
        { date: new Date('2024-01-15'), score: 91, completionRate: 94 },
        { date: new Date('2024-02-01'), score: 94, completionRate: 98 }
      ],
      currentTrainings: ['Kubernetes Advanced', 'Monitoring'],
      upcomingDeadlines: []
    }
  ];

  alerts: Alert[] = [
    {
      id: 'alert-1',
      type: 'inactivity',
      collaboratorId: 'collab-2',
      collaboratorName: 'Pierre Martin',
      message: 'Aucune activité depuis 12 jours',
      severity: 'high',
      date: new Date('2024-02-06'),
      acknowledged: false
    },
    {
      id: 'alert-2',
      type: 'missing-training',
      collaboratorId: 'collab-2',
      collaboratorName: 'Pierre Martin',
      message: 'Formation obligatoire "Sécurité" en retard',
      severity: 'high',
      date: new Date('2024-02-11'),
      acknowledged: false
    },
    {
      id: 'alert-3',
      type: 'deadline',
      collaboratorId: 'collab-1',
      collaboratorName: 'Marie Dubois',
      message: 'Formation "Sécurité Web" à terminer avant le 20/02',
      severity: 'medium',
      date: new Date('2024-02-06'),
      acknowledged: true
    }
  ];

  trainingSuggestions: TrainingSuggestion[] = [
    {
      id: 'sugg-1',
      trainingName: 'Leadership pour Développeurs',
      description: 'Formation pour développer les compétences de leadership technique',
      recommendedFor: ['collab-1', 'collab-3'],
      reason: 'Basé sur leurs scores élevés et leur potentiel de leadership',
      priority: 85,
      estimatedDuration: 20
    },
    {
      id: 'sugg-2',
      trainingName: 'Motivation et Engagement',
      description: 'Techniques pour améliorer l\'engagement et la motivation',
      recommendedFor: ['collab-2'],
      reason: 'Score d\'engagement faible et inactivité détectée',
      priority: 95,
      estimatedDuration: 15
    },
    {
      id: 'sugg-3',
      trainingName: 'Méthodologies Agiles Avancées',
      description: 'Perfectionnement en méthodes agiles et Scrum',
      recommendedFor: ['collab-1', 'collab-3', 'collab-4'],
      reason: 'Équipe performante prête pour des concepts avancés',
      priority: 70,
      estimatedDuration: 25
    }
  ];

  ngOnInit(): void {
    this.initializeCharts();
    this.checkAlerts();
  }

  initializeCharts(): void {
    this.initTeamPerformanceChart();
    this.initEngagementTrendChart();
    this.initTrainingCompletionChart();
    this.initIndividualComparisonChart();
    this.initProgressHistoryChart();
    this.initTimeSpentChart();
  }

  initTeamPerformanceChart(): void {
    this.teamPerformanceChart = {
      title: {
        text: 'Performance par Équipe',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: Score {c}/100'
      },
      xAxis: {
        type: 'category',
        data: this.teams.map(t => t.name.split(' ')[1])
      },
      yAxis: { type: 'value', max: 100 },
      series: [{
        data: this.teams.map(t => t.averageScore),
        type: 'bar',
        itemStyle: {
          color: (params: any) => {
            const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12'];
            return colors[params.dataIndex % colors.length];
          }
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}'
        }
      }]
    };
  }

  initEngagementTrendChart(): void {
    this.engagementTrendChart = {
      title: {
        text: 'Évolution de l\'Engagement (6 derniers mois)',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['Sep', 'Oct', 'Nov', 'Déc', 'Jan', 'Fév']
      },
      yAxis: { type: 'value', max: 100 },
      series: [{
        name: 'Engagement Moyen',
        data: [72, 75, 78, 76, 79, 78],
        type: 'line',
        smooth: true,
        itemStyle: { color: '#3498db' },
        areaStyle: { color: 'rgba(52, 152, 219, 0.2)' }
      }]
    };
  }

  initTrainingCompletionChart(): void {
    const completionData = this.filteredCollaborators.map(c => ({
      name: c.name.split(' ')[0],
      value: c.completionRate
    }));

    this.trainingCompletionChart = {
      title: {
        text: 'Taux de Complétion par Collaborateur',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}%'
      },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        data: completionData.map((item, index) => ({
          ...item,
          itemStyle: {
            color: ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'][index % 5]
          }
        }))
      }]
    };
  }

  initIndividualComparisonChart(): void {
    const collaborators = this.filteredCollaborators;
    this.individualComparisonChart = {
      title: {
        text: 'Comparaison Scores Individuels',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: collaborators.map(c => c.name.split(' ')[0])
      },
      yAxis: { type: 'value', max: 100 },
      series: [
        {
          name: 'Score Performance',
          data: collaborators.map(c => c.individualScore),
          type: 'bar',
          itemStyle: { color: '#3498db' }
        },
        {
          name: 'Score Engagement',
          data: collaborators.map(c => c.engagementScore),
          type: 'bar',
          itemStyle: { color: '#e74c3c' }
        }
      ]
    };
  }

  initProgressHistoryChart(): void {
    if (this.selectedCollaborator) {
      const collab = this.collaborators.find(c => c.id === this.selectedCollaborator);
      if (collab) {
        this.progressHistoryChart = {
          title: {
            text: `Historique de Progression - ${collab.name}`,
            left: 'center',
            textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
          },
          tooltip: { trigger: 'axis' },
          xAxis: {
            type: 'category',
            data: collab.progressHistory.map(p => p.date.toLocaleDateString())
          },
          yAxis: { type: 'value', max: 100 },
          series: [
            {
              name: 'Score',
              data: collab.progressHistory.map(p => p.score),
              type: 'line',
              smooth: true,
              itemStyle: { color: '#3498db' }
            },
            {
              name: 'Complétion',
              data: collab.progressHistory.map(p => p.completionRate),
              type: 'line',
              smooth: true,
              itemStyle: { color: '#27ae60' }
            }
          ]
        };
      }
    }
  }

  initTimeSpentChart(): void {
    this.timeSpentChart = {
      title: {
        text: 'Temps de Formation par Collaborateur',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c}h'
      },
      xAxis: {
        type: 'category',
        data: this.filteredCollaborators.map(c => c.name.split(' ')[0])
      },
      yAxis: { type: 'value' },
      series: [{
        data: this.filteredCollaborators.map(c => c.trainingTimeSpent),
        type: 'bar',
        itemStyle: { color: '#9b59b6' },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}h'
        }
      }]
    };
  }

  // View mode methods
  setViewMode(mode: 'overview' | 'team-details' | 'individual' | 'alerts' | 'suggestions'): void {
    this.viewMode = mode;
    if (mode === 'individual' && this.selectedCollaborator) {
      this.initProgressHistoryChart();
    }
  }

  selectTeam(teamId: string): void {
    this.selectedTeam = teamId;
    this.showAllTeams = false;
    this.initializeCharts();
  }

  selectCollaborator(collabId: string): void {
    this.selectedCollaborator = collabId;
    this.viewMode = 'individual';
    this.initProgressHistoryChart();
  }

  toggleShowAllTeams(): void {
    this.showAllTeams = !this.showAllTeams;
    this.selectedTeam = '';
    this.initializeCharts();
  }

  // Alert methods
  acknowledgeAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.acknowledged = true;
    }
  }

  dismissAlert(alertId: string): void {
    this.alerts = this.alerts.filter(a => a.id !== alertId);
  }

  checkAlerts(): void {
    // Auto-generate alerts based on collaborator data
    this.collaborators.forEach(collab => {
      const daysSinceActivity = Math.floor((new Date().getTime() - collab.lastActivity.getTime()) / (1000 * 60 * 60 * 24));
      
      // Inactivity alert
      if (daysSinceActivity > 7 && this.alertsEnabled) {
        const existingAlert = this.alerts.find(a => a.type === 'inactivity' && a.collaboratorId === collab.id);
        if (!existingAlert) {
          this.alerts.push({
            id: `inactivity-${collab.id}-${Date.now()}`,
            type: 'inactivity',
            collaboratorId: collab.id,
            collaboratorName: collab.name,
            message: `Aucune activité depuis ${daysSinceActivity} jours`,
            severity: daysSinceActivity > 14 ? 'high' : 'medium',
            date: new Date(),
            acknowledged: false
          });
        }
      }

      // Mandatory training alert
      if (collab.mandatoryTrainingsCompleted < collab.mandatoryTrainingsTotal && this.mandatoryTrainingNotifications) {
        const existingAlert = this.alerts.find(a => a.type === 'missing-training' && a.collaboratorId === collab.id);
        if (!existingAlert) {
          this.alerts.push({
            id: `training-${collab.id}-${Date.now()}`,
            type: 'missing-training',
            collaboratorId: collab.id,
            collaboratorName: collab.name,
            message: `${collab.mandatoryTrainingsTotal - collab.mandatoryTrainingsCompleted} formation(s) obligatoire(s) manquante(s)`,
            severity: 'high',
            date: new Date(),
            acknowledged: false
          });
        }
      }
    });
  }

  // Suggestion methods
  acceptSuggestion(suggestionId: string): void {
    const suggestion = this.trainingSuggestions.find(s => s.id === suggestionId);
    if (suggestion) {
      console.log(`Assigning training "${suggestion.trainingName}" to:`, suggestion.recommendedFor);
      // Here you would integrate with your training assignment system
    }
  }

  dismissSuggestion(suggestionId: string): void {
    this.trainingSuggestions = this.trainingSuggestions.filter(s => s.id !== suggestionId);
  }

  // Export methods
  exportToExcel(): void {
    console.log('Exporting team data to Excel');
  }

  exportToPDF(): void {
    console.log('Generating team performance PDF report');
  }

  // Contact methods
  contactCollaborator(collabId: string): void {
    const collab = this.collaborators.find(c => c.id === collabId);
    if (collab) {
      console.log(`Contacting ${collab.name} at ${collab.email}`);
    }
  }

  scheduleOneOnOne(collabId: string): void {
    const collab = this.collaborators.find(c => c.id === collabId);
    if (collab) {
      console.log(`Scheduling one-on-one with ${collab.name}`);
    }
  }

  // Utility methods
  getStatusColor(status: string): string {
    const colors = {
      'active': '#27ae60',
      'inactive': '#95a5a6',
      'at-risk': '#e74c3c'
    };
    return colors[status as keyof typeof colors] || '#95a5a6';
  }

  getSeverityColor(severity: string): string {
    const colors = {
      'high': '#e74c3c',
      'medium': '#f39c12',
      'low': '#27ae60'
    };
    return colors[severity as keyof typeof colors] || '#95a5a6';
  }

  getDaysInactive(lastActivity: Date): number {
    return Math.floor((new Date().getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
  }

  getComplianceRate(collab: Collaborator): number {
    return Math.round((collab.mandatoryTrainingsCompleted / collab.mandatoryTrainingsTotal) * 100);
  }

  getObjectiveRate(collab: Collaborator): number {
    return Math.round((collab.objectivesAchieved / collab.objectivesTotal) * 100);
  }

  // Computed properties
  get filteredCollaborators(): Collaborator[] {
    if (this.showAllTeams) {
      return this.collaborators;
    }
    if (!this.selectedTeam) {
      return this.collaborators.slice(0, 4); // Show first 4 by default
    }
    return this.collaborators.filter(c => c.team === this.selectedTeam);
  }

  get selectedTeamData(): Team | null {
    return this.selectedTeam ? this.teams.find(t => t.id === this.selectedTeam) || null : null;
  }

  get selectedCollaboratorData(): Collaborator | null {
    return this.selectedCollaborator ? this.collaborators.find(c => c.id === this.selectedCollaborator) || null : null;
  }

  get pendingAlerts(): Alert[] {
    return this.alerts.filter(a => !a.acknowledged);
  }

  get highPriorityAlerts(): Alert[] {
    return this.alerts.filter(a => a.severity === 'high' && !a.acknowledged);
  }

  get teamAverageScore(): number {
    const collabs = this.filteredCollaborators;
    return collabs.length > 0 ? Math.round(collabs.reduce((sum, c) => sum + c.individualScore, 0) / collabs.length) : 0;
  }

  get teamAverageEngagement(): number {
    const collabs = this.filteredCollaborators;
    return collabs.length > 0 ? Math.round(collabs.reduce((sum, c) => sum + c.engagementScore, 0) / collabs.length) : 0;
  }

  get atRiskCount(): number {
    return this.filteredCollaborators.filter(c => c.status === 'at-risk').length;
  }

  get totalTrainingHours(): number {
    return this.filteredCollaborators.reduce((sum, c) => sum + c.trainingTimeSpent, 0);
  }

  getCollaboratorName(collabId: string): string {
    const collaborator = this.collaborators.find(c => c.id === collabId);
    return collaborator ? collaborator.name : 'Collaborateur inconnu';
  }
}
