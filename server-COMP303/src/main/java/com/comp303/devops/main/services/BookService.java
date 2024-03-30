package com.comp303.devops.main.services;

import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.AllArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import com.comp303.devops.main.entities.Book;

@Service
@Transactional
@AllArgsConstructor
public class BookService {
	@Autowired
	private BookRepository bookRepo;
	
	public Flux<Book> getAll() {
		return bookRepo.findAll().switchIfEmpty(Flux.empty());
	}

	public Mono<Book> getById(final String id) {
		return bookRepo.findById(id);
	}
	
	public Mono<Book> save(final Book book) {
		return bookRepo.save(book);
	}
	
	public Mono<Book> update(final String id, final Book book) {
		Mono<Book> dbBook = bookRepo.findById(id);
		
		return dbBook.flatMap(existingBook -> {
            // Update existing book with new values
            existingBook.setTitle(book.getTitle());
            existingBook.setAuthor(book.getAuthor());
            existingBook.setPrice(book.getPrice());
            existingBook.setAvailable(book.isAvailable());
  
            return bookRepo.save(existingBook);
        });
	}
	
	public Mono<Book> delete(final String id) {
		final Mono<Book> book = getById(id);
		if (Objects.isNull(book))
			return Mono.empty();
		
		return getById(id).switchIfEmpty(Mono.empty()).filter(Objects::nonNull).flatMap(bookToBeDeleted -> bookRepo
				.delete(bookToBeDeleted).then(Mono.just(bookToBeDeleted)));
	}
}