package com.bume.core.login.model;

import com.bume.core.usuario.dto.UsuarioDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginInfo {
    private UsuarioDto usuario;
    private String token;

}