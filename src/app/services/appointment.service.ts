import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, mergeMap } from 'rxjs';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  URL = 'http://localhost:8081/api/appointments';

  constructor(private http: HttpClient) { }

  fetchAppointmentsForPatient(id: number): Observable<any> {
    return this.http.get<Appointment[]>(this.URL + `/patient/${id}`)
    .pipe(
      mergeMap((response) => {
          return response.map((apt) => {
            apt.begining = moment(apt.begining).add('hours', 3).format('DD/MM/YYYY HH:mm');
            apt.ending = moment(apt.ending).add('hours', 3).format('DD/MM/YYYY HH:mm');
            return apt;
        }); 
      })
    );
  }
}
