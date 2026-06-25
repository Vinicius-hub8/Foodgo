package br.edu.atitus.apisample.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "tb_point")
public class Point {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private Double lat;

    @Column(nullable = false)
    private Double lng;

    @Column(length = 255)
    private String description;

    // Categoria do restaurante (hamburguer, pizza, mexicana, etc.)
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CategoriaRestaurante categoria;

    // Relacionamento com o usuário dono do ponto
    // JsonIgnore para não expor o objeto User completo na resposta
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    // Expõe apenas o ID do usuário dono na resposta JSON
    public UUID getUserId() {
        return user != null ? user.getId() : null;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Double getLat() { return lat; }
    public void setLat(Double lat) { this.lat = lat; }

    public Double getLng() { return lng; }
    public void setLng(Double lng) { this.lng = lng; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public CategoriaRestaurante getCategoria() { return categoria; }
    public void setCategoria(CategoriaRestaurante categoria) { this.categoria = categoria; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
