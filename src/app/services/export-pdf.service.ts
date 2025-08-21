import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportPdfService {
  constructor(private http: HttpClient) {}

  exportDashboardImage(formData: FormData) {
  return this.http.post('http://localhost:5000/export-dashboard-image', formData, {
    responseType: 'blob' // PDF en retour
  });
}
sendDashboardImage(formData: FormData) {
    return this.http.post('http://localhost:5000/export-dashboard-image', formData, {
      responseType: 'blob'
    });
  }

}
