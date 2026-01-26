package com.krishimela.service;

import com.krishimela.entity.*;
import com.krishimela.repository.CropRepository;
import com.krishimela.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CropService {

    private final CropRepository cropRepository;
    private final UserRepository userRepository;

    public Crop uploadCrop(Crop crop, String email) {
        User farmer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));
        crop.setFarmer(farmer);
        return cropRepository.save(crop);
    }

    public List<Crop> searchCrops(String keyword) {
        return cropRepository.findByNameContainingIgnoreCase(keyword);
    }

    public List<Crop> getAllCrops() {
        return cropRepository.findAll();
    }
}
