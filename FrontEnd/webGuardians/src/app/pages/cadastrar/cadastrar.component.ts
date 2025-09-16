import { Component, OnInit, Input , Output, EventEmitter} from '@angular/core';
import { ReactiveFormsModule ,FormGroup, FormControl, Validators} from '@angular/forms';
import { UsuarioCadastroDto } from '../../models/usuarioCadastroDto';

@Component({
  selector: 'app-cadastrar',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent implements OnInit{
@Input() btnAcao!:string;
@Input() descTitulo!:string;
@Input() dadosUsuario: UsuarioCadastroDto | null = null;
@Output() onSubmit = new EventEmitter();


  logotipo: string = "logotipo-removebg-preview.png"

  
  usuarioForm!: FormGroup;
  ngOnInit(): void{ // Inicializa um formulário reativo
    
    this.usuarioForm = new FormGroup({ // inicia o meu formulario
    usuario: new FormControl(this.dadosUsuario?.usuario ?? '',[Validators.required]),
    nome: new FormControl(this.dadosUsuario?.nome?? '',[Validators.required]),
    sobrenome: new FormControl(this.dadosUsuario?.nome??'',[Validators.required]),
    email: new FormControl(this.dadosUsuario?.email??'', [Validators.required, Validators.email]),
    senha: new FormControl(this.dadosUsuario?.senha??'', [Validators.required]),
    confirmSenha: new FormControl(this.dadosUsuario?.confirmaSenha??'',[Validators.required])
  });

  }

  submit(): void{
    if(this.usuarioForm.valid){
      this.onSubmit.emit(this.usuarioForm.value as UsuarioCadastroDto)
    }
  }
  
}
