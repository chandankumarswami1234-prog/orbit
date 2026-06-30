package orbit_backend.controller;

import java.util.List;

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

import orbit_backend.entity.Team;
import orbit_backend.repository.TeamRepository;

@RestController
@RequestMapping("/team")
@CrossOrigin("*")
public class TeamController {

    @Autowired
    private TeamRepository teamRepository;

    @PostMapping("/create")
    public String createTeam(
            @RequestBody Team team) {

        teamRepository.save(team);

        return "Team Created Successfully";
    }

    @GetMapping("/all")
    public List<Team> getAllTeams() {

        return teamRepository.findAll();
    }

    @GetMapping("/{id}")
    public Team getTeamById(
            @PathVariable Long id) {

        return teamRepository
                .findById(id)
                .orElse(null);
    }

    @GetMapping("/count")
    public long getTeamCount() {

        return teamRepository.count();
    }

    @PutMapping("/{id}")
    public String updateTeam(
            @PathVariable Long id,
            @RequestBody Team updatedTeam) {

        Team team = teamRepository
                .findById(id)
                .orElse(null);

        if (team == null) {
            return "Team Not Found";
        }

        team.setName(updatedTeam.getName());
        team.setDescription(updatedTeam.getDescription());

        teamRepository.save(team);

        return "Team Updated Successfully";
    }

    @DeleteMapping("/{id}")
    public String deleteTeam(
            @PathVariable Long id) {

        if (!teamRepository.existsById(id)) {
            return "Team Not Found";
        }

        teamRepository.deleteById(id);

        return "Team Deleted Successfully";
    }
}