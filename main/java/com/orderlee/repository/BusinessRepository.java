package com.orderlee.repository;

import com.orderlee.model.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BusinessRepository extends JpaRepository<Business, Long> {
    Optional<Business> findByUserId(Long userId);
    boolean existsByBusinessName(String businessName);
    boolean existsByRegistrationNumber(String registrationNumber);
}