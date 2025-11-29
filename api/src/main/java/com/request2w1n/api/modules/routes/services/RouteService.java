package com.request2w1n.api.modules.routes.services;

import com.request2w1n.api.modules.routes.model.RoutePoint;
import com.request2w1n.api.modules.routes.model.RouteRequest;
import com.request2w1n.api.modules.routes.model.RouteResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteService {

    private final PointService pointService;

    public RouteService(PointService pointService) {
        this.pointService = pointService;
    }

    public RouteResponse optimizeRoute(RouteRequest request){
        // Заглушка для оптимизации
        RouteResponse response = new RouteResponse();
        response.setRouteId("temp_route_" + System.currentTimeMillis());
        response.setStatus("OPTIMIZED");
        response.setPointsCount(request.getSelectedPoints().size());
        response.setTotalDistance(1500.0);
        return response;
    }

    public RouteResponse findById(String routeId) {
        // Заглушка для поиска по ID
        RouteResponse response = new RouteResponse();
        response.setRouteId(routeId);
        response.setStatus("FOUND");
        response.setPointsCount(3);
        response.setTotalDistance(2000.0);
        return response;
    }

    public List<RoutePoint> getAllPoints(){
        return pointService.getAllPoints();
    }
}