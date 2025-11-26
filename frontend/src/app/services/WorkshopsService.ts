import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Workshop {
  id: number;
  name: string;
  code: string;
  numberClasses: number;
  isFinished: number;
  description: string;
}

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
export class WorkshopsService {
  private readonly API_BASE_URL = 'http://localhost:8080/workshops';

  constructor(private http: HttpClient) {}

  getWorkshopsByUser(userId: number): Observable<Workshop[]> {
    return this.http.get<Workshop[]>(`${this.API_BASE_URL}/user/${userId}`, { withCredentials: true });
  }

  getAllWorkshops(): Observable<Workshop[]> {
    return this.http.get<Workshop[]>(this.API_BASE_URL, { withCredentials: true });
  }

  getUsersWorkshops(workshopId: number, typeId: number, page: number, size: number): Observable<any> {
    return this.http.get<any>(
      `${this.API_BASE_URL}/${workshopId}/users/by-type/${typeId}?page=${page}&size=${size}`,
      { withCredentials: true }
    );
  }


  getWorkshopsByUserPaginated(userId: number, page: number, size: number): Observable<any> {
    return this.http.get<any>(
      `${this.API_BASE_URL}/user/${userId}?page=${page}&size=${size}`,
      { withCredentials: true }
    );
  }

  deleteWorkshop(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE_URL}/${id}`, { withCredentials: true });
  }

  removeUserFromWorkshop(workshopId: number, userId: number) {
    return this.http.delete(
      `${this.API_BASE_URL}/${workshopId}/users/${userId}`,
      { withCredentials: true }
    );
  }

  finalizeWorkshop(id: number): Observable<void> {
    return this.http.put<void>(
      `${this.API_BASE_URL}/${id}/finalize`,
      {},
      { withCredentials: true }
    );
  }
}
