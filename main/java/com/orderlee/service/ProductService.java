package com.orderlee.service;

import com.orderlee.dto.request.ProductRequest;
import com.orderlee.model.Product;

import java.util.List;

public interface ProductService {
    Product createProduct(ProductRequest productRequest);
    Product updateProduct(Long productId, ProductRequest productRequest);
    Product getProductById(Long productId);
    List<Product> getProductsByBusiness();
    List<Product> getLowStockProducts();
    void deleteProduct(Long productId);
    List<Product> searchProducts(String searchTerm);
}