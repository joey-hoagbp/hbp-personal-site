package com.hbp.personalsite.profile;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProfileController {

    private final ProfileService service;

    public ProfileController(ProfileService service) {
        this.service = service;
    }

    /**
     * Returns the full portfolio profile: tech stacks, projects, experience, and education.
     * Public/read-only — consistent with the existing open {@code GET /api/contact}.
     */
    @GetMapping("/api/profile")
    public ProfileService.ProfileResponse getProfile() {
        return service.getProfile();
    }
}
