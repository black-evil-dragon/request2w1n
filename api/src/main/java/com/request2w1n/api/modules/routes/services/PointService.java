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
}
