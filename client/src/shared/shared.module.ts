import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table' 

import { ImageLoadHandlerDirective } from './directives/image-load-handler.directive';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [ImageLoadHandlerDirective],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDividerModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    DragDropModule,
    MatTabsModule,
    MatBadgeModule,
    MatSidenavModule,
    AppRoutingModule,
    MatTableModule
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDividerModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ImageLoadHandlerDirective,
    FontAwesomeModule,
    DragDropModule,
    MatTabsModule,
    MatBadgeModule,
    MatSidenavModule,
    AppRoutingModule,
    MatTableModule
  ]
})
export class SharedModule {
  public constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}
