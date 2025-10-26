package com.projeto_oficina2.backend.service;

import com.projeto_oficina2.backend.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private final String SECRET_KEY = "PROJETO_OFICINA_INTEGRACAO_2_QUE_DEVE_SER_LONGA_32_CHARS";
    private final long EXPIRATION_MS = 24L * 60 * 60 * 1000 * 120;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // Gera token JWT
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getCode())
                .claim("fullName", user.getName())
                .claim("userType", user.getUserType().getName())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String getAccessCode(String token) {
        return getClaims(token).getSubject();
    }
}
