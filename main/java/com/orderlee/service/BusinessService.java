package com.orderlee.service;

import com.orderlee.dto.request.BusinessRequest;
import com.orderlee.model.Business;

public interface BusinessService {
    Business createBusiness(BusinessRequest businessRequest);
    Business updateBusiness(Long businessId, BusinessRequest businessRequest);
    Business getBusinessByUserId(Long userId);
    Business getCurrentUserBusiness();
}