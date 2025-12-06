package com.request2w1n.api.modules.routes.repositories;

import com.request2w1n.api.modules.routes.model.*;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RouteRepository extends JpaRepository<RouteEntity, Long> {
    List<RouteEntity> findByStatus(String status);
    boolean existsByPointsContaining(RoutePoint point);
}
