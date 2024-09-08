package com.matranord.Matranord_tracking_BackEnd.repository;

import com.matranord.Matranord_tracking_BackEnd.model.Driver;
import com.matranord.Matranord_tracking_BackEnd.model.Truck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Integer> {
    Optional<Driver> findByCIN(String CIN);
//    void deleteByCIN(String CIN);
    void deleteById(int id);
}
