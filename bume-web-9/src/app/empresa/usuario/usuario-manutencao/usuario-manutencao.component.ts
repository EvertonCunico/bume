import { Component, Injector, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";

import { Coluna } from "@boom/modelos/coluna";
import { ManutencaoViewBase } from "@boom/ui/views/manutencao-view-base";

import { cpf } from "cpf-cnpj-validator";

import { Usuario } from "app/modelos/usuario";
import { UsuarioCRUDService } from "app/services/usuario-crud.service";

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

  cpfValido = true;

  situacoes = [
    { label: "Sim", value: "S" },
    { label: "Não", value: "N" },
  ];

  permissoes = [
    { value: "RH_EMPRESA", label: "RH da Empresa", checked: false },
    { value: "ADMIN_EMPRESA", label: "Administrador Empresa", checked: false },
    { value: "ADMIN_GERAL", label: "Administrador Geral", checked: false },
  ];

  constructor(
    protected injector: Injector,
    public userCRUDService: UsuarioCRUDService
  ) {
    super(injector, userCRUDService);
    this.titulo = "Usuário";
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
      cpf: [
        "",
        [
          this.verificarCPFValido,
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
      ativo: ["S", [Validators.required]],
      tipoAcesso: ["", Validators.required],
    });
  }

  verificarCPFValido(cpfValor: string) {
    const cpfSemMascara = cpfValor.replace(/\D/g, "");
    this.cpfValido = cpf.isValid(cpfSemMascara);
    if (!this.cpfValido) {
      this.form.get("cpf").setValue(null);
    }
  }

  ngOnInit(): void {
    this.form.get("dataInclusao").disable();
    this.form.get("dataAlteracao").disable();
    super.ngOnInit();
  }
}
