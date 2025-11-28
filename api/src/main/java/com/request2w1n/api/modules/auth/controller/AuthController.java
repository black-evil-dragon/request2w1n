package com.request2w1n.api.modules.auth.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
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
            return new ResponseEntity<>("Ошибка: пользователь уже существует", HttpStatusCode.valueOf(409));
        }
        else {
            userRepository.save(user);
            return new ResponseEntity<>("Новый пользователь успешно добавлен", HttpStatusCode.valueOf(200));
        }
    }

    //Здесь еще надо обработать исключения
    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody LoginRequest request) throws NoSuchAlgorithmException, InvalidKeyException {
// 2. Найти пользователя
        UserEntity foundUser = userRepository.findByEmail(request.getEmail());
// 3. Проверить пароль
        if (foundUser == null){
            return new ResponseEntity<> ("Пользователя с таким email не найдено", HttpStatusCode.valueOf(401));
        }
        else if (request.getPassword().equals(foundUser.getPassword())){
            JWTUtil jwtUtil = new JWTUtil();
            String token = jwtUtil.generateToken(foundUser);
            return new ResponseEntity <>(token, HttpStatusCode.valueOf(200));

        }
        else {
            return new ResponseEntity<> ("Неверный пароль!", HttpStatusCode.valueOf(401));
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
            return new ResponseEntity<> ("Неверный токен", HttpStatusCode.valueOf(400));
        }

    //    3. Вернуть данные пользователя
        String email = jwtUtil.getEmailFromToken(token);
        UserEntity user = userRepository.findByEmail(email);
        return new ResponseEntity<>(user, HttpStatusCode.valueOf(200));
    }
}
