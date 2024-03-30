package com.comp303.devops.main.services;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import com.comp303.devops.main.entities.Publisher;

@Repository
public interface PublisherRepository extends ReactiveMongoRepository<Publisher, String>{
}
