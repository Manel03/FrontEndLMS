
import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

interface KPIMetric {
  id: string;
  label: string;
  value: number;
  target: number;
  unit: string;
  icon: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  category: string;
  description: string;
}

interface LearningModule {
  id: string;
  name: string;
  progress: number;
  timeSpent: number;
  targetTime: number;
  status: 'completed' | 'in-progress' | 'not-started' | 'overdue';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  nextSession?: Date;
  score?: number;
}

interface PersonalGoal {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  progress: number;
  category: string;
  priority: 'high' | 'medium' | 'low';
}

interface SmartRecommendation {
  id: string;
  title: string;
  description: string;
  reason: string;
  confidence: number;
  type: 'skill-gap' | 'career-path' | 'performance' | 'trending';
  estimatedDuration: number;
  difficulty: string;
  aiScore: number;
}

interface PerformanceBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedDate: Date;
  category: 'completion' | 'speed' | 'quality' | 'consistency';
}

interface UpcomingSession {
  id: string;
  title: string;
  date: Date;
  duration: number;
  type: 'webinar' | 'workshop' | 'exam' | 'meeting';
  instructor: string;
  status: 'registered' | 'mandatory' | 'recommended';
}

interface LearningAlert {
  id: string;
  type: 'incomplete' | 'new-available' | 'deadline' | 'reminder';
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  actionRequired: boolean;
  dueDate?: Date;
}

@Component({
  selector: 'app-kpi-collaborateur',
  templateUrl: './kpi-collaborateur.component.html',
  styleUrls: ['./kpi-collaborateur.component.scss']
})
export class KpiCollaborateurComponent implements OnInit {
  // View controls
  viewMode: 'dashboard' | 'progress' | 'recommendations' | 'goals' = 'dashboard';
  selectedPeriod = '30';
  selectedCategory = '';
  showNotifications = false;
  
  // Charts
  progressChart: EChartsOption = {};
  skillsRadarChart: EChartsOption = {};
  timeDistributionChart: EChartsOption = {};
  performanceTrendChart: EChartsOption = {};
  comparisonChart: EChartsOption = {};
  learningPathChart: EChartsOption = {};
  
  // Data
  kpiMetrics: KPIMetric[] = [
    {
      id: 'personal-completion',
      label: 'Progression Parcours',
      value: 87,
      target: 90,
      unit: '%',
      icon: '🎯',
      trend: 'up',
      trendValue: 5.2,
      category: 'progression',
      description: 'Progression dans vos parcours de formation'
    },
    {
      id: 'quiz-average',
      label: 'Score Moyen Quiz',
      value: 84,
      target: 85,
      unit: '/100',
      icon: '🧠',
      trend: 'up',
      trendValue: 3.1,
      category: 'performance',
      description: 'Score moyen aux évaluations et quiz'
    },
    {
      id: 'learning-frequency',
      label: 'Fréquence Apprentissage',
      value: 4.2,
      target: 5,
      unit: 'h/sem',
      icon: '📚',
      trend: 'stable',
      trendValue: 0.8,
      category: 'engagement',
      description: 'Heures d\'apprentissage par semaine'
    },
    {
      id: 'time-between-training',
      label: 'Intervalle Formations',
      value: 12,
      target: 14,
      unit: 'jours',
      icon: '⏱️',
      trend: 'down',
      trendValue: -2.3,
      category: 'consistency',
      description: 'Temps moyen entre vos formations'
    },
    {
      id: 'performance-score',
      label: 'Score Performance',
      value: 92,
      target: 85,
      unit: '/100',
      icon: '⭐',
      trend: 'up',
      trendValue: 7.5,
      category: 'performance',
      description: 'Score global de performance'
    }
  ];

  learningModules: LearningModule[] = [
    {
      id: 'angular-advanced',
      name: 'Angular Avancé',
      progress: 85,
      timeSpent: 24,
      targetTime: 30,
      status: 'in-progress',
      difficulty: 'advanced',
      category: 'Technique',
      nextSession: new Date('2024-02-15'),
      score: 88
    },
    {
      id: 'leadership-skills',
      name: 'Compétences Leadership',
      progress: 100,
      timeSpent: 20,
      targetTime: 20,
      status: 'completed',
      difficulty: 'intermediate',
      category: 'Soft Skills',
      score: 95
    },
    {
      id: 'ai-fundamentals',
      name: 'Fondamentaux IA',
      progress: 45,
      timeSpent: 12,
      targetTime: 25,
      status: 'in-progress',
      difficulty: 'intermediate',
      category: 'Innovation',
      nextSession: new Date('2024-02-10'),
      score: 78
    },
    {
      id: 'agile-methodology',
      name: 'Méthodologie Agile',
      progress: 0,
      timeSpent: 0,
      targetTime: 15,
      status: 'not-started',
      difficulty: 'beginner',
      category: 'Méthodes'
    }
  ];

