import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [MatButtonModule, MatIconModule, MatInputModule, MatCardModule],
  exports: [MatButtonModule, MatIconModule, MatInputModule, MatCardModule],
})
export class MaterialModule {}
