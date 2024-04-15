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

import lombok.AllArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import com.comp303.devops.main.services.MemberService;
import com.comp303.devops.main.entities.Member;

@RequestMapping("member")
@AllArgsConstructor
@RestController
public class MemberController {
	@Autowired
	private MemberService memberService;
	
	@CrossOrigin
	@GetMapping
	public Flux<Member> getAll() {
		System.out.println("All the employee information");
		return memberService.getAll();
	}
	
	@CrossOrigin
	@GetMapping("{id}")
	public Mono<Member> getById(@PathVariable("id") final String id) {
		System.out.println("One employee information based for the given ID");
		return memberService.getById(id);
	}
	
	@CrossOrigin
	@PostMapping
	public Mono<Member> save(@RequestBody final Member member) {
		return memberService.save(member);
	}
	
	@CrossOrigin
	@PutMapping("{id}")
	public Mono<Member> updateById(@PathVariable("id") final String id, @RequestBody final Member member) {
		return memberService.update(id, member);
	}
	
	@CrossOrigin
	@DeleteMapping("{id}")
	public Mono<Member> delete(@PathVariable final String id) {
		return memberService.delete(id);
	}
}