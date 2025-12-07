import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CertificateService {

  private readonly API_URL = `${environment.apiBaseUrl}/certificate`;

  constructor(private http: HttpClient) {}

  getCertificate(userId: number, workshopId: number) {
    return this.http.get(
      `${this.API_URL}/${userId}/${workshopId}`,
      {
        responseType: 'blob',
        withCredentials: true
      }
    );
  }

}
