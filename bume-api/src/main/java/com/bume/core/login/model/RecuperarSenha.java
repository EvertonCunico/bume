package com.bume.core.login.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecuperarSenha {

    @NotNull(message = "CPF é obrigatório")
    private String cpf;

    @NotNull(message = "E-mail é obrigatório")
    private String email;

    @NotNull(message = "Data nascimento é obrigatório")
    private Date dataNascimento;
}