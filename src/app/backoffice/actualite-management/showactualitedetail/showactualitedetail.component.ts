import { Component, Input } from '@angular/core';
import { Formation } from '../../models/Formation';
import { ActualitemanagmentService } from '../../service/actualitemanagment.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-showactualitedetail',
  templateUrl: './showactualitedetail.component.html',
  styleUrls: ['./showactualitedetail.component.scss']
})
export class ShowactualitedetailComponent {
  @Input() formation!: Formation;
  display: boolean = false;
  imageUrl: string = '';

 

  private readonly baseUrl: string = 'http://localhost:8085/api/micro-formation/downloadFile/';

  constructor(
    private actualiteService: ActualitemanagmentService,
    private http: HttpClient
  ) {}

  openModal(): void {
    console.log('Formation reçue:', this.formation);
    this.display = true;
  
    // Récupérer le token JWT de localStorage
    const token = localStorage.getItem('token');
    console.log('Token récupéré:', token);  // Log du token
  
    if (!token) {
      console.error('Aucun token trouvé. Assurez-vous que l\'utilisateur est authentifié.');
      return; // Sortir si le token est null
    }
  
    if (this.formation?.image) {
      const imageUrl = `http://localhost:8085/api/micro-formation${this.formation.image}`;
      console.log('URL de l\'image:', imageUrl); // Log de l'URL de l'image
  
      this.getImageWithAuth(imageUrl, token).subscribe(
        (imageBlob) => {
          this.imageUrl = URL.createObjectURL(imageBlob);
        },
        (error) => {
          console.error('Erreur de chargement de l\'image:', error);
        }
      );
    } else {
      console.error('Aucune image disponible pour cette formation.');
    }
  }
  
  

  closeModal(): void {
    this.display = false;
  }

  getImageWithAuth(imagePath: string, token: string): Observable<Blob> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`http://localhost:8085/api/micro-formation/downloadFile/${imagePath}`, {
      headers: headers,
      responseType: 'blob' // Récupérer l'image en tant que Blob
    });
  }
}


