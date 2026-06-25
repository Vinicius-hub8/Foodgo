package br.edu.atitus.apisample.controllers;

import br.edu.atitus.apisample.dtos.PointDTO;
import br.edu.atitus.apisample.entities.CategoriaRestaurante;
import br.edu.atitus.apisample.entities.Point;
import br.edu.atitus.apisample.entities.User;
import br.edu.atitus.apisample.services.PointService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/ws/point")
public class PointController {

    private final PointService pointService;

    public PointController(PointService pointService) {
        this.pointService = pointService;
    }

    // Retorna o usuário logado a partir do token JWT
    private User getLoggedUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    // POST /ws/point — cria novo ponto para o usuário logado
    @PostMapping
    public ResponseEntity<Point> post(@RequestBody PointDTO dto) throws Exception {
        Point newPoint = new Point();
        newPoint.setLat(dto.lat());
        newPoint.setLng(dto.lng());
        newPoint.setDescription(dto.description());
        newPoint.setCategoria(dto.categoria());

        Point saved = pointService.save(newPoint, getLoggedUser());
        return ResponseEntity.status(201).body(saved);
    }

    // GET /ws/point — retorna SOMENTE os pontos do usuário logado
    @GetMapping
    public ResponseEntity<List<Point>> get() {
        List<Point> points = pointService.findByUser(getLoggedUser());
        return ResponseEntity.ok(points);
    }

    // GET /ws/point/all — retorna TODOS os pontos cadastrados (mapa público, sem filtro de usuário)
    @GetMapping("/all")
    public ResponseEntity<List<Point>> getAll() {
        List<Point> points = pointService.findAll();
        return ResponseEntity.ok(points);
    }

    // GET /ws/point/categoria/{categoria} — retorna todos os pontos de uma categoria (para o mapa)
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<Point>> getByCategoria(@PathVariable CategoriaRestaurante categoria) {
        List<Point> points = pointService.findByCategoria(categoria);
        return ResponseEntity.ok(points);
    }

    // PUT /ws/point/{id} — atualiza ponto (verifica existência e dono)
    @PutMapping("/{id}")
    public ResponseEntity<Point> put(@PathVariable UUID id, @RequestBody PointDTO dto) throws Exception {
        Point updatedData = new Point();
        updatedData.setLat(dto.lat());
        updatedData.setLng(dto.lng());
        updatedData.setDescription(dto.description());
        updatedData.setCategoria(dto.categoria());

        Point updated = pointService.update(id, updatedData, getLoggedUser());
        return ResponseEntity.ok(updated);
    }

    // DELETE /ws/point/{id} — remove ponto (verifica existência e dono)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) throws Exception {
        pointService.delete(id, getLoggedUser());
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> exceptionHandler(Exception ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
}
