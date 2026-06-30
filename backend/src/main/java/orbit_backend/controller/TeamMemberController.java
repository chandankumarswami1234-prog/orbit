package orbit_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import orbit_backend.entity.Team;
import orbit_backend.entity.TeamMember;
import orbit_backend.entity.User;
import orbit_backend.repository.TeamMemberRepository;
import orbit_backend.repository.TeamRepository;
import orbit_backend.repository.UserRepository;

@RestController
@RequestMapping("/team-member")
@CrossOrigin("*")
public class TeamMemberController {

    @Autowired
    private TeamMemberRepository teamMemberRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public String createMember(
            @RequestBody TeamMember member) {

        Team team = teamRepository
                .findById(member.getTeam().getId())
                .orElse(null);

        User user = userRepository
                .findById(member.getUser().getId())
                .orElse(null);

        member.setTeam(team);
        member.setUser(user);

        teamMemberRepository.save(member);

        return "Team Member Added Successfully";
    }

    @GetMapping("/all")
    public List<TeamMember> getAllMembers() {
        return teamMemberRepository.findAll();
    }

    @GetMapping("/count")
    public long getCount() {
        return teamMemberRepository.count();
    }

    @DeleteMapping("/{id}")
    public String deleteMember(
            @PathVariable Long id) {

        teamMemberRepository.deleteById(id);

        return "Team Member Deleted";
    }
}
