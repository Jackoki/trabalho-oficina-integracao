import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RollCallRequest {
  userId: number;
  isPresent: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class RollCallService {
  private readonly API_BASE_URL = `${environment.apiBaseUrl}/classes`;

  constructor(private http: HttpClient) {}

  saveRollCall(classId: number, attendances: RollCallRequest[]): Observable<void> {
    return this.http.post<void>(
      `${this.API_BASE_URL}/${classId}/frequencies/save-rollcall`,
      attendances,
      { withCredentials: true }
    );
  }
}
