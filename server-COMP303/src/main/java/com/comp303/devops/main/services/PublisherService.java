package com.comp303.devops.main.services;

import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.AllArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import com.comp303.devops.main.entities.Publisher;

@Service
@Transactional
@AllArgsConstructor
public class PublisherService {
	@Autowired
	private PublisherRepository publisherRepo;
	
	public Flux<Publisher> getAll() {
		return publisherRepo.findAll().switchIfEmpty(Flux.empty());
	}

	public Mono<Publisher> getById(final String id) {
		return publisherRepo.findById(id);
	}
	
	public Mono<Publisher> save(final Publisher publisher) {
		return publisherRepo.save(publisher);
	}
	
	public Mono<Publisher> update(final String id, final Publisher publisher) {
		Mono<Publisher> dbPublisher = publisherRepo.findById(id);
		
		return dbPublisher.flatMap(existingPublisher -> {
            // Update existing book with new values
            existingPublisher.setAddress(publisher.getAddress());
            existingPublisher.setPubName(publisher.getPubName());
  
            return publisherRepo.save(existingPublisher);
        });
	}
	
	public Mono<Publisher> delete(final String id) {
		final Mono<Publisher> publisher = getById(id);
		if (Objects.isNull(publisher))
			return Mono.empty();
		
		return getById(id).switchIfEmpty(Mono.empty()).filter(Objects::nonNull).flatMap(publisherToBeDeleted -> publisherRepo
				.delete(publisherToBeDeleted).then(Mono.just(publisherToBeDeleted)));
	}
}
