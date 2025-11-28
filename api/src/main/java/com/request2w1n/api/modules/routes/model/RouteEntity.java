package com.request2w1n.api.modules.routes.model;

import java.util.List;

import jakarta.persistence.*;
import lombok.Setter;
import lombok.Getter;

@Entity
@Setter
@Getter
@Table(name = "routes")
public class RouteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    private List<RoutePoint> points;

    private Double totalDistance;
    private Integer pointsCount;
    private String status;

    RouteResponse toRouteResponse(){ // преобразование для API (надо ли)

    }
}
