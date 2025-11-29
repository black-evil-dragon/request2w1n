package com.request2w1n.api.modules.routes.controller;

import com.request2w1n.api.api.ApiResponse;
import com.request2w1n.api.api.ErrorDetails;
import com.request2w1n.api.modules.routes.model.RoutePoint;
import com.request2w1n.api.modules.routes.model.RouteRequest;
import com.request2w1n.api.modules.routes.model.RouteResponse;
import com.request2w1n.api.modules.routes.repositories.RouteRepository;
import com.request2w1n.api.modules.routes.services.PointService;
import com.request2w1n.api.modules.routes.services.RouteService;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/routes")
public class RoutesController {

    private final RouteService routeService;
    private final PointService pointService;

    public RoutesController(RouteService routeService, PointService pointService) {
        this.routeService = routeService;
        this.pointService = pointService;
    }

    @PostMapping("/create")
    public ResponseEntity createRoute(@RequestBody Map<String, Object> request) {
        List<String> pointIds = (List<String>) request.get("pointIds");

        // Валидация
        if (pointIds == null || pointIds.isEmpty()) {
            ApiResponse<ErrorDetails> response = new ApiResponse<>(
                    false,
                    400,
                    new ErrorDetails("Не выбраны точки", Map.of("pointIds", "Укажите точки маршрута"))
            );
            return new ResponseEntity<>(response, HttpStatusCode.valueOf(400));
        }

        // Создание маршрута (заглушка)
        String newRouteId = "route_" + System.currentTimeMillis();
        Map<String, Object> createdRoute = Map.of(
                "routeId", newRouteId,
                "status", "created",
                "pointsCount", pointIds.size(),
                "message", "Маршрут успешно создан"
        );

        ApiResponse<Map<String, Object>> response = new ApiResponse<>(
                true,
                201,
                createdRoute
        );
        return new ResponseEntity<>(response, HttpStatusCode.valueOf(201));
    }

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

         //Вызов сервиса (пока что не сделана там реализация)
        RouteResponse result = routeService.optimizeRoute(request);

        ApiResponse<RouteResponse> response = new ApiResponse<>(
                true,
                200,
                result);
        return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
    }

    @GetMapping("/points")
    public ResponseEntity getAllPoints() {
        List<RoutePoint> points = pointService.getAllPoints();

        ApiResponse<List<RoutePoint>> response = new ApiResponse<>(
                true,
                200,
                points
        );
        return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
    }
    @PostMapping("/find")
    public ResponseEntity findRouteById(@RequestBody Map<String, String> request) {
        String routeId = request.get("routeId");

        // Валидация
        if (routeId == null || routeId.trim().isEmpty()) {
            ApiResponse<ErrorDetails> response = new ApiResponse<>(
                    false,
                    400,
                    new ErrorDetails("ID маршрута обязателен", Map.of("routeId", "Не указан ID"))
            );
            return new ResponseEntity<>(response, HttpStatusCode.valueOf(400));
        }

        // Поиск маршрута в репозитории
        RouteResponse route = routeService.findById(routeId);

        // Если не найден
        if (route == null) {
            ApiResponse<ErrorDetails> response = new ApiResponse<>(
                    false,
                    404,
                    new ErrorDetails("Маршрут не найден", Map.of("routeId", "Маршрут с ID " + routeId + " не существует"))
            );
            return new ResponseEntity<>(response, HttpStatusCode.valueOf(404));
        }

        // Формируем краткую информацию
        Map<String, Object> routeInfo = Map.of(
                "routeId", route.getRouteId(),
                "pointsCount", route.getPointsCount(),
                "totalDistance", route.getTotalDistance(),
                "status", route.getStatus()
        );

        ApiResponse<Map<String, Object>> response = new ApiResponse<>(
                true,
                200,
                routeInfo
        );
        return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
    }

    @GetMapping("/{routeId}")
    public ResponseEntity getRouteId (@PathVariable String routeId){
        // Проверка, что routeId не пустой
        if (routeId == null || routeId.trim().isEmpty()) {
            ApiResponse<ErrorDetails> response = new ApiResponse<>(
                    false,
                    400,
                    new ErrorDetails(
                            "Неверный идентификатор маршрута",
                            Map.of(
                                    "routeId", "Идентификатор не может быть пустым",
                                    "type", "validation"
                            )
                    )
            );
            return new ResponseEntity<>(response, HttpStatusCode.valueOf(400));
        }

        // Поиск маршрута в репозитории
        RouteResponse route = routeService.findById(routeId);

        // Если маршрут не найден
        if (route == null) {
            ApiResponse<ErrorDetails> response = new ApiResponse<>(
                    false,
                    404,
                    new ErrorDetails(
                            "Маршрут не найден",
                            Map.of(
                                    "routeId", "Маршрут с ID " + routeId + " не существует",
                                    "type", "not_found"
                            )
                    )
            );
            return new ResponseEntity<>(response, HttpStatusCode.valueOf(404));
        }

        // 4. Успешный успех
        ApiResponse<RouteResponse> response = new ApiResponse<>(
                true,
                200,
                route
        );
        return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
    }

}
