package com.request2w1n.api.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.request2w1n.api.modules.auth.model.UserEntity;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.nio.charset.StandardCharsets;
// user agent
public class JWTUtil {
    private static final String SECRET_KEY = "PhEw8_23h755_hihShF_";
    private static final String HMAC_SHA256_ALGORITHM = "HmacSHA256";
    // Секретный ключ
    private static final long EXPIRATION_TIME = 86400000;

    String header = "{\"alg\":\"HS256\",\"typ\":\"JWT\"}";

    private static final ObjectMapper mapper = new ObjectMapper();

    private byte[] generateHMACSHA256(String data) throws NoSuchAlgorithmException, InvalidKeyException {

        SecretKeySpec secretKeySpec = new SecretKeySpec(JWTUtil.SECRET_KEY.getBytes(StandardCharsets.UTF_8), HMAC_SHA256_ALGORITHM);

        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(secretKeySpec);

        return mac.doFinal(data.getBytes());
    }

    // 1. generateToken(UserEntity user) - создать JWT
    public String generateToken(UserEntity user) throws NoSuchAlgorithmException, InvalidKeyException {

        byte[] bytesToEncodeHead = header.getBytes();
        Base64.Encoder urlEncoder = Base64.getUrlEncoder().withoutPadding();
        String encodeStringHead = urlEncoder.encodeToString(bytesToEncodeHead);

        String payload = "{\"email\":\"" + user.getEmail() +
                "\",\"userId\":" + user.getId() +
                ",\"exp\":" + (System.currentTimeMillis() + EXPIRATION_TIME) + "}";

        byte[] bytesToEncodePayload = payload.getBytes();
        String encodeStringPayload = urlEncoder.encodeToString(bytesToEncodePayload);

        String data = encodeStringHead + "." + encodeStringPayload;
        byte[] signature = generateHMACSHA256(data);
        String encodedSignature = urlEncoder.encodeToString(signature);


        return encodeStringHead + "." + encodeStringPayload + "." + encodedSignature;
    }

    // 2. validateToken(String token) - проверить валидность
    public boolean validateToken(String token) throws NoSuchAlgorithmException, InvalidKeyException {
        String[] partsToken = token.split("\\.");
        try {
            Base64.Decoder decoder = Base64.getDecoder();
            // Попытка декодирования строки
            for (String s : partsToken) decoder.decode(s);
        } catch (IllegalArgumentException e) {
            // Если декодирование не удалось, какая-то из строк не валидна
            return false;
        }

        String data = partsToken[0] + "." + partsToken[1];
        byte[] signature = generateHMACSHA256(data);
        Base64.Encoder urlEncoder = Base64.getUrlEncoder().withoutPadding();
        String encodedSignature = urlEncoder.encodeToString(signature);

        return encodedSignature.equals(partsToken[2]);
    }
    // 3. getEmailFromToken(String token) - получить email
    public String getEmailFromToken(String token) throws JsonProcessingException {
        String[] partsToken = token.split("\\.");
        String encodedPayload = partsToken[1];
        Base64.Decoder decoder = Base64.getDecoder();
        byte[] payloadBytes = decoder.decode(encodedPayload);
        String payloadJson = new String(payloadBytes, StandardCharsets.UTF_8);
        JsonNode node = mapper.readTree(payloadJson);
        return node.get("email").asText();
    }
    // 4. isTokenExpired(String token) - проверить expiration
    public boolean isTokenExpired(String token) throws JsonProcessingException {
        String[] partsToken = token.split("\\.");
        String encodedPayload = partsToken[1];
        Base64.Decoder decoder = Base64.getDecoder();
        byte[] payloadBytes = decoder.decode(encodedPayload);
        String payloadJson = new String(payloadBytes, StandardCharsets.UTF_8);
        JsonNode node = mapper.readTree(payloadJson);
        return System.currentTimeMillis() > node.get("exp").asLong();
    }
}
