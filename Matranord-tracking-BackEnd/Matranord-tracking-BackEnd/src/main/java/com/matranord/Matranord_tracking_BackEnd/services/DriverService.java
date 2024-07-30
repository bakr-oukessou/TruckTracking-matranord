package com.matranord.Matranord_tracking_BackEnd.services;

import com.matranord.Matranord_tracking_BackEnd.model.Driver;
import com.matranord.Matranord_tracking_BackEnd.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DriverService {
    private final DriverRepository driverRepository;

    @Autowired
    public DriverService(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    public Driver createDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    public Optional<Driver> getDriverByCIN(String CIN) {
        return driverRepository.findByCIN(CIN);
    }

    public Optional<Driver> getDriverById(int id) {
        return driverRepository.findById(id);
    }

    public Driver updateDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    public void deleteDriver(String CIN) {
        driverRepository.deleteByCIN(CIN);
    }

    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }
}