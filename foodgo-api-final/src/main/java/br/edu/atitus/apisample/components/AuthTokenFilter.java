package br.edu.atitus.apisample.components;

import br.edu.atitus.apisample.services.UserService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class AuthTokenFilter extends OncePerRequestFilter {

    private final UserService userService;

    public AuthTokenFilter(UserService userService) {
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        
        String token = JwtUtil.getJwtFromRequest(request);
        if (token != null){
            Claims payload = JwtUtil.validateToken(token);
            if (payload != null) {
                String email = payload.get("email", String.class);
                var userAuth = userService.loadUserByUsername(email);
                // Aqui estou definindo que esta requisição está autenticada
                //    e autenticada com este usuário "userAuth"
                SecurityContextHolder.getContext()
                        .setAuthentication(new UsernamePasswordAuthenticationToken(userAuth, null, null));
            }
        }
        filterChain.doFilter(request, response);
    }
}
