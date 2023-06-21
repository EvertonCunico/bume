package com.bume.core.security.service;

import com.bume.core.usuario.TipoAcesso;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface PermissoesAcesso {
    TipoAcesso[] perfis();
}