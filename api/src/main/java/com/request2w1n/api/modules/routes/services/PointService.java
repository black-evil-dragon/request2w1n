package com.request2w1n.api.modules.routes.services;

import com.request2w1n.api.modules.routes.model.RoutePoint;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class PointService {
    public List<RoutePoint> getAllPoints() {
        return Arrays.asList(
                // Временно
                new RoutePoint(59.2236, 39.8815, "Вологда", "Музей"),
                new RoutePoint(59.2229, 39.8790, "Вологда", "Памятник")
        );
    }
    public RoutePoint getPointById(String id) {
        List<RoutePoint> allPoints = getAllPoints();

        for (int i = 0; i < allPoints.size(); i++) {
            RoutePoint point = allPoints.get(i);
            if (id.equals(point.getObjectId())) {
                return point;
            }
        }
        return null;
    }
}
