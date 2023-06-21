package com.bume.core.crud_base.validations;

import java.util.Collections;
import java.util.List;

public class EventoPadrao<T> implements IEvento<T> {

    @Override
    public List<AcaoCrud> acoesExecutar() {
        return Collections.emptyList();
    }

    @Override
    public void executar(AcaoCrud acao, T entity) throws Exception {
        //Não implementado
    }
}
