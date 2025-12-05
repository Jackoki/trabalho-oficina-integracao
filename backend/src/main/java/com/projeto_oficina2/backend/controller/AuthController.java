package com.projeto_oficina2.backend.controller;

import com.projeto_oficina2.backend.dto.LoginRequest;
import com.projeto_oficina2.backend.dto.LoginResponse;
import com.projeto_oficina2.backend.model.User;
import com.projeto_oficina2.backend.service.JwtService;
import com.projeto_oficina2.backend.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "${frontend.url}", allowCredentials = "true")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        User user = userService.findByCode(request.getAccessCode()).orElse(null);

        if (user == null) {
            return ResponseEntity.status(401)
                    .body(new LoginResponse(false, "Código de acesso inválido", null));
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401)
                    .body(new LoginResponse(false, "Senha inválida", null));
        }

        String token = jwtService.generateToken(user);

        Cookie cookie = new Cookie("ELLPTOKEN", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 24 * 120);
        response.addCookie(cookie);

        return ResponseEntity.ok(new LoginResponse(true, "Login realizado com sucesso", user));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@CookieValue(name = "ELLPTOKEN", required = false) String token) {
        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(401).body("Token não encontrado");
        }

        User user = jwtService.extractUserFromToken(token);
        if (user == null) {
            return ResponseEntity.status(401).body("Token inválido");
        }

        return ResponseEntity.ok(user);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User saved = userService.save(user);
        return ResponseEntity.ok(saved);
    }
}
