import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../Services/api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-patients',
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {
  searchForm: FormGroup;
  searchResults: any[] = [];
  noResults: boolean = false;
  isSearching: boolean = false;
  ApiServices=inject(ApiService)

  constructor(private fb: FormBuilder, private http: HttpClient, private toastr: ToastrService) {
    this.searchForm = this.fb.group({
      firstName: [null],
      lastName: [null],
      phoneNumber: [null],
      patientId: [null],
      dateCreated: [null]
    });
  }

  onSearch(): void {
    const rawPayload = this.searchForm.value;

      // Filter out null or empty string values
  const searchPayload = Object.entries(rawPayload)
  .filter(([_, value]) => value !== null && value !== '')
  .reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as any);

  if (Object.keys(searchPayload).length === 0) {
    this.toastr.warning('Please enter at least one search criterion.');
    console.warn('Please enter at least one search criterion.');
    return;
  }

  console.log('Cleaned search payload:', searchPayload);

  this.isSearching = true;
  this.noResults = false;

  this.http.post<any>(this.ApiServices.baseUrl+'/patient/Search', searchPayload).subscribe({
    next: (response) => {
      console.log('Search results:', response);
      this.searchResults = response;
      this.noResults = response.length === 0;
      this.isSearching = false;

    },
    error: (err) => {
      console.error('Search failed:', err);
      this.noResults = true;
      this.searchResults = [];
      this.isSearching = false;
    }
  });
  }
}
