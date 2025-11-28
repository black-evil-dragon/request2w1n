package com.request2w1n.api.modules.routes.model;


import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Setter
public class RouteResponse {
    String routeId;
    List<RoutePoint> optimizedPoints;
    Double totalDistance;
    private Integer pointsCount; // количество посещенных точек
    private String status;

}
