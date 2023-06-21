package com.bume.core.exceptions;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ValidacaoException extends Exception {

    private int status;

    private String mensagem;

}
