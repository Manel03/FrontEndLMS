import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload-excel-component',
  templateUrl: './upload-excel-component.component.html',
  styleUrls: ['./upload-excel-component.component.scss']
})


export class UploadExcelComponentComponent {
  form: FormGroup;
  page: number = 1; // Current page
  usersPerPage: number = 10; // Number of users per page
  allUsers: any[] = []; // Store all users from the Excel file

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      users: this.fb.array([]) // FormArray for storing multiple users
    });
  }

  get users(): FormArray {
    return this.form.get('users') as FormArray;
  }

  addUser(userData: any) {
    this.users.push(this.fb.group({
      nom: [userData.nom || ''],
      prenom: [userData.prenom || ''],
      email: [userData.email || ''],
      nomFormation: [userData.nomFormation || ''],
      departement: [userData.departement || ''],
      nomEquipe: [userData.nomEquipe || ''],
    }));
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
        if (jsonData.length > 1) {
          this.users.clear();
          this.allUsers = []; // Reset all users before adding new ones
  
          for (let i = 1; i < jsonData.length; i++) { // Ignore first line (headers)
            const rowData = jsonData[i];
            
            // Check if the row contains any valid data (non-empty)
            if (rowData.some(cell => cell !== null && cell !== undefined && cell !== '')) {
              const user = {
                nom: rowData[0],
                prenom: rowData[1],
                email: rowData[2],
                nomFormation: rowData[3],
                departement: rowData[4],
                nomEquipe: rowData[5],
              };
              this.allUsers.push(user);
              this.addUser(user);
            }
          }
  
          // Display only users for the current page
          this.updatePageUsers();
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }
  

  updatePageUsers() {
    const startIndex = (this.page - 1) * this.usersPerPage;
    const endIndex = startIndex + this.usersPerPage;
    const usersToDisplay = this.allUsers.slice(startIndex, endIndex);

    // Clear the existing users and add the paginated ones
    this.users.clear();
    usersToDisplay.forEach(user => this.addUser(user));
  }

  nextPage() {
    if (this.page * this.usersPerPage < this.allUsers.length) {
      this.page++;
      this.updatePageUsers();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.updatePageUsers();
    }
  }

  refreshExcel() {
    this.users.clear(); // Clear existing users
    this.allUsers = []; // Reset all users
    this.page = 1; // Reset to first page
  }
}