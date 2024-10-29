import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { CommonModule } from '@angular/common'; // Import CommonModule

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [CommonModule, RouterModule], // Include CommonModule here
  exports: [NavbarComponent, FooterComponent] // Export NavbarComponent for use in other modules
})
export class SharedModule {}
