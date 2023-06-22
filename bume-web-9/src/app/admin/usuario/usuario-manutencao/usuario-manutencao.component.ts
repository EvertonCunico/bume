import { Component, Injector, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { ManutencaoViewBase } from "@boom/ui/views/manutencao-view-base";

import { Usuario } from "app/modelos/usuario";
import { UsuarioCRUDService } from "app/services/usuario-crud.service";

import { cpf } from "cpf-cnpj-validator";
import { MessageService } from "primeng/api";
import { AlteracaoSenhaAdmin } from "../../../modelos/alteracao_senha_admin";

export function verificarCPFValido(
  control: AbstractControl
): { [key: string]: any } | null {
  if (control.value == null) {
    return null;
  }
  const cpfSemMascara = control.value.replace(/\D/g, "");
  const cpfValido = cpf.isValid(cpfSemMascara);
  if (!cpfValido) {
    return { invalidCPF: { value: control.value } };
  }
  return null;
}

@Component({
  selector: "app-usuario-manutencao",
  templateUrl: "./usuario-manutencao.component.html",
  styleUrls: ["./usuario-manutencao.component.css"],
  providers: [],
})
export class UsuarioManutencaoComponent
  extends ManutencaoViewBase<Usuario>
  implements OnInit
{
  idUsuario: any = null;

  situacoes = [
    { label: "Sim", value: true },
    { label: "Não", value: false },
  ];

  permissoes = [
    { value: "RH_EMPRESA", label: "RH da Empresa", checked: false },
    { value: "ADMIN_EMPRESA", label: "Administrador Empresa", checked: false },
    { value: "ADMIN_GERAL", label: "Administrador Geral", checked: false },
  ];

  formAlterarSenha: FormGroup;

  constructor(
    protected injector: Injector,
    public userCRUDService: UsuarioCRUDService,
    private messageService: MessageService
  ) {
    super(injector, userCRUDService);
    this.titulo = "Cadastros / Usuário";
    this.form = this.formBuilder.group({
      nome: ["", [Validators.required, Validators.maxLength(100)]],
      email: [
        "",
        [Validators.required, Validators.maxLength(100), Validators.email],
      ],
      login: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      senha: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      cpf: [
        "",
        [
          verificarCPFValido,
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(15),
        ],
      ],
      telefoneCelular: [
        "",
        [Validators.minLength(10), Validators.maxLength(15)],
      ],
      dataNascimento: [
        new Date(),
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
        ],
      ],
      ativo: [true, [Validators.required]],
      tipoAcesso: ["RH_EMPRESA", Validators.required],
    });
    this.formAlterarSenha = this.formBuilder.group({
      idUsuario: [null, [Validators.required]],
      senha: [null, [Validators.required]],
    });
  }

  validarSenha() {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%*()_+^&?]{5,16}$/;
    const senha = this.formAlterarSenha.get("senha").value;
    if (senha !== null) {
      if (regex.test(senha)) {
        this.alterarSenha(senha);
      } else {
        this.messageService.add({
          severity: "warn",
          summary: "Atenção!!",
          detail:
            "A senha deve ter pelo menos 5 e no máximo 16 caracteres, incluindo pelo menos um dígito, uma letra minúscula e uma letra maiúscula.",
          life: 6000,
        });
      }
    } else {
      this.messageService.add({
        severity: "warn",
        summary: "Campo vazio!",
        detail: "Verifique os campos.",
      });
    }
  }

  alterarSenha(senha) {
    this.userCRUDService
      .alterarSenhaAdmin(new AlteracaoSenhaAdmin(this.idUsuario, senha))
      .subscribe(
        () => {
          this.messageService.add({
            severity: "success",
            summary: "Senha alterada com sucesso!",
            detail: "Senha alterada com sucesso",
          });
          this.formAlterarSenha.get("senhaAtual").setValue(null);
          this.formAlterarSenha.get("senhaNova").setValue(null);
          this.formAlterarSenha.get("senhaConfirmacao").setValue(null);
        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Erro em alterar senha!",
            detail: error.error,
          });
        }
      );
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.idUsuario = this.route.snapshot.paramMap.get("id");
    if (this.idUsuario) {
      this.form.get('senha').setValidators(null);
    }
  }
}
