package com.bume.core.crud_base.validations;

import java.util.Collections;
import java.util.List;

public class ValidacaoPadrao<T> implements IValidacao<T> {

    @Override
    public List<AcaoCrud> acoesValidar() {
        return Collections.emptyList();
    }

    @Override
    public void validar(AcaoCrud acao, T entity) throws Exception {
        //Não implementado
    }
}
