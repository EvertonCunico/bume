package com.bume.core.usuario.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlteracaoSenha {
    @NotBlank(message = "Login não pode estar em branco")
    private String login;

    @NotBlank(message = "Senha Atual não pode estar em branco")
    private String senhaAtual;

    @NotBlank(message = "Senha Nova não pode estar em branco")
    private String senhaNova;

    @NotBlank(message = "Senha Confirmação não pode estar em branco")
    private String senhaConfirmacao;
}