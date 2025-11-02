import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface School {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class SchoolsService {
  private readonly API_BASE_URL = 'http://localhost:8080/schools';

  constructor(private http: HttpClient) {}

  getAllSchools(): Observable<School[]> {
    return this.http.get<School[]>(this.API_BASE_URL, { withCredentials: true });
  }

  deleteSchool(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE_URL}/${id}`, { withCredentials: true });
  }
}
