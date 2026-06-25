package br.edu.atitus.apisample.controllers;

import br.edu.atitus.apisample.components.JwtUtil;
import br.edu.atitus.apisample.dtos.SigninDTO;
import br.edu.atitus.apisample.dtos.SignupDTO;
import br.edu.atitus.apisample.entities.User;
import br.edu.atitus.apisample.entities.UserType;
import br.edu.atitus.apisample.services.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationConfiguration auth;

    public AuthController(UserService userService, AuthenticationConfiguration auth) {
        this.userService = userService;
        this.auth = auth;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> postSignup(@RequestBody SignupDTO dto) throws Exception {
        User newUser = new User();
        BeanUtils.copyProperties(dto, newUser);
        newUser.setType(UserType.Common);
        userService.save(newUser);
        return ResponseEntity.status(201).body(newUser);
    }

    @PostMapping("/signin")
    public ResponseEntity<String> postSignin(@RequestBody SigninDTO dto) throws Exception {
        auth.getAuthenticationManager()
                .authenticate(new UsernamePasswordAuthenticationToken(dto.email(), dto.password()));

        User user = (User) this.userService.loadUserByUsername(dto.email());

        String jwt = JwtUtil.generateToken(user.getEmail(), user.getId(),user.getType());

        return ResponseEntity.ok(jwt);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> excpetionHandler(Exception ex){
        String message = ex.getMessage().replace("\r\n", "");
        return ResponseEntity.badRequest().body(message);
    }
}
