package com.request2w1n.api.modules.routes.controller;

import com.request2w1n.api.api.ApiResponse;
import com.request2w1n.api.api.ErrorDetails;
import com.request2w1n.api.modules.routes.model.RouteRequest;
import com.request2w1n.api.modules.routes.model.RouteResponse;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/routes")
public class RoutesController {

    @PostMapping("/optimize")
    public ResponseEntity optimize(@RequestBody RouteRequest request) {
        if (request.getSelectedPoints() == null || request.getSelectedPoints().size() < 2) {
            ApiResponse<ErrorDetails> response = new ApiResponse<>(
                    false,
                    400,
                    new ErrorDetails(
                            "Недостаточно точек для маршрута",
                            Map.of(
                                    "points", "Минимум 2 точки",
                                    "type", "validation"
                            )
                    )
            );
            return new ResponseEntity<>(response, HttpStatusCode.valueOf(400));
        }

        if (request.getMaxRouteLength() == null || request.getMaxRouteLength() <= 0) {
            ApiResponse<ErrorDetails> response = new ApiResponse<>(
                    false,
                    400,
                    new ErrorDetails(
                            "Некорректная длина маршрута",
                            Map.of(
                                    "maxRouteLength", "Неположительная длина маршрута",
                                    "type", "validation"
                            )
                    )
            );
            return new ResponseEntity<>(response, HttpStatusCode.valueOf(400));
        }

        // Вызов сервиса (пока что не сделана там реализация)
        //RouteResponse result = RouteOptimizationService.optimizeRoute(request);

//        ApiResponse<RouteResponse> response = new ApiResponse<>(
//                true,
//                200,
//                result);
        return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
    }

//    @GetMapping("/points") // GET /api/routes/points
//    public ResponseEntity getAllPoints() {
//        // вернуть все доступные достопримечательности
//        result =
//        ApiResponse<RouteResponse> response = new ApiResponse<>(
//                true,
//                200,
//                result);
//        return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
//    }


    @GetMapping("/routeId")
    public ResponseEntity getRouteId (@PathVariable String routeId){
//        Поиск маршрута в репозитории

//        Проверка существования (404 если нет)

//        Преобразование Entity в Response
    }

}
