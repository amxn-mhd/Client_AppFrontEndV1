import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-details',
  imports: [CommonModule,FormsModule],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent {
  ApiServices = inject(ApiService);
  patientId!: number;
  patientData: any = null;
  isLoading = true;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.patientId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchPatientDetails();
  }

  activeTab: string = 'Profile';

setActiveTab(tab: string) {
  this.activeTab = tab;
}

  fetchPatientDetails(): void {
    this.http.get(`${this.ApiServices.baseUrl}/patient/details/${this.patientId}`).subscribe({
      next: (data) => {
        this.patientData = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch patient details', err);
        this.isLoading = false;
      }
    });
  }
}
