package com.bume.core.security;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordUtil {

    public static String encryptPassword(String password) {
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
        return hashedPassword;
    }

    public static boolean verifyPassword(String password, String hashedPassword) {
        return BCrypt.checkpw(password, hashedPassword);
    }

    public static void main(String[] args) {
        String password = "123";

        // Criptografa a senha
        String hashedPassword = encryptPassword(password);
        System.out.println("Hashed Password: " + hashedPassword);

        // Verifica se a senha fornecida coincide com a senha criptografada
        boolean isMatch = verifyPassword(password, hashedPassword);
        System.out.println("Password Match: " + isMatch);
    }
}
