package com.request2w1n.api.echo.controller;



import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;


@RestController
@RequestMapping("/api/echo")
public class EchoController {
    @GetMapping("/hello")
    public ResponseEntity<@NonNull String> hello() {
        return new ResponseEntity<>("Hello", HttpStatusCode.valueOf(200));
    }
}
