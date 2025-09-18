import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule , FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import { UsuarioCadastroDto } from '../../models/UsuarioCadastroDto';
import { UsuarioEdicaoDto } from '../../models/UsuarioEdicaoDto';
import {  NgClass, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
    selector:'app-formulario',
    imports: [ReactiveFormsModule, FormsModule, RouterModule, NgClass],
    templateUrl: './formulario.component.html',
    styleUrl: './formulario.component.css'
})

export class FormularioComponent implements OnInit{

    //Importando imagem
    logotipo: string = 'logotipo-removebg-preview.png';

    // Decoradores são como tags, que definem como o typeScript deve trata-las
    // Input permite que um componente receba dados de seu componente pai
    // funciona como uma porta de entrada para as informações
    @Input() btnAcao!:string; // é o nome da propriedade que o componente está expondo
    @Input() descTitulo!: string;
    @Input() dadosUsuario: UsuarioCadastroDto | UsuarioEdicaoDto | null = null;
    // Permite que ele receba diferentes tipos de objetos
    @Output() onSubmit = new EventEmitter();
    // Cria uma "porta de saída " para o componente filho enviar para o componente pai

    usuarioForm!: FormGroup;

    ngOnInit(): void {
        const isCadastro = this.btnAcao === 'Cadastrar';

        //mapeando valores recebidos
        this.usuarioForm = new FormGroup({
            // Validação de id: primeiro verifica se existe um objeto, depois acessa o objeto e verifica
            // se existe a propriedade id, se passar no teste ele procura pelo id,
            // se não id recebe 0 e irá retornar undefined para o usuário, mas não irá quebrar o código
            id: new FormControl(this.dadosUsuario && 'id' in this.dadosUsuario ? this.dadosUsuario.id: 0),
            usuario: new FormControl(this.dadosUsuario?.usuario ?? '', [Validators.required]),
            nome: new FormControl(this.dadosUsuario?.nome ?? '', [Validators.required]),
            // Verificação de nome: Primeiro verifica se existe um objeto "dadosUsuario", se 
            // sim, o javaScript verifica implicitamente se a propriedade nome existe, se passar
            // no teste, nome recebe uma string vazia, e faz validação automática para verificar 
            // se o campo está vazio, se sim ele retorna uma mensagem para o usuário, dessa forma
            // o código não quebra
            sobrenome: new FormControl(this.dadosUsuario?.sobrenome??'', [Validators.required]),
            email: new FormControl(this.dadosUsuario?.email ?? '', [Validators.required, Validators.email]),
            // Pense em FormGroup como todos os inputs de um formulário e em FormControl como os inputs 
            sehna: new FormControl(this.dadosUsuario && 'senha' in this.dadosUsuario ? this.dadosUsuario.senha : '',
                isCadastro ? [Validators.required] : []),
            // Verificação de senha: Primeiro verifica se existe um objeto "dadosUsuario", depois verifica se 
            // a propriedade senha existe, se passar no teste ele recebe "this.dadosUsuario", ou seja, 
            // o input que acabamos de receber, se não passar no teste ele recebe uma string vazia, dessa forma
            // evitando do código quebrar, depois ele verifica a variável "isCadastro", se esse formulário estiver
            // sendo usado para realizar um cadastro, ele cria um array de validadores para definir a obrigatoriedade
            // da senha, se não ele retorna um array vazio, definindo o campo senha opcional para realizar a edição
            confirmarSenha: new FormControl(this.dadosUsuario && 'confirmaSenha' in this.dadosUsuario ? this.dadosUsuario.confirmaSenha : '',
                isCadastro ? [Validators.required] : [])
        },{validators:passwordMatchValidator})
    }

    submit(): void {
        if(this.usuarioForm.valid){
            // se for verdadeiro ele verifica se é do tipo cadastro ou edição, e se ele possui id
            if(this.dadosUsuario && (this.dadosUsuario as UsuarioEdicaoDto).id){
                this.onSubmit.emit(this.usuarioForm.value as UsuarioEdicaoDto)
            }
            else{
                this.onSubmit.emit(this.usuarioForm.value as UsuarioCadastroDto)
            }
        }
        // se não ele gera um erro de campos vazios para o usuário
        else{
            this.usuarioForm.markAllAsTouched();
        }
    }
}

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const senha = control.get('senha');
  const confirmaSenha = control.get('confirmaSenha');

  // Retorna nulo se os campos estiverem vazios
  if(!senha || !confirmaSenha){
    return null;
  }
  // Verifica se os campos estão vazios
  if(senha.value !== confirmaSenha.value){
    confirmaSenha.setErrors({'naoCoincidem': true});
    return {'senhasNaoCoincidem': true};
  }
  else{
    // remove os erros se eles forem iguais
    confirmaSenha.setErrors(null);
    return null;
  }
}