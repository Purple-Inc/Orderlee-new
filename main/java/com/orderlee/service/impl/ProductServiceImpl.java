package com.orderlee.service.impl;

import com.orderlee.dto.request.ProductRequest;
import com.orderlee.exception.ResourceNotFoundException;
import com.orderlee.exception.BadRequestException;
import com.orderlee.model.Business;
import com.orderlee.model.Product;
import com.orderlee.repository.ProductRepository;
import com.orderlee.service.BusinessService;
import com.orderlee.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private BusinessService businessService;
    
    @Override
    public Product createProduct(ProductRequest productRequest) {
        Business business = businessService.getCurrentUserBusiness();
        
        // Check if SKU already exists for this business
        if (productRequest.getSku() != null && 
            productRepository.findByBusinessIdAndSku(business.getId(), productRequest.getSku()).isPresent()) {
            throw new BadRequestException("Product with SKU " + productRequest.getSku() + " already exists");
        }
        
        Product product = new Product();
        mapRequestToProduct(productRequest, product);
        product.setBusiness(business);
        
        return productRepository.save(product);
    }
    
    @Override
    public Product updateProduct(Long productId, ProductRequest productRequest) {
        Product product = getProductById(productId);
        
        Business currentBusiness = businessService.getCurrentUserBusiness();
        if (!product.getBusiness().getId().equals(currentBusiness.getId())) {
            throw new BadRequestException("You can only update your own products");
        }
        
        mapRequestToProduct(productRequest, product);
        
        return productRepository.save(product);
    }
    
    @Override
    public Product getProductById(Long productId) {
        return productRepository.findById(productId)
            .orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));
    }
    
    @Override
    public List<Product> getProductsByBusiness() {
        Business business = businessService.getCurrentUserBusiness();
        return productRepository.findByBusinessId(business.getId());
    }
    
    @Override
    public List<Product> getLowStockProducts() {
        Business business = businessService.getCurrentUserBusiness();
        return productRepository.findLowStockProducts(business.getId());
    }
    
    @Override
    public void deleteProduct(Long productId) {
        Product product = getProductById(productId);
        
        Business currentBusiness = businessService.getCurrentUserBusiness();
        if (!product.getBusiness().getId().equals(currentBusiness.getId())) {
            throw new BadRequestException("You can only delete your own products");
        }
        
        productRepository.delete(product);
    }
    
    @Override
    public List<Product> searchProducts(String searchTerm) {
        Business business = businessService.getCurrentUserBusiness();
        return productRepository.searchProducts(business.getId(), searchTerm);
    }
    
    private void mapRequestToProduct(ProductRequest request, Product product) {
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setCategory(request.getCategory());
        product.setSku(request.getSku());
        product.setCostPrice(request.getCostPrice());
        product.setSellingPrice(request.getSellingPrice());
        product.setStockQuantity(request.getStockQuantity());
        product.setReorderLevel(request.getReorderLevel());
        product.setSupplier(request.getSupplier());
        product.setStorageLocation(request.getStorageLocation());
        product.setNotes(request.getNotes());
        product.setImageUrl(request.getImageUrl());
        product.setIsFragile(request.getIsFragile());
        product.setWeightKg(request.getWeightKg());
        product.setLengthCm(request.getLengthCm());
        product.setWidthCm(request.getWidthCm());
        product.setHeightCm(request.getHeightCm());
    }
}