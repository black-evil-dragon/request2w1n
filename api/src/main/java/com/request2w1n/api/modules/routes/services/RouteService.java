package com.request2w1n.api.modules.routes.services;

import com.request2w1n.api.modules.routes.model.RouteEntity;
import com.request2w1n.api.modules.routes.model.RoutePoint;
import com.request2w1n.api.modules.routes.model.RouteRequest;
import com.request2w1n.api.modules.routes.model.RouteResponse;
import com.request2w1n.api.modules.routes.repositories.RouteRepository;

import java.util.List;

public class RouteService {

    private final RouteRepository routeRepository;

    public RouteService(RouteRepository routeRepository) {
        this.routeRepository = routeRepository;
    }

    RouteResponse optimizeRoute(RouteRequest request){
        // заглушка. Тут должно быть задание 1
        return routeRepository.optimizeRoute(request);

    }

    public RouteResponse getRouteById(String routeId) {
        // Поиск маршрута по ID
        return routeRepository.findById(routeId);
    }

    List<RouteEntity> findByStatus(String status){
        return routeRepository.findByStatus(status);
    }

    boolean existsByPointsContaining(RoutePoint point){
        return routeRepository.existsByPointsContaining(point);
    }

    String saveRoute(RouteResponse route){
        return routeRepository.saveRoute(route);
    }

    boolean existsByLatAndLong(Double lat, Double lng){
        return routeRepository.existsByLatAndLong(lat,lng);
    }

    List<RoutePoint> getPointsByIds(List<String> ids){
        return routeRepository.getPointsByIds(ids);
    }

    RoutePoint getPointById(String id){
        return routeRepository.getPointById(id);
    }

    List<RoutePoint> getAllPoints(){
        return routeRepository.getAllPoints();
    }

    boolean existsByLatAndLong(){
        return routeRepository.existsByLatAndLong();
    }
}
