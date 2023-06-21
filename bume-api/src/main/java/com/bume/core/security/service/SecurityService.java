package com.bume.core.security.service;

import com.bume.core.security.jwt.Token;
import com.bume.core.usuario.Usuario;
import io.quarkus.security.UnauthorizedException;
import lombok.Getter;

import javax.enterprise.context.ApplicationScoped;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class SecurityService {

    public SecurityService() {
        tokenList = new ArrayList<>();
    }

    @Getter
    private static List<Token> tokenList;

    public static Token addToken(Usuario user, String token) {
        if (tokenList == null) tokenList = new ArrayList<>();
        Token tk = new Token(user, token, LocalDateTime.now().plusMinutes(60));
        tokenList.add(tk);
        return tk;
    }

    public static Token getToken(String token) {
        if (!isValidToken(token)) return null;

        return tokenList.stream()
                .filter(i -> i.getToken().equals(token) && LocalDateTime.now().isBefore(i.getExpiration()))
                .findAny().get();
    }

    public static boolean isValidToken(String token) {
        if (tokenList == null) return false;

        return tokenList.stream()
                .filter(i -> i.getToken().equals(token) && LocalDateTime.now().isBefore(i.getExpiration()))
                .findAny().isPresent();
    }

    public static void refreshToken(String token) {
        if (!isValidToken(token)) {
            throw new UnauthorizedException("Sessão inválida. Realize o seu login novamente.");
        }

        tokenList.stream().filter(i -> i.getToken().equals(token)).findFirst().get().setExpiration(LocalDateTime.now().plusMinutes(60));
    }
}