import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';  // Import the Table module
import { ButtonModule } from 'primeng/button'; // Import the Button module
import { ConfirmDialogModule } from 'primeng/confirmdialog'; // Import the
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';  // Import MessageService
import { ConfirmationService } from 'primeng/api';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { UsermanagementComponent } from './user-management/usermanagement/usermanagement.component';
import { ShowuserdetailsComponent } from './user-management/showuserdetails/showuserdetails.component';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { AddedituserComponent } from './user-management/addedituser/addedituser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '../shared/shared.module';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { FileUploadModule } from 'primeng/fileupload';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import { UploadExcelComponentComponent } from './exceldemande/upload-excel-component/upload-excel-component.component';
import { ActualitemanagmentComponent } from './actualite-management/actualitemanagment/actualitemanagment.component';
import { AddeditActualiteComponent } from './actualite-management/addedit-actualite/addedit-actualite.component';
import { ShowactualitedetailComponent } from './actualite-management/showactualitedetail/showactualitedetail.component';
import { DeleteConfirmationactualiteComponent } from './actualite-management/delete-confirmationactualite/delete-confirmationactualite.component';
import { FormationmanagementComponent } from './formation-management/formationmanagement/formationmanagement.component';
import { AddeditFormationComponent } from './formation-management/addedit-formation/addedit-formation.component';
import { DeleteConfirmationFormationComponent } from './formation-management/delete-confirmation-formation/delete-confirmation-formation.component';
import { ShowformationdetailComponent } from './formation-management/showformationdetail/showformationdetail.component';
import { ManageDemandesComponent } from './manage-demandes/manage-demandes.component';
import { EffectuerformationComponent } from './effectuerformation/effectuerformation.component';
import { AffectationDialogComponent } from './affectation-dialog/affectation-dialog.component';
import { PresenceComponent } from './presence/presence.component';
import { ProgressionCollaborateursComponent } from './progression-collaborateurs/progression-collaborateurs.component';






@NgModule({
  declarations: [
    UsermanagementComponent,
    ShowuserdetailsComponent,
    AddedituserComponent,
    UploadExcelComponentComponent,
    ActualitemanagmentComponent,
    AddeditActualiteComponent,
    ShowactualitedetailComponent,
    DeleteConfirmationactualiteComponent,
    FormationmanagementComponent,
    AddeditFormationComponent,
    DeleteConfirmationFormationComponent,
    ShowformationdetailComponent,
    ManageDemandesComponent,
    EffectuerformationComponent,
    AffectationDialogComponent,
    PresenceComponent,
    ProgressionCollaborateursComponent,
   
   
  

   
  ],
 
  imports: [
    CommonModule,
    TableModule,
    FileUploadModule,
    MultiSelectModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    CheckboxModule,
    MenuModule,
    SharedModule,
    SplitButtonModule,
    ReactiveFormsModule,
    BackofficeRoutingModule,
    RadioButtonModule
  ],
  providers: [
    DialogService,
    MessageService,  // Add MessageService to providers
    ConfirmationService,
    DatePipe
      // Add ConfirmationService to providers
  ]
})
export class BackofficeModule { }
