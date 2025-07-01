package com.orderlee.controller;

import com.orderlee.dto.request.ProductRequest;
import com.orderlee.dto.response.ApiResponse;
import com.orderlee.model.Product;
import com.orderlee.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    @PostMapping
    public ResponseEntity<?> createProduct(@Valid @RequestBody ProductRequest productRequest) {
        try {
            Product product = productService.createProduct(productRequest);
            return ResponseEntity.ok(new ApiResponse(true, "Product created successfully", product));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @PutMapping("/{productId}")
    public ResponseEntity<?> updateProduct(@PathVariable Long productId, 
                                         @Valid @RequestBody ProductRequest productRequest) {
        try {
            Product product = productService.updateProduct(productId, productRequest);
            return ResponseEntity.ok(new ApiResponse(true, "Product updated successfully", product));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @GetMapping
    public ResponseEntity<?> getProducts() {
        try {
            List<Product> products = productService.getProductsByBusiness();
            return ResponseEntity.ok(new ApiResponse(true, "Products retrieved successfully", products));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @GetMapping("/{productId}")
    public ResponseEntity<?> getProduct(@PathVariable Long productId) {
        try {
            Product product = productService.getProductById(productId);
            return ResponseEntity.ok(new ApiResponse(true, "Product retrieved successfully", product));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @GetMapping("/low-stock")
    public ResponseEntity<?> getLowStockProducts() {
        try {
            List<Product> products = productService.getLowStockProducts();
            return ResponseEntity.ok(new ApiResponse(true, "Low stock products retrieved successfully", products));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<?> searchProducts(@RequestParam String query) {
        try {
            List<Product> products = productService.searchProducts(query);
            return ResponseEntity.ok(new ApiResponse(true, "Products search completed", products));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @DeleteMapping("/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {
        try {
            productService.deleteProduct(productId);
            return ResponseEntity.ok(new ApiResponse(true, "Product deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
}