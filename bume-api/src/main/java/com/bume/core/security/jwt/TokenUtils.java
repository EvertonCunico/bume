package com.bume.core.security.jwt;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Base64;
import java.util.Date;
public class TokenUtils {
	private static final String PUBLIC_KEY_FILE = "src/main/resources/publicKey.pem";
	private static final String PRIVATE_KEY_FILE = "src/main/resources/privateKey.pem";
	private static final long TOKEN_EXPIRATION_TIME = 60 * 60 * 1000; // 60 minutes in milliseconds

	public static String generateToken() throws Exception {
		PublicKey publicKey = readPublicKey();
		PrivateKey privateKey = readPrivateKey();

		LocalDateTime currentTime = LocalDateTime.now();
		LocalDateTime expirationTime = currentTime.plusMinutes(TOKEN_EXPIRATION_TIME);

		JwtBuilder jwtBuilder = Jwts.builder()
				.setIssuedAt(Date.from(currentTime.atZone(ZoneId.systemDefault()).toInstant()))
				.setExpiration(Date.from(expirationTime.atZone(ZoneId.systemDefault()).toInstant()))
				.signWith(privateKey, SignatureAlgorithm.RS256);

		return jwtBuilder.compact();
	}

	public static PrivateKey readPrivateKey() throws Exception {
		byte[] tmp = Files.readAllBytes(Paths.get(PUBLIC_KEY_FILE));
		return decodePrivateKey(new String(tmp, 0, tmp.length, StandardCharsets.UTF_8));
	}

	public static PublicKey readPublicKey() throws Exception {
		InputStream contentIS = TokenUtils.class.getResourceAsStream("/publicKey.pem");
		byte[] tmp = new byte[4096];
		int length = contentIS.read(tmp);
		return decodePublicKey(new String(tmp, 0, length, StandardCharsets.UTF_8));
	}

	public static PrivateKey decodePrivateKey(final String pemEncoded) throws Exception {
		byte[] encodedBytes = toEncodedBytes(pemEncoded);

		PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(encodedBytes);
		KeyFactory kf = KeyFactory.getInstance("RSA");
		return kf.generatePrivate(keySpec);
	}

	public static PublicKey decodePublicKey(String pemEncoded) throws Exception {
		byte[] encodedBytes = toEncodedBytes(pemEncoded);

		X509EncodedKeySpec spec = new X509EncodedKeySpec(encodedBytes);
		KeyFactory kf = KeyFactory.getInstance("RSA");
		return kf.generatePublic(spec);
	}

	private static byte[] toEncodedBytes(final String pemEncoded) {
		final String normalizedPem = removeBeginEnd(pemEncoded);
		return Base64.getDecoder().decode(normalizedPem);
	}
	private static String removeBeginEnd(String pem) {
		pem = pem.replaceAll("-----BEGIN (.*)-----", "");
		pem = pem.replaceAll("-----END (.*)----", "");
		pem = pem.replaceAll("\r\n", "");
		pem = pem.replaceAll("\n", "");
		return pem.trim();
	}
}