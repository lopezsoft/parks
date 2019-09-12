import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company/company.component';
import { BranchComponent } from './branch/branch.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [CompanyComponent, BranchComponent, HomeComponent],
  imports: [
    CommonModule
  ],
  exports: [CompanyComponent, BranchComponent, HomeComponent]
})
export class HomeModule { }
