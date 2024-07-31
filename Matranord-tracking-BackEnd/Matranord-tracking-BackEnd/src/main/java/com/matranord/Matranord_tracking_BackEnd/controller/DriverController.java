package com.matranord.Matranord_tracking_BackEnd.controller;

import com.matranord.Matranord_tracking_BackEnd.model.Driver;
import com.matranord.Matranord_tracking_BackEnd.services.DriverService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {
    private final DriverService driverService;
    private static final Logger logger = LoggerFactory.getLogger(TruckController.class);


    @Autowired
    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    @PostMapping
    public ResponseEntity<Driver> createDriver(@RequestBody Driver driver) {
        Driver createdDriver = driverService.createDriver(driver);
        return new ResponseEntity<>(createdDriver, HttpStatus.CREATED);
    }

    @GetMapping("/{CIN}")
    public ResponseEntity<Driver> getDriver(@PathVariable String CIN) {
        return driverService.getDriverByCIN(CIN)
                .map(driver -> new ResponseEntity<>(driver, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/{id}")
    public Optional<Driver> getDriverById(@PathVariable int id) {
        return driverService.getDriverById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Driver> updateDriver(@PathVariable int id, @RequestBody Driver driver) {
        return driverService.getDriverById(id)
                .map(existingDriver -> {
                    driver.setId(id);
                    Driver updatedDriver = driverService.updateDriver(driver);
                    return new ResponseEntity<>(updatedDriver, HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{CIN}")
    public ResponseEntity<Void> deleteDriver(@PathVariable String CIN) {
        driverService.deleteDriver(CIN);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<List<Driver>> getAllDrivers2() {
        List<Driver> drivers = driverService.getAllDrivers();
        return new ResponseEntity<>(drivers, HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<?> getAllDrivers() {
        try {
            logger.info("Fetching all Drivers");
            List<Driver> drivers = driverService.getAllDrivers();
            logger.info("Fetched {} Drivers", drivers.size());
            return ResponseEntity.ok(drivers);
        } catch (Exception e) {
            logger.error("Error fetching Drivers", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching Drivers: " + e.getMessage());
        }
    }
}