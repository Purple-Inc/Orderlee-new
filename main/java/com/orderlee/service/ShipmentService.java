package com.orderlee.service;

import com.orderlee.dto.request.ShipmentRequest;
import com.orderlee.model.Shipment;

import java.util.List;

public interface ShipmentService {
    Shipment createShipment(ShipmentRequest shipmentRequest);
    Shipment updateShipmentStatus(Long shipmentId, Shipment.ShipmentStatus status);
    Shipment getShipmentById(Long shipmentId);
    Shipment getShipmentByTrackingNumber(String trackingNumber);
    List<Shipment> getShipmentsByBusiness();
    List<Shipment> getShipmentsByStatus(Shipment.ShipmentStatus status);
}