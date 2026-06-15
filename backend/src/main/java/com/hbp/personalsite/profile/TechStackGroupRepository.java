package com.hbp.personalsite.profile;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TechStackGroupRepository extends MongoRepository<TechStackGroup, String> {

    List<TechStackGroup> findAllByOrderByOrderAsc();
}
