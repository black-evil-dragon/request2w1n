package com.request2w1n.api.modules.routes.repositories;

import com.request2w1n.api.modules.routes.model.*;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RouteRepository extends JpaRepository<@NotNull RouteEntity, @NotNull Long> {
    RouteResponse optimizeRoute(RouteRequest request);
    boolean existsByLatAndLong();
    List<RoutePoint> getAllPoints();
    RoutePoint getPointById(String id);
    List<RoutePoint> getPointsByIds(List<String> ids);
    boolean existsByLatAndLong(Double lat, Double lng);
    String saveRoute(RouteResponse route);

    RouteResponse findById(String routeId);
    List<RouteEntity> findByStatus(String status);
    boolean existsByPointsContaining(RoutePoint point);
}
