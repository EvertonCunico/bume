package com.bume.core.login.model;

import lombok.*;

import javax.validation.constraints.NotNull;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginArgs {
    @NotNull(message = "Login é obrigatório")
    private String login;
    @NotNull(message = "Senha é obrigatório")
    private String senha;
}