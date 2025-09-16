import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CadastrarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'webGuardians';
}
