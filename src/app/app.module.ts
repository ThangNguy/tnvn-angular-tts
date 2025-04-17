import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { VoiceControlsComponent } from './components/voice-controls/voice-controls.component';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AudioTimePipe } from './shared/pipes/audio-time.pipe';
import { HighlightDirective } from './shared/directives/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TextInputComponent,
    VoiceControlsComponent,
    AudioPlayerComponent,
    AudioTimePipe,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }