import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, NgbModule],
  exports: [HttpClientModule, NgbModule],
})
export class SharedModule {}
