package com.request2w1n.api.modules.auth.model;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank(message = "Email не может быть пустым")
    @Email
    private String email;


    private String password;
    public LoginRequest() {}

    // Конструктор с параметрами (может быть потом уберем)
    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}