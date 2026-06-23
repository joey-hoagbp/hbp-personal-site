package com.hbp.personalsite.profile;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Seeds the four profile collections on startup if they are empty.
 * Idempotent: checks each collection independently — never seeds if count > 0.
 */
@Component
public class ProfileSeeder implements CommandLineRunner {

    private final TechStackGroupRepository techStackGroupRepository;
    private final ProjectRepository projectRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;

    public ProfileSeeder(TechStackGroupRepository techStackGroupRepository,
                         ProjectRepository projectRepository,
                         ExperienceRepository experienceRepository,
                         EducationRepository educationRepository) {
        this.techStackGroupRepository = techStackGroupRepository;
        this.projectRepository = projectRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
    }

    @Override
    public void run(String... args) {
        seedTechStacks();
        seedProjects();
        seedExperiences();
        seedEducation();
    }

    // -------------------------------------------------------------------------
    // Tech Stacks
    // -------------------------------------------------------------------------

    private void seedTechStacks() {
        if (techStackGroupRepository.count() > 0) {
            return;
        }
        techStackGroupRepository.saveAll(List.of(
                new TechStackGroup(0,
                        new Localized("Frontend", "Frontend"),
                        List.of("JavaScript", "TypeScript", "ReactJS", "NextJS", "TailwindCSS")),
                new TechStackGroup(1,
                        new Localized("Backend & API", "Backend & API"),
                        List.of("C# (.NET)", "Java Spring Boot", "REST API", "Protobuf gRPC", "MongoDB")),
                new TechStackGroup(2,
                        new Localized("Công cụ", "Tools"),
                        List.of("Git", "Docker", "Figma"))
        ));
    }

    // -------------------------------------------------------------------------
    // Projects
    // -------------------------------------------------------------------------

    private void seedProjects() {
        if (projectRepository.count() > 0) {
            return;
        }
        projectRepository.saveAll(List.of(
                new Project(
                        0,
                        "Hajime",
                        "https://github.com/joey-hoagbp/hbp-personal-site/releases/download/hajime-v1.0/hajime-japanese.apk",
                        true,
                        List.of(
                                new Project.Chip("Mobile App", true),
                                new Project.Chip("React Native", false),
                                new Project.Chip("Spring Boot", false),
                                new Project.Chip("MongoDB", false),
                                new Project.Chip("Education", false)
                        ),
                        new Localized(
                                "Ứng dụng học tiếng Nhật cho người mới bắt đầu",
                                "A Japanese-learning app for beginners"
                        ),
                        new Localized(
                                "Ứng dụng di động giúp người Việt học tiếng Nhật từ con số 0 — từ Hiragana, Katakana đến từ vựng và Kanji JLPT N5. Bài học \"dạy rồi kiểm tra\" kết hợp thuật toán lặp lại ngắt quãng (SuperMemo-2) để tối ưu việc ghi nhớ.",
                                "A mobile app that helps Vietnamese speakers learn Japanese from zero — from Hiragana and Katakana to JLPT N5 vocabulary and Kanji. Teach-then-check lessons combine with a spaced-repetition algorithm (SuperMemo-2) to maximize retention."
                        ),
                        new Project.LocalizedList(
                                List.of(
                                        "Học Hiragana, Katakana, Kanji và từ vựng N5",
                                        "Ôn tập flashcard theo thuật toán SM-2 (spaced repetition)",
                                        "Âm thanh và thứ tự nét viết động (KanjiVG)",
                                        "Streak, XP, thành tích và hoạt động offline"
                                ),
                                List.of(
                                        "Learn Hiragana, Katakana, Kanji and N5 vocabulary",
                                        "Flashcard review with the SM-2 spaced-repetition algorithm",
                                        "Audio and animated stroke order (KanjiVG)",
                                        "Streaks, XP, achievements and offline support"
                                )
                        )
                )
        ));
    }

    // -------------------------------------------------------------------------
    // Experience
    // -------------------------------------------------------------------------

    private void seedExperiences() {
        if (experienceRepository.count() > 0) {
            return;
        }
        experienceRepository.saveAll(List.of(
                new Experience(
                        0,
                        new Localized("3/2026 — Nay", "3/2026 — Present"),
                        new Localized("Backend Developer (Java)", "Backend Developer (Java)"),
                        new Localized("DrJoy", "DrJoy"),
                        new Localized("Phát triển backend với Java và Spring Boot.", "Backend development with Java and Spring Boot.")
                ),
                new Experience(
                        1,
                        new Localized("11/2024 — 7/2025", "11/2024 — 7/2025"),
                        new Localized("Backend Developer (C#)", "Backend Developer (C#)"),
                        new Localized("Ominext", "Ominext"),
                        new Localized("Phát triển backend với C# và .NET.", "Backend development with C# and .NET.")
                )
        ));
    }

    // -------------------------------------------------------------------------
    // Education
    // -------------------------------------------------------------------------

    private void seedEducation() {
        if (educationRepository.count() > 0) {
            return;
        }
        educationRepository.saveAll(List.of(
                new Education(
                        0,
                        new Localized("2022 — 2026", "2022 — 2026"),
                        new Localized("Công nghệ thông tin", "Information Technology"),
                        new Localized("ĐH Dân lập Phương Đông", "Phuong Dong University"),
                        new Localized("", "")
                ),
                new Education(
                        1,
                        new Localized("2018 — 2022", "2018 — 2022"),
                        new Localized("Trung học phổ thông", "High School"),
                        new Localized("Trường PT Vùng Cao Việt Bắc", "Viet Bac Highland High School"),
                        new Localized("", "")
                )
        ));
    }
}
