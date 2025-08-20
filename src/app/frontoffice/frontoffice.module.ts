import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontofficeRoutingModule } from './frontoffice-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DialogModule } from 'primeng/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from '../material.module';
import { FieldsetModule } from 'primeng/fieldset';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HomeformationComponent } from './homeformation/homeformation.component';
import { MenufrontComponent } from './menufront/menufront.component';
import { ActualiteComponent } from './Actualitéoffice/actualite/actualite.component';
import { ShowactualitedetailofficeComponent } from './Actualitéoffice/showactualitedetailoffice/showactualitedetailoffice.component';
import { FormationComponent } from './formation/formation.component';
import { HistoriqueComponent } from './historique/historique.component';
import { FormationofficeComponent } from './Formations/formationoffice/formationoffice.component';
import { ShowformationdetailsofficeComponent } from './Formations/showformationdetailsoffice/showformationdetailsoffice.component';
import { HistoriqueDemandeComponent } from './historique-demande/historique-demande.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogSuccessComponent } from './dialog-success/dialog-success.component';

import { SharedModule } from '../shared/shared.module';
import { MotifDialogComponent } from './motif-dialog/motif-dialog.component';
import { HistoriqueformationsComponent } from './historiqueformations/historiqueformations.component';
import { ProgressionComponent } from './progression/progression.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    HomeformationComponent,
    MenufrontComponent,
    ActualiteComponent,
    ShowactualitedetailofficeComponent,
    FormationComponent,
    HistoriqueComponent,
    FormationofficeComponent,
    ShowformationdetailsofficeComponent,
    HistoriqueDemandeComponent,
    DialogSuccessComponent,
    MotifDialogComponent,
    HistoriqueformationsComponent,
    ProgressionComponent,
    
    
    
  ],
  
  imports: [
    CommonModule,
      ReactiveFormsModule, // Add ReactiveFormsModule here
      TableModule,
      SharedModule,
      MatDialogModule,
      ButtonModule,
      PaginatorModule,
      ConfirmDialogModule,
      FieldsetModule,
      CardModule,
      MaterialModule,
      MatFormFieldModule, // Add Angular Material Modules
      MatInputModule,
      DialogModule,
      MatCardModule,
      MatButtonModule,
      SplitButtonModule,
    CommonModule,
    FrontofficeRoutingModule
  ]
})
export class FrontofficeModule { }
