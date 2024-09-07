package com.matranord.Matranord_tracking_BackEnd.repository;

import com.matranord.Matranord_tracking_BackEnd.model.Truck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TruckRepository extends JpaRepository<Truck, Long> {
    void deleteById(int id);
    Optional<Truck> findByMatricule(String matricule);
}
