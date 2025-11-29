package com.request2w1n.api.modules.auth.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.request2w1n.api.api.ApiResponse;
import com.request2w1n.api.api.ErrorDetails;
import com.request2w1n.api.modules.auth.model.LoginRequest;
import com.request2w1n.api.modules.auth.model.UserEntity;
import com.request2w1n.api.modules.auth.repositories.UserRepository;
import com.request2w1n.api.utils.JWTUtil;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(@org.jetbrains.annotations.NotNull UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody UserEntity user) {

        if (userRepository.existsByEmail(user.getEmail())){
            String data = "Ошибка: пользователь уже существует";
            ApiResponse<String> response = new ApiResponse<>(
                    true,
                    409,
                    data
            );
            return new ResponseEntity<>(response, HttpStatusCode.valueOf(409));
        }
        else {
            userRepository.save(user);
            String data = "Новый пользователь успешно добавлен";
            ApiResponse<String> response = new ApiResponse<>(
                    true,
                    200,
                    data
            );
            return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
        }
    }

    //Здесь еще надо обработать исключения
    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody LoginRequest request) throws NoSuchAlgorithmException, InvalidKeyException {
// 2. Найти пользователя
        UserEntity foundUser = userRepository.findByEmail(request.getEmail());
// 3. Проверить пароль
        if (foundUser == null){
            ApiResponse<ErrorDetails> response = new ApiResponse<>(
                false,
                401,
                new ErrorDetails(
                        "Пользователя с таким логином не существует",
                        Map.of(
                                "login", "Не существует",
                                "type", "danger"
                        )
                )
            );
            return new ResponseEntity<> (response, HttpStatusCode.valueOf(401));
        }

        else if (request.getPassword().equals(foundUser.getPassword())){
            JWTUtil jwtUtil = new JWTUtil();
            String token = jwtUtil.generateToken(foundUser);
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", foundUser.getId());
            userData.put("login", foundUser.getEmail());
            ApiResponse<Map<String, Object>> response = new ApiResponse<>(
                    true,
                    200,
                    userData
                    );
            return ResponseEntity.ok()
                    .header("Authorization", "Bearer " + token)
                    .body(response);

        }

        else {
            ApiResponse<ErrorDetails> response = new ApiResponse<>(
                    false,
                    401,
                    new ErrorDetails(
                            "Неверный пароль",
                            Map.of(
                                    "login", "Неверный пароль",
                                    "type", "danger"
                            )
                    )
            );
            return new ResponseEntity<> (response, HttpStatusCode.valueOf(401));
        }

    }

    // POST для реальной регистрации
    @GetMapping("/profile")
    public ResponseEntity createUser(@RequestHeader("Authorization") String authHeader) throws NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {
    //    1. Получить JWT из заголовка
        String token = authHeader.replace("Bearer ", "");
        JWTUtil jwtUtil = new JWTUtil();
    //    2. Проверить токен
        if (!jwtUtil.validateToken(token)){
            ApiResponse<ErrorDetails> response = new ApiResponse<>(
                    false,
                    400,
                    new ErrorDetails(
                            "Неверный токен",
                            Map.of(
                                    "login", "Неверный токен",
                                    "type", "danger"
                            )
                    )
            );
            return new ResponseEntity<> (response, HttpStatusCode.valueOf(400));
        }

    //    3. Вернуть данные пользователя
        String email = jwtUtil.getEmailFromToken(token);
        UserEntity user = userRepository.findByEmail(email);
        Map<String, Object> safeUserData = Map.of(
                "id", user.getId(),
                "email", user.getEmail()
        );
        ApiResponse<Map<String, Object>> response = new ApiResponse<>(
          true,
          200,
          safeUserData
        );
        return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
    }
}
