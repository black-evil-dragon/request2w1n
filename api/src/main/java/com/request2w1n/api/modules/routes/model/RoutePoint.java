package com.request2w1n.api.modules.routes.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.gavaghan.geodesy.Ellipsoid;
import org.gavaghan.geodesy.GeodeticCalculator;
import org.gavaghan.geodesy.GlobalPosition;

import java.util.Map;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class RoutePoint {
    private Double latitude;
    private Double longitude;
    private String address;
    private String name;
    private String typeObject;
    private boolean important = false;

    @Id
    private String objectId;

    public Map<String, Object> toMapMarker() {
        return Map.of(
                "id", this.objectId,
                "lat", this.latitude,
                "lng", this.longitude,
                "name", this.name,
                "type", this.typeObject,
                "important", this.important
        );
    }
    public double distanceTo(RoutePoint other){
        GeodeticCalculator geoCalc = new GeodeticCalculator();
        Ellipsoid reference = Ellipsoid.WGS84;

        GlobalPosition pointA = new GlobalPosition(this.latitude, this.longitude, 0.0);
        GlobalPosition pointB = new GlobalPosition(other.getLatitude(), other.getLongitude(), 0.0);

        return geoCalc.calculateGeodeticCurve(reference, pointA, pointB).getEllipsoidalDistance();
    }
}
