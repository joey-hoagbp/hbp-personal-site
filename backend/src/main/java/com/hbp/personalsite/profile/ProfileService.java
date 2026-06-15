package com.hbp.personalsite.profile;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileService {

    /**
     * The full portfolio profile returned by {@code GET /api/profile}.
     */
    public record ProfileResponse(
            List<TechStackGroup> techStacks,
            List<Project> projects,
            List<Experience> experiences,
            List<Education> education
    ) {
    }

    private final TechStackGroupRepository techStackGroupRepository;
    private final ProjectRepository projectRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;

    public ProfileService(TechStackGroupRepository techStackGroupRepository,
                          ProjectRepository projectRepository,
                          ExperienceRepository experienceRepository,
                          EducationRepository educationRepository) {
        this.techStackGroupRepository = techStackGroupRepository;
        this.projectRepository = projectRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
    }

    public ProfileResponse getProfile() {
        return new ProfileResponse(
                techStackGroupRepository.findAllByOrderByOrderAsc(),
                projectRepository.findAllByOrderByOrderAsc(),
                experienceRepository.findAllByOrderByOrderAsc(),
                educationRepository.findAllByOrderByOrderAsc()
        );
    }
}
