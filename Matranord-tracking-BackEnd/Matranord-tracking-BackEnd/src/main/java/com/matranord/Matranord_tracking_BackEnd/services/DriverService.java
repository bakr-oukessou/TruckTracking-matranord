package com.matranord.Matranord_tracking_BackEnd.services;

import com.matranord.Matranord_tracking_BackEnd.model.DTO.DriverDTO;
import com.matranord.Matranord_tracking_BackEnd.model.Driver;
import com.matranord.Matranord_tracking_BackEnd.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
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

//    public void deleteDriver(String CIN) {
//        driverRepository.deleteByCIN(CIN);
//    }
    public void deleteDriverByid(int id) {
        driverRepository.deleteById(id);
    }

    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    public void uploadProfilePicture(int driverId, MultipartFile file) throws IOException {
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        driver.setProfilePicture(file.getBytes());
        driverRepository.save(driver);
    }

    public DriverDTO getDriverWithProfilePicture(int driverId) {
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        DriverDTO driverDTO = null; // map driver to DriverDTO
        if (driver.getProfilePicture() != null) {
            driverDTO.setProfilePictureBase64(Base64.getEncoder().encodeToString(driver.getProfilePicture()));
        }
        return driverDTO;
    }
}