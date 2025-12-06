package com.request2w1n.api.modules.routes.model;

import java.util.List;
import java.util.Random;

import jakarta.persistence.*;
import lombok.Setter;
import lombok.Getter;

@Entity
@Getter
@Setter
@Table(name = "routes")
public class RouteEntity {
    @Id
    private String id;

    @OneToMany(cascade = CascadeType.ALL)
    private List<RoutePoint> points;

    private Double totalDistance;
    private Integer pointsCount;
    private String status;

    @Transient // Не хранится в БД
    private static String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    @Transient // Не хранить в БД
    private static int order = 2;

    public RouteEntity() {
    }

    private Long getAvailableRouteCodesCount(int count){
        int charSetSize = chars.length();
        return (long) Math.pow(charSetSize, count);
    }

    private String generateShortId(long existingCount) {
        Random random = new Random();

        if (existingCount <= getAvailableRouteCodesCount(order)) {
            StringBuilder sb = new StringBuilder(order);
            for (int i = 0; i < order; i++) {
                sb.append(chars.charAt(random.nextInt(chars.length())));
            }
            return sb.toString();
        }
        else{
            order++;
            StringBuilder sb = new StringBuilder(order);
            for (int i = 0; i < order; i++) {
                sb.append(chars.charAt(random.nextInt(chars.length())));
            }
            return sb.toString();
        }
    }

    @PrePersist
    public void generateId(long existingCount) {
        if (this.id == null) {
            this.id = generateShortId(existingCount);
        }
    }

    // Перегруженный метод (на всякий случай)
    @PrePersist
    public void generateId() {
        if (this.id == null) {
            // По умолчанию считаем что маршрутов пока мало
            this.id = generateShortId(0);
        }
    }
}