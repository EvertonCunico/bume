package com.bume.core.usuario;

import com.bume.core.crud_base.ServiceBase;
import com.bume.core.crud_base.validations.AcaoCrud;
import com.bume.core.crud_base.validations.EventoPadrao;
import com.bume.core.crud_base.validations.ValidacaoPadrao;
import com.bume.core.exceptions.ValidacaoException;
import com.bume.core.security.PasswordUtil;
import com.bume.core.security.service.Logado;
import com.bume.core.usuario.dto.AlteracaoSenha;
import com.bume.core.usuario.dto.UsuarioDto;
import com.bume.core.usuario.eventos.CriptografarSenhaEvent;
import com.bume.core.usuario.eventos.ValoresPadraoEvent;
import com.bume.core.usuario.validacoes.ValidaDuplicidadeUsuario;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;

@RequestScoped
public class UsuarioService implements ServiceBase<Usuario, Long>, PanacheRepositoryBase<Usuario, Long> {
	@Inject
	EntityManager em;
	@Inject
	Logado logado;

	@Inject CriptografarSenhaEvent criptografarSenhaEvent;
	@Inject ValoresPadraoEvent valoresPadraoEvent;
	@Inject ValidaDuplicidadeUsuario validaDuplicidadeUsuario;

	@Override
	public List<Class<? extends EventoPadrao<Usuario>>> eventosExecutarAntes() {
		return List.of(CriptografarSenhaEvent.class);
	}

	@Override
	public List<Class<? extends EventoPadrao<Usuario>>> eventosExecutarDepois() {
		return Collections.emptyList();
	}

	@Override
	public List<Class<? extends ValidacaoPadrao<Usuario>>> validacoes() {
		return List.of(ValidaDuplicidadeUsuario.class);
	}

	public UsuarioDto novo(UsuarioDto dto) throws Exception {
		var u = dto.mapToUsuario(dto);
		var usuarioDto = new UsuarioDto(this.novo(u));
		return usuarioDto;
	}

	@Transactional
	public Usuario novo(Usuario usuario) throws Exception {
		this.preOperacao(AcaoCrud.CREATE, usuario);
		em.persist(usuario);
		this.posOperacao(AcaoCrud.CREATE, usuario);
		return usuario;
	}

	public UsuarioDto alterar(UsuarioDto dto) throws Exception {
		Usuario u = Usuario.findById(dto.getId());
		u.setId(dto.getId());
		u.setNome(dto.getNome());
		u.setLogin(dto.getLogin());
		u.setEmail(dto.getEmail());
		u.setCpf(dto.getCpf());
		u.setTelefoneCelular(dto.getTelefoneCelular());
		u.setDataNascimento(dto.getDataNascimento());
		u.setAtivo(dto.getAtivo());
		u.setTipoAcesso(dto.getTipoAcesso());
		var usuarioDto = new UsuarioDto(this.alterar(u));
		return usuarioDto;
	}

	@Transactional
	public Usuario alterar(Usuario usuario) throws Exception {
		this.preOperacao(AcaoCrud.UPDATE, usuario);
		em.merge(usuario);
		this.posOperacao(AcaoCrud.UPDATE, usuario);
		return usuario;
	}

	@Transactional
	public void deletar(Long id) throws Exception {
		Usuario usuario = Usuario.findById(id);
		preOperacao(AcaoCrud.DELETE, usuario);
		usuario.delete();
		posOperacao(AcaoCrud.DELETE, usuario);
	}

	@Override
	public Usuario buscarPorId(Long id) throws Exception {
		return Usuario.findById(id);
	}

	public UsuarioDto buscarPorIdDto(Long id) throws Exception {
		return new UsuarioDto(Usuario.findById(id));
	}

	public List<Usuario> buscarTodos() throws Exception {
		return Usuario.listAll();
	}

	public void alterarSenhaUsuario(AlteracaoSenha alteracaoSenha) throws Exception {
		var usuario = Usuario.findByLoginAndAtivo(alteracaoSenha.getLogin());
		if (usuario == null) throw ValidacaoException.builder().status(404).mensagem("Usuário não encontrado.").build();
		if (!PasswordUtil.verifyPassword(alteracaoSenha.getSenhaAtual(), usuario.getSenha())) throw ValidacaoException.builder().status(400).mensagem("Senha atual não confere.").build();
		if (!alteracaoSenha.getSenhaNova().equals(alteracaoSenha.getSenhaConfirmacao())) throw ValidacaoException.builder().status(400).mensagem("A senha de confirmação não coincide com a nova senha.").build();
		usuario.setSenha(PasswordUtil.encryptPassword(alteracaoSenha.getSenhaNova()));
		alterar(usuario);
	}
}