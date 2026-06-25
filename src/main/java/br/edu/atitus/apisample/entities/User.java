package br.edu.atitus.apisample.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
// Indica que esta classe representa uma entidade JPA.
// Objetos desta classe poderão ser persistidos em uma tabela do banco.
@Table(name = "tb_user")
// Define explicitamente o nome da tabela no banco.
// Sem essa annotation, o JPA utilizaria o nome da classe como padrão.
public class User implements UserDetails {

    @Id
    // Define o atributo que será a chave primária da tabela.
    @GeneratedValue(strategy = GenerationType.UUID)
    // Faz com que o valor da chave seja gerado automaticamente.
    // Neste caso, será utilizado um UUID ao invés de um número sequencial.
    // UUIDs são úteis em sistemas distribuídos e mais difíceis de serem adivinhados.
    private UUID id;

    @Column(length = 255, nullable = false)
    // Configura características da coluna:
    // - tamanho máximo de 255 caracteres
    // - valor obrigatório (NOT NULL)
    private String name;

    @Column(length = 255, nullable = false, unique = true)
    // Além de obrigatório, o valor deve ser único na tabela.
    // O banco impedirá dois usuários com o mesmo e-mail.
    private String email;

    @Column(length = 100, nullable = false)
    @JsonIgnore
    private String password;

    @Column(nullable = false)
    @Enumerated(EnumType.ORDINAL)
    // Define como o enum será armazenado no banco.
    // ORDINAL salva a posição numérica do enum (0, 1, 2...).
    // Exemplo:
    // ADMIN = 0
    // COMMON = 1
    // Atenção: alterar a ordem dos valores do enum pode corromper os dados.
    private UserType type;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserType getType() {
        return type;
    }

    public void setType(UserType type) {
        this.type = type;
    }
}
