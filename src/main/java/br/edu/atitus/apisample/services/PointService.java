package br.edu.atitus.apisample.services;

import br.edu.atitus.apisample.entities.CategoriaRestaurante;
import br.edu.atitus.apisample.entities.Point;
import br.edu.atitus.apisample.entities.User;
import br.edu.atitus.apisample.repositories.PointRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PointService {

    private final PointRepository repository;

    public PointService(PointRepository repository) {
        this.repository = repository;
    }

    // POST: salva novo ponto para o usuário logado
    public Point save(Point newPoint, User loggedUser) throws Exception {
        if (newPoint.getLat() == null || newPoint.getLng() == null)
            throw new Exception("Latitude e longitude são obrigatórias!");

        if (newPoint.getLat() < -90 || newPoint.getLat() > 90)
            throw new Exception("Latitude inválida! Deve estar entre -90 e 90.");

        if (newPoint.getLng() < -180 || newPoint.getLng() > 180)
            throw new Exception("Longitude inválida! Deve estar entre -180 e 180.");

        if (newPoint.getCategoria() == null)
            throw new Exception("Categoria é obrigatória!");

        newPoint.setUser(loggedUser);
        return repository.save(newPoint);
    }

    // GET: retorna apenas pontos do usuário logado
    public List<Point> findByUser(User loggedUser) {
        return repository.findByUser(loggedUser);
    }

    // GET por categoria: retorna todos os pontos daquela categoria (para o mapa público)
    public List<Point> findByCategoria(CategoriaRestaurante categoria) {
        return repository.findByCategoria(categoria);
    }

    // GET todos (sem filtro de usuário - para exibição no mapa)
    public List<Point> findAll() {
        return repository.findAll();
    }

    // PUT: atualiza ponto — verifica existência e propriedade
    public Point update(UUID id, Point updatedData, User loggedUser) throws Exception {
        // Verifica se o ponto existe
        Point existing = repository.findById(id)
                .orElseThrow(() -> new Exception("Ponto não encontrado!"));

        // Verifica se o ponto pertence ao usuário logado
        if (!existing.getUser().getId().equals(loggedUser.getId()))
            throw new Exception("Acesso negado! Este ponto não pertence ao usuário logado.");

        // Atualiza os dados (mesmo DTO do POST)
        if (updatedData.getLat() == null || updatedData.getLng() == null)
            throw new Exception("Latitude e longitude são obrigatórias!");

        if (updatedData.getLat() < -90 || updatedData.getLat() > 90)
            throw new Exception("Latitude inválida! Deve estar entre -90 e 90.");

        if (updatedData.getLng() < -180 || updatedData.getLng() > 180)
            throw new Exception("Longitude inválida! Deve estar entre -180 e 180.");

        if (updatedData.getCategoria() == null)
            throw new Exception("Categoria é obrigatória!");

        existing.setLat(updatedData.getLat());
        existing.setLng(updatedData.getLng());
        existing.setDescription(updatedData.getDescription());
        existing.setCategoria(updatedData.getCategoria());

        return repository.save(existing);
    }

    // DELETE: remove ponto — verifica existência e propriedade
    public void delete(UUID id, User loggedUser) throws Exception {
        Point existing = repository.findById(id)
                .orElseThrow(() -> new Exception("Ponto não encontrado!"));

        if (!existing.getUser().getId().equals(loggedUser.getId()))
            throw new Exception("Acesso negado! Este ponto não pertence ao usuário logado.");

        repository.delete(existing);
    }
}
