import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FromNowPipe } from './from-now.pipe';
import { UploadComponent } from './upload/upload.component';
import { UploadService } from './upload/upload.service';

@NgModule({
  declarations: [FromNowPipe, UploadComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FromNowPipe,
    UploadComponent,
  ],
  providers: [UploadService],
})
export class SharedModule {}
