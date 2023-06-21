package com.bume.core.usuario;

import com.bume.core.pesquisa_base_old.RequestPesquisa;
import com.bume.core.security.service.PermissoesAcesso;
import com.bume.core.usuario.dto.AlteracaoSenha;
import com.bume.core.usuario.dto.UsuarioDto;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/usuario")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UsuarioResource {
    @Inject
    UsuarioService service;
    @Inject
    UsuarioPesquisaService pesquisaService;

    @GET
    @PermissoesAcesso(perfis = { TipoAcesso.ADMIN_GERAL })
    public List<Usuario> listarTodos() throws Exception {
        return service.buscarTodos();
    }

    @GET
    @Path("{id}")
    public UsuarioDto buscarPorId(@PathParam("id") Long id) throws Exception {
        return service.buscarPorIdDto(id);
    }

    @POST
    @PermissoesAcesso(perfis = { TipoAcesso.ADMIN_GERAL })
    public Response novo(@Valid UsuarioDto dto) throws Exception {
        return Response.ok(service.novo(dto).getId()).build();
    }

    @PUT
    public Response alterar(@Valid UsuarioDto dto) throws Exception {
        return Response.ok(service.alterar(dto)).build();
    }

    @DELETE
    @Path("{id}")
    @PermissoesAcesso(perfis = { TipoAcesso.ADMIN_GERAL })
    public Response deletar(@PathParam("id") Long id) throws Exception {
        service.deletar(id);
        return Response.status(204).build();
    }

    @PUT
    @Path("/altera-senha")
    public Response alterarSenha(@Valid AlteracaoSenha alteracaoSenha) throws Exception {
        service.alterarSenhaUsuario(alteracaoSenha);
        return Response.ok("").build();
    }

    @POST
    @Path("/pesquisa")
    public Response pesquisa( RequestPesquisa requisicaoPesquisa )throws Exception {
        return Response.ok().entity(pesquisaService.listar(requisicaoPesquisa)).build();
    }
}
