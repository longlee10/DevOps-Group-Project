package com.comp303.devops.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import lombok.AllArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import com.comp303.devops.main.services.PublisherService;
import com.comp303.devops.main.entities.Publisher;

@RequestMapping("publisher")
@AllArgsConstructor
@RestController
public class PublisherController {
	@Autowired
	private PublisherService publisherService;
	
	@CrossOrigin
	@GetMapping
	public Flux<Publisher> getAll() {
		System.out.println("All the employee information");
		return publisherService.getAll();
	}
	
	@GetMapping("{id}")
	public Mono<Publisher> getById(@PathVariable("id") final String id) {
		System.out.println("One employee information based for the given ID");
		return publisherService.getById(id);
	}
	
	@CrossOrigin
	@PostMapping
	public Mono<Publisher> save(@RequestBody final Publisher publisher) {
		return publisherService.save(publisher);
	}
	
	@PutMapping("{id}")
	public Mono<Publisher> updateById(@PathVariable("id") final String id, @RequestBody final Publisher publisher) {
		return publisherService.update(id, publisher);
	}
	
	@CrossOrigin
	@DeleteMapping("{id}")
	public Mono<Publisher> delete(@PathVariable final String id) {
		return publisherService.delete(id);
	}
}
