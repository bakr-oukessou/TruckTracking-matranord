package com.matranord.Matranord_tracking_BackEnd.controller;

import com.matranord.Matranord_tracking_BackEnd.model.Driver;
import com.matranord.Matranord_tracking_BackEnd.services.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {
    private final DriverService driverService;

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
    public ResponseEntity<List<Driver>> getAllDrivers() {
        List<Driver> drivers = driverService.getAllDrivers();
        return new ResponseEntity<>(drivers, HttpStatus.OK);
    }
}