  personalGoals: PersonalGoal[] = [
    {
      id: 'fullstack-cert',
      title: 'Certification Full-Stack',
      description: 'Obtenir la certification développeur full-stack',
      targetDate: new Date('2024-06-30'),
      progress: 65,
      category: 'Certification',
      priority: 'high'
    },
    {
      id: 'team-lead',
      title: 'Compétences Team Lead',
      description: 'Développer les compétences de leadership d\'équipe',
      targetDate: new Date('2024-04-15'),
      progress: 40,
      category: 'Leadership',
      priority: 'medium'
    },
    {
      id: 'ai-specialist',
      title: 'Spécialisation IA',
      description: 'Devenir spécialiste en intelligence artificielle',
      targetDate: new Date('2024-08-31'),
      progress: 25,
      category: 'Technique',
      priority: 'high'
    }
  ];

  smartRecommendations: SmartRecommendation[] = [
    {
      id: 'rec-1',
      title: 'DevOps Containerization',
      description: 'Formation Docker et Kubernetes pour compléter vos compétences Angular',
      reason: 'Basé sur vos compétences actuelles en Angular et les tendances du marché',
      confidence: 92,
      type: 'skill-gap',
      estimatedDuration: 25,
      difficulty: 'intermediate',
      aiScore: 87
    },
    {
      id: 'rec-2',
      title: 'Communication Avancée',
      description: 'Perfectionnement des techniques de présentation',
      reason: 'Recommandé pour votre progression vers un poste de leadership',
      confidence: 88,
      type: 'career-path',
      estimatedDuration: 15,
      difficulty: 'intermediate',
      aiScore: 85
    },
    {
      id: 'rec-3',
      title: 'Architecture Microservices',
      description: 'Conception et implémentation d\'architectures microservices',
      reason: 'Complément parfait à vos compétences techniques actuelles',
      confidence: 95,
      type: 'performance',
      estimatedDuration: 35,
      difficulty: 'advanced',
      aiScore: 93
    }
  ];

  performanceBadges: PerformanceBadge[] = [
    {
      id: 'badge-1',
      name: 'Quick Learner',
      description: 'Terminé 5 formations en moins de temps que prévu',
      icon: '⚡',
      color: '#f39c12',
      earnedDate: new Date('2024-01-15'),
      category: 'speed'
    },
    {
      id: 'badge-2',
      name: 'Perfect Score',
      description: 'Obtenu 100% à 3 évaluations consécutives',
      icon: '🎯',
      color: '#27ae60',
      earnedDate: new Date('2024-01-20'),
      category: 'quality'
    },
    {
      id: 'badge-3',
      name: 'Consistent Learner',
      description: 'Formation régulière pendant 30 jours consécutifs',
      icon: '🔥',
      color: '#e74c3c',
      earnedDate: new Date('2024-01-25'),
      category: 'consistency'
    }
  ];

  upcomingSessions: UpcomingSession[] = [
    {
      id: 'session-1',
      title: 'Angular Performance Workshop',
      date: new Date('2024-02-15T14:00:00'),
      duration: 120,
      type: 'workshop',
      instructor: 'Marie Dubois',
      status: 'registered'
    },
    {
      id: 'session-2',
      title: 'Quiz IA Fundamentals',
      date: new Date('2024-02-10T10:00:00'),
      duration: 60,
      type: 'exam',
      instructor: 'Système',
      status: 'mandatory'
    },
    {
      id: 'session-3',
      title: 'Webinaire Leadership Digital',
      date: new Date('2024-02-18T16:00:00'),
      duration: 90,
      type: 'webinar',
      instructor: 'Pierre Martin',
      status: 'recommended'
    }
  ];

