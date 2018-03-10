import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LeafletmapComponent } from './leafletmap/leafletmap.component';
import { ProfileComponent } from './profile/profile.component';
import { EmitterService } from './shared/emitter.service';


@NgModule({
  declarations: [
    AppComponent,
    LeafletmapComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [EmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
