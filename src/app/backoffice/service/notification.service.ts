import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../models/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = 'http://localhost:8085/api/micro-formation/notifications'; // adapte l'URL à ton backend

  constructor(private http: HttpClient) {}

  getUnreadNotifications(userId: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/${userId}`);
  }

  markAsRead(notificationId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/read/${notificationId}`, {});
  }

getNotifications(userId: string): Observable<Notification[]> {
  return this.http.get<Notification[]>(`http://localhost:8085/api/micro-formation/notifications/${userId}`);
}

getAllNotificationsForUser(userId: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/user/${userId}`);
  }
}
