package com.bume.core.usuario.eventos;

import com.bume.core.crud_base.validations.AcaoCrud;
import com.bume.core.crud_base.validations.EventoPadrao;
import com.bume.core.usuario.Usuario;
import com.bume.core.util.Regex;
import com.bume.core.util.StringUtil;

import javax.enterprise.context.RequestScoped;
import java.util.Arrays;
import java.util.List;

@RequestScoped
public class ValoresPadraoEvent extends EventoPadrao<Usuario> {

    @Override
    public List<AcaoCrud> acoesExecutar() {
        return Arrays.asList(AcaoCrud.CREATE, AcaoCrud.UPDATE);
    }

    @Override
    public void executar(AcaoCrud acao, Usuario entity) throws Exception {
        retiraMascara(entity);
    }

    public void retiraMascara(Usuario entity) {
        entity.setLogin(entity.getLogin().replaceAll(Regex.SEM_ESPACO, ""));
        if (StringUtil.isNotEmpty(entity.getEmail()))
            entity.setEmail(entity.getEmail().replaceAll(Regex.SEM_ESPACO, ""));
        if (StringUtil.isNotEmpty(entity.getTelefoneCelular()))
            entity.setTelefoneCelular(entity.getTelefoneCelular().replaceAll(Regex.DIGITO_SEM_MASCARA, ""));
        if (StringUtil.isNotEmpty(entity.getCpf()))
            entity.setCpf(entity.getCpf().replaceAll(Regex.DIGITO_SEM_MASCARA, ""));
        if (StringUtil.isNotEmpty(entity.getRg()))
            entity.setCpf(entity.getCpf().replaceAll(Regex.DIGITO_SEM_MASCARA, ""));
    }
}
