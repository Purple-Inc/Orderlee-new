package com.orderlee.service.impl;

import com.orderlee.dto.request.ShipmentRequest;
import com.orderlee.exception.ResourceNotFoundException;
import com.orderlee.exception.BadRequestException;
import com.orderlee.model.Business;
import com.orderlee.model.Order;
import com.orderlee.model.Shipment;
import com.orderlee.repository.OrderRepository;
import com.orderlee.repository.ShipmentRepository;
import com.orderlee.service.BusinessService;
import com.orderlee.service.ShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Transactional
public class ShipmentServiceImpl implements ShipmentService {
    
    @Autowired
    private ShipmentRepository shipmentRepository;
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private BusinessService businessService;
    
    @Override
    public Shipment createShipment(ShipmentRequest shipmentRequest) {
        Order order = orderRepository.findById(shipmentRequest.getOrderId())
            .orElseThrow(() -> new ResourceNotFoundException("Order", "id", shipmentRequest.getOrderId()));
        
        Business currentBusiness = businessService.getCurrentUserBusiness();
        if (!order.getBusiness().getId().equals(currentBusiness.getId())) {
            throw new BadRequestException("You can only create shipments for your own orders");
        }
        
        // Check if shipment already exists for this order
        if (shipmentRepository.findByOrderId(order.getId()).isPresent()) {
            throw new BadRequestException("Shipment already exists for this order");
        }
        
        Shipment shipment = new Shipment();
        shipment.setTrackingNumber(generateTrackingNumber(shipmentRequest.getCarrierName()));
        mapRequestToShipment(shipmentRequest, shipment);
        shipment.setOrder(order);
        
        // Update order status
        order.setOrderStatus(Order.OrderStatus.READY_TO_SHIP);
        orderRepository.save(order);
        
        return shipmentRepository.save(shipment);
    }
    
    @Override
    public Shipment updateShipmentStatus(Long shipmentId, Shipment.ShipmentStatus status) {
        Shipment shipment = getShipmentById(shipmentId);
        
        Business currentBusiness = businessService.getCurrentUserBusiness();
        if (!shipment.getOrder().getBusiness().getId().equals(currentBusiness.getId())) {
            throw new BadRequestException("You can only update your own shipments");
        }
        
        shipment.setShipmentStatus(status);
        
        // Update order status based on shipment status
        Order order = shipment.getOrder();
        switch (status) {
            case IN_TRANSIT:
                order.setOrderStatus(Order.OrderStatus.SHIPPED);
                break;
            case DELIVERED:
                order.setOrderStatus(Order.OrderStatus.DELIVERED);
                shipment.setActualDelivery(LocalDateTime.now());
                break;
            case CANCELLED:
                order.setOrderStatus(Order.OrderStatus.CANCELLED);
                break;
        }
        
        orderRepository.save(order);
        return shipmentRepository.save(shipment);
    }
    
    @Override
    public Shipment getShipmentById(Long shipmentId) {
        return shipmentRepository.findById(shipmentId)
            .orElseThrow(() -> new ResourceNotFoundException("Shipment", "id", shipmentId));
    }
    
    @Override
    public Shipment getShipmentByTrackingNumber(String trackingNumber) {
        return shipmentRepository.findByTrackingNumber(trackingNumber)
            .orElseThrow(() -> new ResourceNotFoundException("Shipment", "trackingNumber", trackingNumber));
    }
    
    @Override
    public List<Shipment> getShipmentsByBusiness() {
        Business business = businessService.getCurrentUserBusiness();
        return shipmentRepository.findByBusinessId(business.getId());
    }
    
    @Override
    public List<Shipment> getShipmentsByStatus(Shipment.ShipmentStatus status) {
        Business business = businessService.getCurrentUserBusiness();
        return shipmentRepository.findByBusinessIdAndStatus(business.getId(), status);
    }
    
    private void mapRequestToShipment(ShipmentRequest request, Shipment shipment) {
        shipment.setCarrierName(request.getCarrierName());
        shipment.setEstimatedDelivery(request.getEstimatedDelivery());
        shipment.setShippingCost(request.getShippingCost());
        shipment.setSenderName(request.getSenderName());
        shipment.setSenderAddress(request.getSenderAddress());
        shipment.setSenderPhone(request.getSenderPhone());
        shipment.setReceiverName(request.getReceiverName());
        shipment.setReceiverAddress(request.getReceiverAddress());
        shipment.setReceiverPhone(request.getReceiverPhone());
        shipment.setPackageWeight(request.getPackageWeight());
        shipment.setPackageValue(request.getPackageValue());
        shipment.setPackageDescription(request.getPackageDescription());
        shipment.setIsFragile(request.getIsFragile());
    }
    
    private String generateTrackingNumber(String carrierName) {
        String prefix = carrierName.substring(0, Math.min(3, carrierName.length())).toUpperCase();
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        return prefix + timestamp;
    }
}