  learningAlerts: LearningAlert[] = [
    {
      id: 'alert-1',
      type: 'deadline',
      title: 'Quiz IA à terminer',
      message: 'Le quiz sur les fondamentaux IA doit être terminé avant le 10 février',
      priority: 'high',
      actionRequired: true,
      dueDate: new Date('2024-02-10')
    },
    {
      id: 'alert-2',
      type: 'new-available',
      title: 'Nouvelle formation disponible',
      message: 'Formation "React Native Avancé" maintenant disponible',
      priority: 'medium',
      actionRequired: false
    },
    {
      id: 'alert-3',
      type: 'incomplete',
      title: 'Formation en cours',
      message: 'Il vous reste 3 modules à terminer dans "Angular Avancé"',
      priority: 'medium',
      actionRequired: true
    }
  ];

  categories = [
    { name: 'Technique', icon: '💻', color: '#3498db' },
    { name: 'Soft Skills', icon: '🤝', color: '#e74c3c' },
    { name: 'Innovation', icon: '🚀', color: '#9b59b6' },
    { name: 'Méthodes', icon: '⚙️', color: '#f39c12' },
    { name: 'Leadership', icon: '👑', color: '#27ae60' }
  ];

  ngOnInit(): void {
    this.initializeCharts();
  }

  initializeCharts(): void {
    this.initProgressChart();
    this.initSkillsRadarChart();
    this.initTimeDistributionChart();
    this.initPerformanceTrendChart();
    this.initComparisonChart();
    this.initLearningPathChart();
  }

