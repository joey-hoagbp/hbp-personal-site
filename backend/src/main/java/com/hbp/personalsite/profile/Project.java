package com.hbp.personalsite.profile;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * A portfolio project entry, with bilingual subtitle, description, and feature list.
 */
@Document(collection = "projects")
public class Project {

    /**
     * A label chip displayed on the project card. {@code accent} controls highlight styling.
     */
    public record Chip(String label, boolean accent) {
    }

    /**
     * A bilingual list of feature bullet points.
     */
    public record LocalizedList(List<String> vi, List<String> en) {
    }

    @Id
    private String id;

    private int order;
    private String title;
    private String apkUrl;
    private boolean current;
    private List<Chip> chips;
    private Localized subtitle;
    private Localized description;
    private LocalizedList features;

    public Project() {
    }

    public Project(int order, String title, String apkUrl, boolean current,
                   List<Chip> chips, Localized subtitle, Localized description, LocalizedList features) {
        this.order = order;
        this.title = title;
        this.apkUrl = apkUrl;
        this.current = current;
        this.chips = chips;
        this.subtitle = subtitle;
        this.description = description;
        this.features = features;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getApkUrl() {
        return apkUrl;
    }

    public void setApkUrl(String apkUrl) {
        this.apkUrl = apkUrl;
    }

    public boolean isCurrent() {
        return current;
    }

    public void setCurrent(boolean current) {
        this.current = current;
    }

    public List<Chip> getChips() {
        return chips;
    }

    public void setChips(List<Chip> chips) {
        this.chips = chips;
    }

    public Localized getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(Localized subtitle) {
        this.subtitle = subtitle;
    }

    public Localized getDescription() {
        return description;
    }

    public void setDescription(Localized description) {
        this.description = description;
    }

    public LocalizedList getFeatures() {
        return features;
    }

    public void setFeatures(LocalizedList features) {
        this.features = features;
    }
}
