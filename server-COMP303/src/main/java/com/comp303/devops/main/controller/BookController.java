package com.comp303.devops.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import com.comp303.devops.main.services.BookService;
import com.comp303.devops.main.entities.Book;
 

@RequestMapping("book")
@AllArgsConstructor
@RestController
public class BookController {
	@Autowired
	private BookService bookService;
	
	@CrossOrigin
	@GetMapping
	public Flux<Book> getAll() {
		System.out.println("All the employee information");
		return bookService.getAll();
	}
	
	@CrossOrigin
	@GetMapping("{id}")
	public Mono<Book> getById(@PathVariable("id") final String id) {
		System.out.println("One employee information based for the given ID");
		return bookService.getById(id);
	}
	
	@CrossOrigin
	@PostMapping
	public Mono<Book> save(@RequestBody final Book book) {
		return bookService.save(book);
				
	}
	
	@CrossOrigin
	@PutMapping("{id}")
	public Mono<Book> updateById(@PathVariable("id") final String id, @RequestBody final Book book) {
		return bookService.update(id, book);
	}
	
	@CrossOrigin
	@DeleteMapping("{id}")
	public Mono<Book> delete(@PathVariable final String id) {
		return bookService.delete(id);
	}
}