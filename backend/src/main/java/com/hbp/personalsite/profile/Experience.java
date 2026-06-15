package com.hbp.personalsite.profile;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * A professional experience entry on the portfolio.
 */
@Document(collection = "experiences")
public class Experience {

    @Id
    private String id;

    private int order;
    private Localized date;
    private Localized title;
    private Localized org;
    private Localized desc;

    public Experience() {
    }

    public Experience(int order, Localized date, Localized title, Localized org, Localized desc) {
        this.order = order;
        this.date = date;
        this.title = title;
        this.org = org;
        this.desc = desc;
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

    public Localized getDate() {
        return date;
    }

    public void setDate(Localized date) {
        this.date = date;
    }

    public Localized getTitle() {
        return title;
    }

    public void setTitle(Localized title) {
        this.title = title;
    }

    public Localized getOrg() {
        return org;
    }

    public void setOrg(Localized org) {
        this.org = org;
    }

    public Localized getDesc() {
        return desc;
    }

    public void setDesc(Localized desc) {
        this.desc = desc;
    }
}
