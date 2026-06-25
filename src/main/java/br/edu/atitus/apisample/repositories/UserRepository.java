package br.edu.atitus.apisample.repositories;

import br.edu.atitus.apisample.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository //Somente a título de informação
// Indica que este componente pertence à camada de acesso a dados.
// Sua responsabilidade é realizar operações de persistência no banco.
// Também permite ao Spring tratar exceções relacionadas ao acesso aos dados.
public interface UserRepository extends JpaRepository<User, UUID> {
    // JpaRepository já fornece diversos métodos prontos:
    //
    // save(user)         -> salva ou atualiza um registro
    // findById(id)       -> busca pelo ID
    // findAll()          -> retorna todos os registros
    // delete(user)       -> remove um registro
    // deleteById(id)     -> remove pelo ID
    // existsById(id)     -> verifica se existe
    //
    // Não precisamos implementar esses métodos.
    // O Spring cria a implementação automaticamente em tempo de execução.

    // Select count(*) from tb_user where email = {}
    Boolean existsByEmail(String email);

    // Select count(*) from tb_user where email = {} and name = {}
    Boolean existsByEmailAndName(String email, String name);

    // Select * from tb_user where email = {}
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.password = 'algumacoisa'")
    List<User> listaParaRelatorio();
}