package com.bume.core.usuario.eventos;

import com.bume.core.crud_base.validations.AcaoCrud;
import com.bume.core.crud_base.validations.EventoPadrao;
import com.bume.core.security.PasswordUtil;
import com.bume.core.usuario.Usuario;
import com.bume.core.util.StringUtil;

import javax.enterprise.context.RequestScoped;
import java.util.Arrays;
import java.util.List;

@RequestScoped
public class CriptografarSenhaEvent extends EventoPadrao<Usuario> {

    @Override
    public List<AcaoCrud> acoesExecutar() {
        return Arrays.asList(AcaoCrud.CREATE);
    }

    @Override
    public void executar(AcaoCrud acao, Usuario entity) throws Exception {
        if (StringUtil.isNotEmpty(entity.getSenha())) {
            entity.setSenha(PasswordUtil.encryptPassword(entity.getSenha()));
        }
    }
}
