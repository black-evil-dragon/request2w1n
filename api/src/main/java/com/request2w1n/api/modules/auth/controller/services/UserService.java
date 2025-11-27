package com.request2w1n.api.modules.auth.controller.services;

import com.request2w1n.api.modules.auth.controller.model.UserEntity;
import com.request2w1n.api.modules.auth.controller.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;  //final переменная репозитория

    public UserService(UserRepository userRepository) {//внедрили зависимость через конструктор
        this.userRepository = userRepository;
    }

    //на вход принимает сущность и сохраняет ее в базу
    public void save(UserEntity userEntity){
        userRepository.save(userEntity); //реализовали метод внедренного бина
    }

    //возвращает лист всех сущностей из базы
    public List<UserEntity> getAll(){
        return userRepository.findAll(); //реализовали метод внедренного бина
    }

    public UserEntity findByEmail (String email){
        return userRepository.findByEmail(email);
    }
    public boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }
    public boolean findByPassword (String password){
        return userRepository.findByPassword(password);
    }
}