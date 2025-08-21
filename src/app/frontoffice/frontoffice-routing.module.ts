import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeformationComponent } from './homeformation/homeformation.component';
import { ActualiteComponent } from './Actualitéoffice/actualite/actualite.component';
import { FormationComponent } from './formation/formation.component';
import { HistoriqueComponent } from './historique/historique.component';
import { FormationofficeComponent } from './Formations/formationoffice/formationoffice.component';
import { ShowformationdetailsofficeComponent } from './Formations/showformationdetailsoffice/showformationdetailsoffice.component';
import { HistoriqueDemandeComponent } from './historique-demande/historique-demande.component';
import { HistoriqueformationsComponent } from './historiqueformations/historiqueformations.component';
import { ProgressionComponent } from './progression/progression.component';
import { kpiComponent } from './KPI/kpi.component';


const routes: Routes = [

  {
    path: 'homepage',
    component: HomeComponent,
    data: {
      title: 'home page',
    },
  },
  {
    path: 'homelms',
    component: HomeformationComponent,
    data: {
      title: 'home lms',
    },
  },
  {
    path: 'formation',
    component: FormationComponent,
    data: {
      title: 'home lms',
    },
  },
   {
    path: 'dashboard',
    component: kpiComponent,
    data: {
      title: 'dashboard lms',
    },
  },
  {
    path: 'formations',
    component: FormationofficeComponent,
    data: {
      title: 'home lms',
    },
  },
   {
    path: 'formationshistorique',
    component: HistoriqueformationsComponent,
    data: {
      title: 'home lms',
    },
  },
  {
    path: 'historique',
    component: HistoriqueComponent,
    data: {
      title: 'historique lms',
    },
  },
  {
    path: 'actualite',
    component: ActualiteComponent,
    data: {
      title: 'actualite lms',
    },
  },
  {
    path: 'demande',
    component: HistoriqueDemandeComponent,
    data: {
      title: 'demande lms',
    },
  },
    {
    path: 'progression',
    component: ProgressionComponent,
    data: {
      title: 'progression lms',
    },
  },
    {
      path: 'formation-detail/:id',
      component: ShowformationdetailsofficeComponent
  
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
