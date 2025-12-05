import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  name: string;
  code: string;

  userType?: {
    id: number;
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private readonly API_BASE_URL = `${environment.apiBaseUrl}/users`;
  
  constructor(private http: HttpClient) {}

  getUsersByType(typeId: number, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.API_BASE_URL}/type/${typeId}?page=${page}&size=${size}`, { withCredentials: true });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE_URL}/${id}`, { withCredentials: true });
  }
}
