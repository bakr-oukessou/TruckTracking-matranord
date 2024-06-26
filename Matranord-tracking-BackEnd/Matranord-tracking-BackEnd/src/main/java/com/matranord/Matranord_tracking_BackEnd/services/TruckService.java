package com.matranord.Matranord_tracking_BackEnd.services;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import com.matranord.Matranord_tracking_BackEnd.model.Truck;
import com.matranord.Matranord_tracking_BackEnd.repository.TruckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TruckService {
    @Autowired
    private TruckRepository truckRepository;

    public List<Truck> getAllTrucks() {
        return truckRepository.findAll();
    }

    public Truck getTruckById(Long id) {
        return truckRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Truck not found"));    }

    public Truck saveTruck(Truck truck) {
        return truckRepository.save(truck);
    }

    public void deleteTruck(Long id) {
        truckRepository.deleteById(id);
    }
}