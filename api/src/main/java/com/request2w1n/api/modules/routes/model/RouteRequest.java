package com.request2w1n.api.modules.routes.model;

import lombok.Getter;
import org.springframework.util.RouteMatcher;

import java.util.List;

@Getter
public class RouteRequest {

    List<String> selectedPoints;
    private Double maxRouteLength; // D - максимальная длина маршрута в метрах
    List<String> importantPoints; // список с важными для посещения точек

    public RouteRequest() {}

    public RouteRequest(List<String> selectedPoints, Double maxRouteLength) {
        this.selectedPoints = selectedPoints;
        this.maxRouteLength = maxRouteLength;
    }

    boolean isValid(){
        return (this.selectedPoints != null && !this.selectedPoints.isEmpty()
                && this.maxRouteLength != null && this.maxRouteLength > 0);
    }

    boolean isWithinPointLimit(){
        return (selectedPoints.size() <= 20);
    }
    public boolean meetsLengthConstraint(double actualLength) {
        return actualLength <= maxRouteLength;
    }

    List<String> getOptimizablePointIds(){
        return this.selectedPoints;
    }
}
