package br.edu.atitus.apisample.repositories;

import br.edu.atitus.apisample.entities.CategoriaRestaurante;
import br.edu.atitus.apisample.entities.Point;
import br.edu.atitus.apisample.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PointRepository extends JpaRepository<Point, UUID> {

    // Retorna apenas os pontos do usuário logado
    List<Point> findByUser(User user);

    // Retorna pontos do usuário logado filtrados por categoria
    List<Point> findByUserAndCategoria(User user, CategoriaRestaurante categoria);

    // Retorna TODOS os pontos de uma categoria (usado para exibir no mapa público)
    List<Point> findByCategoria(CategoriaRestaurante categoria);
}
