import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ClassItem {
  id: number;
  classNumber: number;
}

@Injectable({ providedIn: 'root' })
export class ClassesService {
  private readonly API_BASE_URL = 'http://localhost:8080/workshops';

  constructor(private http: HttpClient) {}

  getClassesByWorkshop(workshopId: number, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.API_BASE_URL}/${workshopId}/classes`, {
      params: { page, size },
      withCredentials: true
    });
  }

  countClasses(workshopId: number): Observable<number> {
    return this.http.get<number>(`${this.API_BASE_URL}/${workshopId}/classes/count`, {
      withCredentials: true
    });
  }

  createClass(workshopId: number): Observable<ClassItem> {
    return this.http.post<ClassItem>(`${this.API_BASE_URL}/${workshopId}/classes`, null, {
      withCredentials: true
    });
  }

  deleteClass(workshopId: number, classId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE_URL}/${workshopId}/classes/${classId}`, {
      withCredentials: true
    });
  }
}
