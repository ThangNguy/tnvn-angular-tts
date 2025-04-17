import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextInputComponent } from './components/text-input/text-input.component';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';

const routes: Routes = [
  { path: '', redirectTo: '/text-input', pathMatch: 'full' },
  { path: 'text-input', component: TextInputComponent },
  { path: 'audio-player', component: AudioPlayerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }