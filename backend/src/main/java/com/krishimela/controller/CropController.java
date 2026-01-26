package com.krishimela.controller;

import com.krishimela.entity.Crop;
import com.krishimela.service.CropService;
import com.krishimela.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crops")
@RequiredArgsConstructor
@CrossOrigin
public class CropController {

    private final CropService cropService;
    private final JwtUtil jwtUtil;

    @PostMapping("/upload")
    public Crop uploadCrop(@RequestBody Crop crop, @RequestHeader("Authorization") String token) {
        String email = jwtUtil.extractUsername(token.substring(7));
        return cropService.uploadCrop(crop, email);
    }

    @GetMapping("/search")
    public List<Crop> search(@RequestParam String keyword) {
        return cropService.searchCrops(keyword);
    }

    @GetMapping
    public List<Crop> allCrops() {
        return cropService.getAllCrops();
    }
}
