package com.request2w1n.api.api;

import lombok.Getter;

@Getter
public class ApiResponse<T> {
    // Геттеры/сеттеры
    private final boolean success;
    private final int code;
    private T data;
    private ErrorDetails error;
    // Конструкторы
    public ApiResponse(boolean success, int code, T data) {
        this.success = success;
        this.code = code;
        this.data = data;
    }

    public ApiResponse(boolean success, int code, ErrorDetails error) {
        this.success = success;
        this.code = code;
        this.error = error;
    }

    public ApiResponse(boolean success, int code, T data, ErrorDetails error) {
        this.success = success;
        this.code = code;
        this.data = data;
        this.error = error;
    }

}
