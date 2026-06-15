package com.hbp.personalsite.profile;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * A group of technology stack items displayed on the portfolio, e.g. "Frontend" or "Tools".
 */
@Document(collection = "tech_stacks")
public class TechStackGroup {

    @Id
    private String id;

    private int order;
    private Localized label;
    private List<String> items;

    public TechStackGroup() {
    }

    public TechStackGroup(int order, Localized label, List<String> items) {
        this.order = order;
        this.label = label;
        this.items = items;
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

    public Localized getLabel() {
        return label;
    }

    public void setLabel(Localized label) {
        this.label = label;
    }

    public List<String> getItems() {
        return items;
    }

    public void setItems(List<String> items) {
        this.items = items;
    }
}
