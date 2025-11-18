import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private readonly API_BASE_URL = 'http://localhost:8080/users';
  
  constructor(private http: HttpClient) {}

  getUsersByType(typeId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_BASE_URL}/type/${typeId}`, { withCredentials: true });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE_URL}/${id}`, { withCredentials: true });
  }
}
