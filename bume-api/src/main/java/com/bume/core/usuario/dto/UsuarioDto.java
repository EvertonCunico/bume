package com.bume.core.usuario.dto;

import com.bume.core.usuario.TipoAcesso;
import com.bume.core.usuario.Usuario;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDto  {

    public UsuarioDto(Usuario usuario) {
        this.setId(usuario.getId());
        this.setNome(usuario.getNome());
        this.setLogin(usuario.getLogin());
        this.setEmail(usuario.getEmail());
        this.setCpf(usuario.getCpf());
        this.setTelefoneCelular(usuario.getTelefoneCelular());
        this.setDataNascimento(usuario.getDataNascimento());
        this.setAtivo(usuario.getAtivo());
        this.setTipoAcesso(usuario.getTipoAcesso());
    }

    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 3, max = 255, message = "Nome deve conter entre 3 a 255 caracteres")
    private String nome;

    @NotBlank(message = "Login é obrigatório")
    @Size(min = 3, max = 255, message = "Login deve conter entre 3 e 255 caracteres")
    private String login;

    @NotBlank(message = "E-mail é obrigatório")
    @Email(message = "E-mail inválido")
    private String email;

    @NotNull(message = "CPF é obrigatório")
    private String cpf;

    @NotBlank(message = "Telefone não pode estar em branco")
    private String telefoneCelular;

    private LocalDate dataNascimento;
    @NotNull(message = "Ativo é obrigatória")
    private Boolean ativo;
    private TipoAcesso tipoAcesso;

    public Usuario mapToUsuario(UsuarioDto dto) {
        Usuario u = new Usuario();
        u.setNome(dto.getNome());
        u.setLogin(dto.getLogin());
        u.setEmail(dto.getEmail());
        u.setCpf(dto.getCpf());
        u.setTelefoneCelular(dto.getTelefoneCelular());
        u.setDataNascimento(dto.getDataNascimento());
        u.setAtivo(dto.getAtivo());
        u.setTipoAcesso(dto.getTipoAcesso());
        return u;
    }
}