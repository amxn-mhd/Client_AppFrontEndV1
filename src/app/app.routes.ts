import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { RegisterComponent } from './features/register/register.component';
import { PatientsComponent } from './features/patients/patients.component';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { MedicineComponent } from './features/medicine/medicine.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'patient',
    children:[
      {path:'search',component:PatientsComponent},
      {path:'details/:id',component:PatientDetailsComponent}
    ]
  },
  {path:"medicine",component:MedicineComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];
