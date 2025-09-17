
import { Component, OnInit, Input , Output, EventEmitter} from '@angular/core';
import { ReactiveFormsModule ,FormGroup, FormControl, Validators} from '@angular/forms';
import { UsuarioCadastroDto } from '../../models/UsuarioCadastroDto';
import { FormularioComponent } from '../../componentes/formulario/formulario.component';

@Component({
  selector: 'app-cadastrar',
  imports: [ReactiveFormsModule, FormularioComponent],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent {
  btnAcao = "Cadastrar";
  descTitulo = "Cadastrar Usuário";

  // constructor(private autenticacaoService: AutenticacaoService, private router)
  //   criarUsuario(usuario: UsuarioCadastroDto){
  //     this.autenticacaoService.RegistrarUsuario(usuario).subscribe(response =>{

  //       fi
  //     })
  //   }


  
  
}
