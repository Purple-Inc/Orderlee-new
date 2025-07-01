package com.orderlee.controller;

import com.orderlee.dto.request.ShipmentRequest;
import com.orderlee.dto.response.ApiResponse;
import com.orderlee.model.Shipment;
import com.orderlee.service.ShipmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shipments")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ShipmentController {
    
    @Autowired
    private ShipmentService shipmentService;
    
    @PostMapping
    public ResponseEntity<?> createShipment(@Valid @RequestBody ShipmentRequest shipmentRequest) {
        try {
            Shipment shipment = shipmentService.createShipment(shipmentRequest);
            return ResponseEntity.ok(new ApiResponse(true, "Shipment created successfully", shipment));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @PutMapping("/{shipmentId}/status")
    public ResponseEntity<?> updateShipmentStatus(@PathVariable Long shipmentId, 
                                                 @RequestParam Shipment.ShipmentStatus status) {
        try {
            Shipment shipment = shipmentService.updateShipmentStatus(shipmentId, status);
            return ResponseEntity.ok(new ApiResponse(true, "Shipment status updated successfully", shipment));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @GetMapping
    public ResponseEntity<?> getShipments() {
        try {
            List<Shipment> shipments = shipmentService.getShipmentsByBusiness();
            return ResponseEntity.ok(new ApiResponse(true, "Shipments retrieved successfully", shipments));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @GetMapping("/{shipmentId}")
    public ResponseEntity<?> getShipment(@PathVariable Long shipmentId) {
        try {
            Shipment shipment = shipmentService.getShipmentById(shipmentId);
            return ResponseEntity.ok(new ApiResponse(true, "Shipment retrieved successfully", shipment));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @GetMapping("/tracking/{trackingNumber}")
    public ResponseEntity<?> getShipmentByTrackingNumber(@PathVariable String trackingNumber) {
        try {
            Shipment shipment = shipmentService.getShipmentByTrackingNumber(trackingNumber);
            return ResponseEntity.ok(new ApiResponse(true, "Shipment retrieved successfully", shipment));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<?> getShipmentsByStatus(@PathVariable Shipment.ShipmentStatus status) {
        try {
            List<Shipment> shipments = shipmentService.getShipmentsByStatus(status);
            return ResponseEntity.ok(new ApiResponse(true, "Shipments retrieved successfully", shipments));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
}