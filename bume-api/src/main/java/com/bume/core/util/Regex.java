package com.bume.core.util;

public class Regex {

    public final static String DIGITO_SEM_MASCARA = "[^0-9]";

    public final static String SEM_ESPACO = "\\s";

    public final static String SENHA_PADRAO_SISTEMA = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d!@#$%*()_+^&?]{5,16}$";

    private Regex() {
        throw new IllegalStateException("Utility class");
    }
}
