package com.orderlee.service.impl;

import com.orderlee.dto.request.BusinessRequest;
import com.orderlee.exception.ResourceNotFoundException;
import com.orderlee.exception.BadRequestException;
import com.orderlee.model.Business;
import com.orderlee.model.User;
import com.orderlee.repository.BusinessRepository;
import com.orderlee.service.BusinessService;
import com.orderlee.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BusinessServiceImpl implements BusinessService {
    
    @Autowired
    private BusinessRepository businessRepository;
    
    @Autowired
    private UserService userService;
    
    @Override
    public Business createBusiness(BusinessRequest businessRequest) {
        User currentUser = userService.getCurrentUser();
        
        if (businessRepository.findByUserId(currentUser.getId()).isPresent()) {
            throw new BadRequestException("User already has a business profile");
        }
        
        Business business = new Business();
        mapRequestToBusiness(businessRequest, business);
        business.setUser(currentUser);
        
        return businessRepository.save(business);
    }
    
    @Override
    public Business updateBusiness(Long businessId, BusinessRequest businessRequest) {
        Business business = businessRepository.findById(businessId)
            .orElseThrow(() -> new ResourceNotFoundException("Business", "id", businessId));
        
        User currentUser = userService.getCurrentUser();
        if (!business.getUser().getId().equals(currentUser.getId())) {
            throw new BadRequestException("You can only update your own business");
        }
        
        mapRequestToBusiness(businessRequest, business);
        
        return businessRepository.save(business);
    }
    
    @Override
    public Business getBusinessByUserId(Long userId) {
        return businessRepository.findByUserId(userId)
            .orElseThrow(() -> new ResourceNotFoundException("Business", "userId", userId));
    }
    
    @Override
    public Business getCurrentUserBusiness() {
        User currentUser = userService.getCurrentUser();
        return getBusinessByUserId(currentUser.getId());
    }
    
    private void mapRequestToBusiness(BusinessRequest request, Business business) {
        business.setBusinessName(request.getBusinessName());
        business.setRegistrationNumber(request.getRegistrationNumber());
        business.setTaxId(request.getTaxId());
        business.setIndustry(request.getIndustry());
        business.setBusinessType(request.getBusinessType());
        business.setFoundedYear(request.getFoundedYear());
        business.setWebsite(request.getWebsite());
        business.setDescription(request.getDescription());
        business.setAddress(request.getAddress());
        business.setCity(request.getCity());
        business.setState(request.getState());
        business.setPostalCode(request.getPostalCode());
        business.setCountry(request.getCountry());
        business.setPhone(request.getPhone());
        business.setEmail(request.getEmail());
        business.setLogoUrl(request.getLogoUrl());
    }
}