  initProgressChart(): void {
    this.progressChart = {
      title: {
        text: 'Progression Récente par Module',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c}%'
      },
      xAxis: {
        type: 'category',
        data: this.learningModules.map(m => m.name.split(' ')[0])
      },
      yAxis: { type: 'value', max: 100 },
      series: [{
        data: this.learningModules.map(m => m.progress),
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
          formatter: '{c}%'
        }
      }]
    };
  }

  initSkillsRadarChart(): void {
    this.skillsRadarChart = {
      title: {
        text: 'Profil de Compétences',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: {},
      radar: {
        indicator: [
          { name: 'Technique', max: 100 },
          { name: 'Leadership', max: 100 },
          { name: 'Communication', max: 100 },
          { name: 'Innovation', max: 100 },
          { name: 'Méthodes', max: 100 }
        ]
      },
      series: [{
        type: 'radar',
        data: [{
          value: [87, 65, 78, 82, 70],
          name: 'Mes Compétences',
          areaStyle: { color: 'rgba(52, 152, 219, 0.3)' }
        }, {
          value: [75, 70, 80, 75, 75],
          name: 'Moyenne Équipe',
          areaStyle: { color: 'rgba(231, 76, 60, 0.2)' }
        }]
      }]
    };
  }

  initTimeDistributionChart(): void {
    this.timeDistributionChart = {
      title: {
        text: 'Répartition du Temps d\'Apprentissage',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}h ({d}%)'
      },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: 24, name: 'Technique', itemStyle: { color: '#3498db' } },
          { value: 20, name: 'Soft Skills', itemStyle: { color: '#e74c3c' } },
          { value: 12, name: 'Innovation', itemStyle: { color: '#9b59b6' } },
          { value: 8, name: 'Méthodes', itemStyle: { color: '#f39c12' } }
        ]
      }]
    };
  }

  initPerformanceTrendChart(): void {
    this.performanceTrendChart = {
      title: {
        text: 'Évolution des Performances (6 derniers mois)',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['Sep', 'Oct', 'Nov', 'Déc', 'Jan', 'Fév']
      },
      yAxis: { type: 'value', max: 100 },
      series: [
        {
          name: 'Score Quiz',
          data: [78, 82, 85, 88, 84, 87],
          type: 'line',
          smooth: true,
          itemStyle: { color: '#3498db' }
        },
        {
          name: 'Progression',
          data: [65, 70, 75, 82, 85, 87],
          type: 'line',
          smooth: true,
          itemStyle: { color: '#27ae60' }
        }
      ]
    };
  }

  initComparisonChart(): void {
    this.comparisonChart = {
      title: {
        text: 'Performance vs Moyenne Équipe',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['Complétion', 'Score Quiz', 'Fréquence', 'Rapidité']
      },
      yAxis: { type: 'value', max: 100 },
      series: [
        {
          name: 'Mes Résultats',
          data: [87, 84, 78, 92],
          type: 'bar',
          itemStyle: { color: '#3498db' }
        },
        {
          name: 'Moyenne Équipe',
          data: [75, 80, 72, 85],
          type: 'bar',
          itemStyle: { color: '#95a5a6' }
        }
      ]
    };
  }

  initLearningPathChart(): void {
    this.learningPathChart = {
      title: {
        text: 'Progression dans le Parcours de Carrière',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['Junior Dev', 'Mid Dev', 'Senior Dev', 'Tech Lead', 'Architect']
      },
      yAxis: { type: 'value', max: 100 },
      series: [{
        data: [100, 85, 60, 30, 10],
        type: 'line',
        step: 'middle',
        itemStyle: { color: '#e74c3c' },
        areaStyle: { color: 'rgba(231, 76, 60, 0.2)' },
        markPoint: {
          data: [{ type: 'max', name: 'Position Actuelle' }]
        }
      }]
    };
  }

  // View mode methods
  setViewMode(mode: 'dashboard' | 'progress' | 'recommendations' | 'goals'): void {
    this.viewMode = mode;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  // Filter methods
  setCategory(category: string): void {
    this.selectedCategory = this.selectedCategory === category ? '' : category;
  }

  // Action methods
  startModule(moduleId: string): void {
    console.log(`Starting module: ${moduleId}`);
    const module = this.learningModules.find(m => m.id === moduleId);
    if (module) {
      module.status = 'in-progress';
    }
  }

  takeQuiz(moduleId: string): void {
    console.log(`Taking quiz for module: ${moduleId}`);
  }

  acceptRecommendation(recId: string): void {
    console.log(`Accepting recommendation: ${recId}`);
    const rec = this.smartRecommendations.find(r => r.id === recId);
    if (rec) {
      // Add to learning modules
      this.learningModules.push({
        id: `new-${Date.now()}`,
        name: rec.title,
        progress: 0,
        timeSpent: 0,
        targetTime: rec.estimatedDuration,
        status: 'not-started',
        difficulty: rec.difficulty as any,
        category: 'Recommandée'
      });
    }
  }

  dismissAlert(alertId: string): void {
    this.learningAlerts = this.learningAlerts.filter(a => a.id !== alertId);
  }

  joinSession(sessionId: string): void {
    console.log(`Joining session: ${sessionId}`);
  }

  setGoalProgress(goalId: string, progress: number): void {
    const goal = this.personalGoals.find(g => g.id === goalId);
    if (goal) {
      goal.progress = progress;
    }
  }

  enableNotifications(): void {
    console.log('Enabling notifications for training reminders');
    // Implementation for notification settings
  }

  exportProgress(): void {
    console.log('Exporting learning progress report');
  }

  // Utility methods
  getModuleStatusColor(status: string): string {
    const colors = {
      'completed': '#27ae60',
      'in-progress': '#f39c12',
      'not-started': '#95a5a6',
      'overdue': '#e74c3c'
    };
    return colors[status as keyof typeof colors] || '#95a5a6';
  }

  getAlertPriorityColor(priority: string): string {
    const colors = {
      'high': '#e74c3c',
      'medium': '#f39c12',
      'low': '#95a5a6'
    };
    return colors[priority as keyof typeof colors] || '#95a5a6';
  }

  getRecommendationTypeIcon(type: string): string {
    const icons = {
      'skill-gap': '🎯',
      'career-path': '🚀',
      'performance': '⭐',
      'trending': '📈'
    };
    return icons[type as keyof typeof icons] || '💡';
  }

  getDaysUntil(date: Date): number {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h${mins > 0 ? ` ${mins}min` : ''}` : `${mins}min`;
  }

  // Computed properties
  get filteredModules(): LearningModule[] {
    if (!this.selectedCategory) return this.learningModules;
    return this.learningModules.filter(m => m.category === this.selectedCategory);
  }

  get totalLearningHours(): number {
    return this.learningModules.reduce((sum, m) => sum + m.timeSpent, 0);
  }

  get averageScore(): number {
    const completedModules = this.learningModules.filter(m => m.score);
    return completedModules.length > 0
      ? Math.round(completedModules.reduce((sum, m) => sum + (m.score || 0), 0) / completedModules.length)
      : 0;
  }

  get urgentAlerts(): LearningAlert[] {
    return this.learningAlerts.filter(a => a.priority === 'high');
  }

  get upcomingDeadlines(): UpcomingSession[] {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    return this.upcomingSessions.filter(s => s.date <= nextWeek);
  }

  get personalCompletionRate(): number {
    const completed = this.learningModules.filter(m => m.status === 'completed').length;
    return this.learningModules.length > 0 ? Math.round((completed / this.learningModules.length) * 100) : 0;
  }
}
