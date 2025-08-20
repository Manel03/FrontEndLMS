import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, UserDetails } from '../models/User';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private baseUrl = 'http://localhost:8080/api/v1/users'; // Assurez-vous que l'URL correspond à votre API

  constructor(private http: HttpClient) { }

  /**
   * Récupérer tous les utilisateurs
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  /**
   * Récupérer un utilisateur par ID
   */
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`);
  }

  getMangersByUser(userId: string): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(`${this.baseUrl}/${userId}/managers`);
  }

  getCollaborateursByUser(userId: string): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(`${this.baseUrl}/${userId}/collaborateurs`);
  }
  /**
   * Créer un nouvel utilisateur
   */
  createUser(user: User): Observable<string> {
    return this.http.post<string>(this.baseUrl, user);
  }

  /**
   * Mettre à jour un utilisateur
   */
  updateUser(userId: string, user: User): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${userId}`, user);
  }

  /**
   * Supprimer un utilisateur
   */
  deleteUser(userId: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${userId}`);
  }

  /**
   * Ajouter le token d'authentification dans les requêtes
   */
  private createHeaders(): HttpHeaders {
    let token = localStorage.getItem('token'); // Assurez-vous que le token est bien stocké après connexion
    //const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ4TGhzS21xWUpPaWRQb2UzR1I0d3lNLV9KbVkwTE04TWhZSTVuRDZocnBzIn0.eyJleHAiOjE3NDA5NTI3NDYsImlhdCI6MTc0MDkzMTE0NiwiYXV0aF90aW1lIjoxNzQwOTI3NDY2LCJqdGkiOiI2YmYzZTljNi0xN2I5LTRmMjEtYmYyNi0yNGJiYTNiYjI1ZTUiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwOTAvcmVhbG1zL2FjdGlhLWxtcy1uZXR3b3JrIiwiYXVkIjpbInJlYWxtLW1hbmFnZW1lbnQiLCJhY2NvdW50Il0sInN1YiI6IjA5NDNlODk4LWRhMzItNGE1My04Mjg5LWJiYTM5ZTAzNTQ2YyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImxtcyIsIm5vbmNlIjoiZTI0MDM4MWYtMTk1Ni00YjE5LWE5YjQtMzlmZmY5N2I1ZjA3Iiwic2Vzc2lvbl9zdGF0ZSI6IjVjZmY4ZTc4LTk3MWYtNDU0Mi1iMDI0LTBiODQ4YmIzODUzZiIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtYWN0aWEtbG1zLW5ldHdvcmsiXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbIm1hbmFnZS11c2VycyIsIm1hbmFnZS1jbGllbnRzIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJkZWxldGUtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI1Y2ZmOGU3OC05NzFmLTQ1NDItYjAyNC0wYjg0OGJiMzg1M2YiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbGthIEpsYXNzaWkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtb2xrYWpsQG1haWwuY29tIiwiZ2l2ZW5fbmFtZSI6Ik1vbGthIiwiZmFtaWx5X25hbWUiOiJKbGFzc2lpIiwiZW1haWwiOiJtb2xrYWpsQG1haWwuY29tIn0.Nu2qR48GuQHodk6G-m7vj0sOgDkAiHL4toHosxKmNA5HXFaqLFp0p_ZRoY0m45ySjaXeCg_G6aWWxLkpKZFoU2G_5sPlKtBn2j-x9EDL0IB8YLlHH13tv_pLVanOSX3ub1HVaZhKbXlZyJ3rdeSKYYIFEOe7S047BkDbqv8jaTOOkYFqrwcQnziKEDqCn5m1uvTFPfZHddECksp8v_U88AJPXaFawnvOKBde-U1olXcqz-QwIyN9lhS_0SSGRNUwidLb2Mo8gvo-VJ_wmB856LMxqnkWFmxIGY9Zjv3YOYSwILh3Y5bOS25VeW0y_-n0fSPCG_eQv_tPjwVuPrgFPg";
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}
