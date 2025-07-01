package com.orderlee.repository;

import com.orderlee.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByBusinessId(Long businessId);
    List<Product> findByBusinessIdAndCategory(Long businessId, String category);
    Optional<Product> findByBusinessIdAndSku(Long businessId, String sku);
    
    @Query("SELECT p FROM Product p WHERE p.business.id = :businessId AND p.stockQuantity <= p.reorderLevel")
    List<Product> findLowStockProducts(@Param("businessId") Long businessId);
    
    @Query("SELECT p FROM Product p WHERE p.business.id = :businessId AND " +
           "(LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.sku) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Product> searchProducts(@Param("businessId") Long businessId, @Param("searchTerm") String searchTerm);
}