package com.request2w1n.api.modules.auth.controller;


import com.request2w1n.api.modules.auth.model.LoginRequest;
import com.request2w1n.api.modules.auth.model.UserEntity;
import com.request2w1n.api.modules.auth.repositories.UserRepository;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(@org.jetbrains.annotations.NotNull UserRepository userRepository) {
        this.userRepository = userRepository;

//тестовые данные (может быть понадобятся)
//        UserEntity testUser = new UserEntity("test@test.com", "123");
//        userRepository.save(testUser);
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

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequest request) {
// 2. Найти пользователя
        UserEntity foundUser = userRepository.findByEmail(request.getEmail());
// 3. Проверить пароль
        if (foundUser == null){
            return new ResponseEntity<> ("Пользователя с таким email не найдено", HttpStatusCode.valueOf(401));
        }
        else if (request.getPassword().equals(foundUser.getPassword())){
            return new ResponseEntity <>("Успешный вход", HttpStatusCode.valueOf(200));

        }
        else {
            return new ResponseEntity<> ("Неверный пароль!", HttpStatusCode.valueOf(401));
        }
// 4. Сгенерировать JWT
// 5. Вернуть токен
    }

    // POST для реальной регистрации (позже)
//    @GetMapping("/profile")
//    public ResponseEntity createUser() {
//    // 1. Получить JWT из заголовка
//    // 2. Проверить токен
//    // 3. Вернуть данные пользователя
//    }
}
