package com.bume.core.usuario.dto;

import com.bume.core.queryMapper.CampoSQL;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioPesquisaDTO {

    @CampoSQL
    private Long id;

    @CampoSQL
    private String nome;

    @CampoSQL
    private String email;

    @CampoSQL
    private String cpf;

    @CampoSQL(name = "telefone_celular")
    private String telefoneCelular;

    @CampoSQL
    private String ativo;
}
