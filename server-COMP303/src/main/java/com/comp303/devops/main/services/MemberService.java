package com.comp303.devops.main.services;

import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.AllArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import com.comp303.devops.main.entities.Member;

@Service
@Transactional
@AllArgsConstructor
public class MemberService {
	@Autowired
	private MemberRepository memberRepo;
	
	public Flux<Member> getAll() {
		return memberRepo.findAll().switchIfEmpty(Flux.empty());
	}

	public Mono<Member> getById(final String id) {
		return memberRepo.findById(id);
	}
	
	public Mono<Member> save(final Member member) {
		return memberRepo.save(member);
	}
	
	public Mono<Member> update(final String id, final Member member) {
		Mono<Member> dbMember = memberRepo.findById(id);
		
		return dbMember.flatMap(existingMember -> {
            // Update existing member
            existingMember.setMemberDate(member.getMemberDate());
            existingMember.setMemberType(member.getMemberType());
            existingMember.setAddress(member.getAddress());
            existingMember.setName(member.getName());
            existingMember.setExpiryDate(member.getExpiryDate());
  
            return memberRepo.save(existingMember);
        });
	}
	
	public Mono<Member> delete(final String id) {
		final Mono<Member> member = getById(id);
		if (Objects.isNull(member))
			return Mono.empty();
		
		return getById(id).switchIfEmpty(Mono.empty()).filter(Objects::nonNull).flatMap(memberToBeDeleted -> memberRepo
				.delete(memberToBeDeleted).then(Mono.just(memberToBeDeleted)));
	}
}
