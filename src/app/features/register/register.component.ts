import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject,} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  patientForm: FormGroup;
  http = inject(HttpClient)
  ApiServices=inject(ApiService)

  constructor(private fb: FormBuilder) {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      //email: ['', [Validators.email]],
      contactNumber: ['', Validators.required],
      address: [''],
    });
  }

  onSubmit() {
    if (this.patientForm.valid) {
      const formData = { ...this.patientForm.value };
  
      // // Convert dob string to Date object and validate
      // const dob = new Date(formData.dob);
  
      // // Check if dob is a valid date and within SQL Server range
      // if (isNaN(dob.getTime()) || dob < new Date('1753-01-01')) {
      //   alert('Invalid Date of Birth. Please enter a valid date (after 1753).');
      //   return;
      // }
  
      // // Convert to ISO string (optional, for consistency)
      // formData.dob = dob
  
      this.http.post(this.ApiServices.baseUrl + '/Register', formData).subscribe((res: any) => {
        console.log(res);
      });
  
      alert('Patient registered successfully!');
      this.patientForm.reset();
    }
  }
  
}
