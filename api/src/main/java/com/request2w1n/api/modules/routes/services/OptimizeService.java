package com.request2w1n.api.modules.routes.services;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class OptimizeService {
    private int N, D;
    private int[][] a;
    private List<Integer> bestRoute = new ArrayList<>();
    private int bestPoints = 0;
    private int bestLength = Integer.MAX_VALUE;

    public List<Integer> findOptimalRoute(int N, int D, int[][] matrix) {
        this.N = N;
        this.D = D;
        this.a = matrix;
        this.bestRoute = new ArrayList<>();
        this.bestPoints = 0;
        this.bestLength = Integer.MAX_VALUE;

        if (N > 16) {
            return greedyRoute(N, D, a);
        } else {
            for (int start = 0; start < N; start++) {
                boolean[] visited = new boolean[N];
                visited[start] = true;
                List<Integer> route = new ArrayList<>();
                route.add(start);
                deepSearch(route, visited, 0);
            }
            return bestRoute;
        }
    }

    private List<Integer> greedyRoute(int N, int D, int[][] dist) {
        List<Integer> bestRoute = new ArrayList<>();
        int bestLength = Integer.MAX_VALUE;
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
                int minDist = Integer.MAX_VALUE;

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

    private void deepSearch(List<Integer> route, boolean[] visited, int length) {
        int points = route.size();

        if (points > bestPoints || (points == bestPoints && length < bestLength)) {
            bestPoints = points;
            bestLength = length;
            bestRoute = new ArrayList<>(route);
        }

        int cur = route.get(route.size() - 1);

        PriorityQueue<Integer> nextPoint = new PriorityQueue<>(Comparator.comparingInt(i -> a[cur][i]));
        for (int i = 0; i < N; i++)
            if (!visited[i] && length + a[cur][i] <= D)
                nextPoint.offer(i);

        int limit = Math.min(5, nextPoint.size());
        for (int i = 0; i < limit; i++) {
            int next = nextPoint.poll();
            int newLength = length + a[cur][next];
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