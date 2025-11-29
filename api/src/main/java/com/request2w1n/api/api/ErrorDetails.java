package com.request2w1n.api.api;

import lombok.Getter;

import java.util.Map;

@Getter
public class ErrorDetails {
    private final String text;
    private Map<String, String> fields;

    // Конструкторы
    public ErrorDetails(String text) {
        this.text = text;
    }

    public ErrorDetails(String text, Map<String, String> fields) {
        this.text = text;
        this.fields = fields;
    }

}
