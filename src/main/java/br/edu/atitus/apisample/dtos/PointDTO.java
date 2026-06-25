package br.edu.atitus.apisample.dtos;

import br.edu.atitus.apisample.entities.CategoriaRestaurante;

public record PointDTO(
        Double lat,
        Double lng,
        String description,
        CategoriaRestaurante categoria
) {}
