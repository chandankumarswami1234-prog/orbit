package orbit_backend.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import orbit_backend.entity.User;
import orbit_backend.repository.UserRepository;
import orbit_backend.security.JwtUtil;


@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/")
    public String home() {
        return "Orbit Backend Running Successfully!";
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {

        if (user.getPassword() == null ||
                user.getPassword().length() < 8) {

            return "Password must be at least 8 characters";
        }

        user.setPassword(
                encoder.encode(user.getPassword()));

        userRepository.save(user);

        return "User Registered Successfully";
    }

 

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    public User getUserById(
            @PathVariable Long id) {

        return userRepository
                .findById(id)
                .orElse(null);
    }

    @GetMapping("/count")
    public long getUserCount() {
        return userRepository.count();
    }

    @GetMapping("/all")
    public List<User> getAllUsersForTeamMember() {
        return userRepository.findAll();
    }

    @PutMapping("/user/{id}")
    public String updateUser(
            @PathVariable Long id,
            @RequestBody User updatedUser) {

        User user =
                userRepository.findById(id)
                        .orElse(null);

        if (user == null) {
            return "User Not Found";
        }

        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());

        if (updatedUser.getPassword() != null
                && !updatedUser.getPassword().isEmpty()) {

            user.setPassword(
                    encoder.encode(
                            updatedUser.getPassword()));
        }

        userRepository.save(user);

        return "User Updated Successfully";
    }

    @DeleteMapping("/user/{id}")
    public String deleteUser(
            @PathVariable Long id) {

        if (!userRepository.existsById(id)) {
            return "User Not Found";
        }

        userRepository.deleteById(id);

        return "User Deleted Successfully";
    }

    @PostMapping("/login")
    public Map<String, String> login(
            @RequestBody User loginUser) {

       User user = userRepository
        .findByEmail(loginUser.getEmail())
        .orElse(null);
        if (user == null) {

            Map<String, String> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "Invalid Email or Password");

            return response;
        }

        boolean matched =
                encoder.matches(
                        loginUser.getPassword(),
                        user.getPassword());

        if (!matched) {

            Map<String, String> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "Invalid Email or Password");

            return response;
        }

        String token =
                jwtUtil.generateToken(
                        user.getEmail());

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "message",
                "Login Successful");

        response.put(
                "token",
                token);

        return response;
    }


// =======================
// GET PROFILE
// =======================

@GetMapping("/profile")
public User getProfile(Principal principal) {

    Optional<User> user =
            userRepository.findByEmail(principal.getName());

    return user.orElse(null);
}


// =======================
// UPDATE PROFILE
// =======================

@PutMapping("/profile")
public String updateProfile(
        Principal principal,
        @RequestBody User updatedUser) {

    User user = userRepository
            .findByEmail(principal.getName())
            .orElse(null);

    if (user == null) {
        return "User Not Found";
    }

    user.setName(updatedUser.getName());
    user.setEmail(updatedUser.getEmail());

    userRepository.save(user);

    return "Profile Updated Successfully";
}


// =======================
// CHANGE PASSWORD
// =======================

@PutMapping("/change-password")
public String changePassword(
        Principal principal,
        @RequestBody Map<String, String> body) {

    User user = userRepository
            .findByEmail(principal.getName())
            .orElse(null);

    if (user == null) {
        return "User Not Found";
    }

    String oldPassword = body.get("oldPassword");
    String newPassword = body.get("newPassword");

    if (!encoder.matches(oldPassword, user.getPassword())) {
        return "Old Password Incorrect";
    }

    if (newPassword.length() < 8) {
        return "Password must be at least 8 characters";
    }

    user.setPassword(
            encoder.encode(newPassword));

    userRepository.save(user);

    return "Password Changed Successfully";
}


}




   /* 
@PostMapping("/login")
public Map<String, String> login(
        @RequestBody User loginUser) {

    User user = userRepository.findAll()
            .stream()
            .filter(u -> u.getEmail()
                    .equals(loginUser.getEmail()))
            .findFirst()
            .orElse(null);

    if (user == null) {
        return Map.of(
                "message",
                "Invalid Email or Password");
    }

    boolean matched =
            encoder.matches(
                    loginUser.getPassword(),
                    user.getPassword());

    if (!matched) {
        return Map.of(
                "message",
                "Invalid Email or Password");
    }

    String token =
            jwtUtil.generateToken(
                    user.getEmail());

    return Map.of(
            "message", "Login Successful",
            "token", token);
}

}
*/
