package com.bume.core.security.jwt;

import com.bume.core.usuario.Usuario;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Token {
    private Usuario user;
    private String token;
    private LocalDateTime expiration;
}