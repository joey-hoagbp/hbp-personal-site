package com.hbp.personalsite.profile;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EducationRepository extends MongoRepository<Education, String> {

    List<Education> findAllByOrderByOrderAsc();
}
