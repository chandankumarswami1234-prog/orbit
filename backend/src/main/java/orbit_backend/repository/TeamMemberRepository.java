package orbit_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import orbit_backend.entity.TeamMember;

public interface TeamMemberRepository
        extends JpaRepository<TeamMember, Long> {

}