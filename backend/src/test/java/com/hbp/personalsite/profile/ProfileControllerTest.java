package com.hbp.personalsite.profile;

import com.hbp.personalsite.common.ApiExceptionHandler;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProfileController.class)
@Import(ApiExceptionHandler.class)
class ProfileControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProfileService service;

    @Test
    void getProfileReturnsPopulatedBilingualResponse() throws Exception {
        // Build a minimal but representative ProfileResponse covering all four lists
        TechStackGroup techStack = new TechStackGroup();
        techStack.setOrder(0);
        techStack.setLabel(new Localized("Frontend", "Frontend"));
        techStack.setItems(List.of("JavaScript", "TypeScript"));

        Project.Chip chip = new Project.Chip("Mobile App", true);
        Project project = new Project();
        project.setOrder(0);
        project.setTitle("Hajime");
        project.setApkUrl("/hajime-japanese.apk");
        project.setCurrent(true);
        project.setChips(List.of(chip));
        project.setSubtitle(new Localized("Ứng dụng học tiếng Nhật", "A Japanese-learning app"));
        project.setDescription(new Localized("Mô tả tiếng Việt", "English description"));
        project.setFeatures(new Project.LocalizedList(
                List.of("Học Hiragana"),
                List.of("Learn Hiragana")
        ));

        Experience experience = new Experience();
        experience.setOrder(0);
        experience.setDate(new Localized("3/2026 — Nay", "3/2026 — Present"));
        experience.setTitle(new Localized("Backend Developer (Java)", "Backend Developer (Java)"));
        experience.setOrg(new Localized("DrJoy", "DrJoy"));
        experience.setDesc(new Localized("Phát triển backend.", "Backend development."));

        Education education = new Education();
        education.setOrder(0);
        education.setDate(new Localized("2022 — 2026", "2022 — 2026"));
        education.setTitle(new Localized("Công nghệ thông tin", "Information Technology"));
        education.setOrg(new Localized("ĐH Dân lập Phương Đông", "Phuong Dong University"));
        education.setDesc(new Localized("", ""));

        when(service.getProfile()).thenReturn(
                new ProfileService.ProfileResponse(
                        List.of(techStack),
                        List.of(project),
                        List.of(experience),
                        List.of(education)
                )
        );

        mockMvc.perform(get("/api/profile"))
                .andExpect(status().isOk())
                // techStacks
                .andExpect(jsonPath("$.techStacks[0].label.vi").value("Frontend"))
                .andExpect(jsonPath("$.techStacks[0].label.en").value("Frontend"))
                .andExpect(jsonPath("$.techStacks[0].items[0]").value("JavaScript"))
                // projects — bilingual shape + nested types
                .andExpect(jsonPath("$.projects[0].title").value("Hajime"))
                .andExpect(jsonPath("$.projects[0].subtitle.vi").value("Ứng dụng học tiếng Nhật"))
                .andExpect(jsonPath("$.projects[0].subtitle.en").value("A Japanese-learning app"))
                .andExpect(jsonPath("$.projects[0].chips[0].label").value("Mobile App"))
                .andExpect(jsonPath("$.projects[0].chips[0].accent").value(true))
                .andExpect(jsonPath("$.projects[0].features.vi[0]").value("Học Hiragana"))
                .andExpect(jsonPath("$.projects[0].features.en[0]").value("Learn Hiragana"))
                // experiences
                .andExpect(jsonPath("$.experiences[0].org.en").value("DrJoy"))
                .andExpect(jsonPath("$.experiences[0].date.vi").value("3/2026 — Nay"))
                .andExpect(jsonPath("$.experiences[0].date.en").value("3/2026 — Present"))
                // education
                .andExpect(jsonPath("$.education[0].title.vi").value("Công nghệ thông tin"))
                .andExpect(jsonPath("$.education[0].org.en").value("Phuong Dong University"));
    }
}
