package com.request2w1n.api.modules.routes.services;

import com.request2w1n.api.modules.routes.model.RoutePoint;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OptimizeService {
    private int N, D;
    private double[][] a;
    private List<Integer> bestRoute = new ArrayList<>();
    private int bestPoints = 0;
    private double bestLength = Double.MAX_VALUE;
    private List<Integer> bestRoute2 = new ArrayList<>();

    public List<Integer> findOptimalRoute(int N, int D, List<String> matrix, List<String> importantIds) {
        this.N = N;
        this.D = D;
        PointService pointService = new PointService();
        List<RoutePoint> points = new ArrayList<>();
        List<RoutePoint> importantPoints = new ArrayList<>();
        for (String id : importantIds) {
            importantPoints.add(pointService.getPointById(id));
        }
        points.add(importantPoints.getFirst());
        for (String id : matrix) {
            for (RoutePoint importantPoint : points) {
                if (pointService.getPointById(id) != importantPoints) {
                    points.add(pointService.getPointById(id));
                }
                else {
                    break;
                }
            }
        }
        double[][] importantA = new double[importantPoints.size()][importantPoints.size()];
        for (int i = 0; i < importantPoints.size(); i++) {
            for (int j = 0; j < importantPoints.size(); j++) {
                importantA[i][j] = importantPoints.get(i).distanceTo(importantPoints.get(j));
            }
        }
        a = new double[points.size()][points.size()];
        for (int i = 0; i < points.size(); i++) {
            for (int j = 0; j < points.size(); j++) {
                a[i][j] = points.get(i).distanceTo(points.get(j));
            }
        }
        this.bestRoute = new ArrayList<>();
        this.bestPoints = 0;
        this.bestLength = Double.MAX_VALUE;

        if (importantPoints.size() >= 0) {
            bestRoute = greedyRoute(importantPoints.size(), D, importantA);
        } else {
            for (int start = 0; start < importantPoints.size(); start++) {
                boolean[] visited = new boolean[importantPoints.size()];
                visited[start] = true;
                List<Integer> route = new ArrayList<>();
                route.add(start);
                deepSearch(route, visited, 0);
            }
        }

        double minLenthAfterLastImportantPoint = Double.MAX_VALUE;
        for (RoutePoint point : points) {
            if (importantPoints.get(bestRoute.getLast()).distanceTo(point) < minLenthAfterLastImportantPoint) {
                minLenthAfterLastImportantPoint = importantPoints.get(bestRoute.getLast()).distanceTo(point);
            }
        }


        for (int start = 0; start < a.length; start++) {
            boolean[] visited = new boolean[N];
            visited[start] = true;
            List<Integer> route = new ArrayList<>();
            route.add(start);
            deepSearch(route, visited, minLenthAfterLastImportantPoint);
        }
        for (int point : bestRoute2) {
            bestRoute.add(point);
        }

        return bestRoute;
    }

    private List<Integer> greedyRoute(int N, int D, double[][] dist) {
        List<Integer> bestRoute = new ArrayList<>();
        double bestLength = Double.MAX_VALUE;
        int bestPoints = 0;

        for (int start = 0; start < N; start++) {
            boolean[] visited = new boolean[N];
            List<Integer> curRoute = new ArrayList<>();
            int curLength = 0;
            int curPoint = start;

            curRoute.add(start);
            visited[start] = true;

            while (true) {
                int nextPoint = -1;
                double minDist = Double.MAX_VALUE;

                for (int i = 0; i < N; i++) {
                    if (!visited[i] && dist[curPoint][i] < minDist) {
                        minDist = dist[curPoint][i];
                        nextPoint = i;
                    }
                }

                if (nextPoint == -1 || curLength + minDist > D) {
                    break;
                }

                curRoute.add(nextPoint);
                visited[nextPoint] = true;
                curLength += minDist;
                curPoint = nextPoint;
            }

            int curPoints = curRoute.size();
            if (curPoints > bestPoints || (curPoints == bestPoints && curLength < bestLength)) {
                bestRoute = new ArrayList<>(curRoute);
                bestLength = curLength;
                bestPoints = curPoints;
            }
        }

        return bestRoute;
    }

    private void deepSearch(List<Integer> route, boolean[] visited, double length) {
        int points = route.size();

        if (points > bestPoints || (points == bestPoints && length < bestLength)) {
            bestPoints = points;
            bestLength = length;
            bestRoute2 = new ArrayList<>(route);
        }

        int cur = route.get(route.size() - 1);

        PriorityQueue<Integer> nextPoint = new PriorityQueue<>(Comparator.comparingDouble(i -> a[cur][i]));
        for (int i = 0; i < N; i++)
            if (!visited[i] && length + a[cur][i] <= D)
                nextPoint.offer(i);

        int limit = Math.min(5, nextPoint.size());
        for (int i = 0; i < limit; i++) {
            int next = nextPoint.poll();
            double newLength = length + a[cur][next];
            if (newLength <= D) {
                visited[next] = true;
                route.add(next);
                deepSearch(route, visited, newLength);
                route.remove(route.size() - 1);
                visited[next] = false;
            }
        }
    }
}