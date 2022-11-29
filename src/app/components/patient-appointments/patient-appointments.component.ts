import { Component } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { FormBuilder, Validators } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/authorization/auth.service';
import { Patient } from 'src/app/models/patient.model';
import { MatTableDataSource } from '@angular/material/table';
import { map, of } from 'rxjs';

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.scss']
})
export class PatientAppointmentsComponent {
  appointments: MatTableDataSource<Appointment> = new MatTableDataSource<Appointment>([]);

  displayedColumns = [
    'patient', 'professional', 'begining', 'ending'
  ]

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {  }

  fetchAppointments() {
    const patient: Patient = this.authService.getUserLogedIn();
    this.appointmentService.fetchAppointmentsForPatient(patient.id)
      .pipe(
        map((response) => {
          const datasource = this.appointments;
          if(response) {
            datasource.data = response as Appointment[];
          }
          return datasource;
        })
      );
  }
}
