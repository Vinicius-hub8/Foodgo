package br.edu.atitus.apisample.configs;

import br.edu.atitus.apisample.entities.CategoriaRestaurante;
import br.edu.atitus.apisample.entities.Point;
import br.edu.atitus.apisample.entities.User;
import br.edu.atitus.apisample.entities.UserType;
import br.edu.atitus.apisample.repositories.PointRepository;
import br.edu.atitus.apisample.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Popula o banco com dados iniciais ao subir a aplicação:
 * - 1 usuário admin (para gerenciar os pontos pré-cadastrados)
 * - 14 restaurantes de Passo Fundo distribuídos por categoria
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PointRepository pointRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository,
                      PointRepository pointRepository,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.pointRepository = pointRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Evita duplicar dados se já existirem no banco
        if (userRepository.existsByEmail("admin@foodgo.com")) return;

        // ---- Usuário administrador ----
        User admin = new User();
        admin.setName("Admin FoodGo");
        admin.setEmail("admin@foodgo.com");
        admin.setPassword(passwordEncoder.encode("Admin123"));
        admin.setType(UserType.Admin);
        userRepository.save(admin);

        // ---- Restaurantes de Passo Fundo por categoria ----
        List<Point> pontos = List.of(

            // PIZZA
            ponto(-28.2597, -52.4081, "Dom Pizzas — Pizzaria tradicional com sabores variados. Rua Moron, 1200 - Centro", CategoriaRestaurante.pizza, admin),
            ponto(-28.2621, -52.4140, "Bella Napoli — Pizza artesanal com forno a lenha. Av. Brasil Leste, 1400", CategoriaRestaurante.pizza, admin),

            // HAMBURGUER
            ponto(-28.2555, -52.4102, "Burguer Prime — Hambúrgueres artesanais com ingredientes premium. Rua Independência, 876", CategoriaRestaurante.hamburguer, admin),
            ponto(-28.2640, -52.4050, "Classic Burger — Hambúrgueres no estilo americano. Av. Sete de Setembro, 540", CategoriaRestaurante.hamburguer, admin),

            // MEXICANA
            ponto(-28.2580, -52.4120, "El Sombrero — Tacos e burritos autênticos. Rua Capitão Rodrigues, 320 - Centro", CategoriaRestaurante.mexicana, admin),
            ponto(-28.2615, -52.4075, "Taco Loco — Culinária mexicana com opções vegetarianas. Rua General Neto, 210", CategoriaRestaurante.mexicana, admin),

            // JAPONESA
            ponto(-28.2570, -52.4090, "Sushi Fundo — Sushi e temaki frescos. Av. Brasil Oeste, 2200", CategoriaRestaurante.japonesa, admin),
            ponto(-28.2600, -52.4160, "Sakura Japanese Food — Ramen, sushi e hot roll. Rua Paissandu, 650", CategoriaRestaurante.japonesa, admin),

            // CHINESA
            ponto(-28.2590, -52.4055, "China Garden — Buffet e pratos à la carte. Rua Bento Gonçalves, 1100 - Centro", CategoriaRestaurante.chinesa, admin),
            ponto(-28.2648, -52.4115, "Dragão Dourado — Chop suey, frango xadrez e muito mais. Rua Independência, 430", CategoriaRestaurante.chinesa, admin),

            // DOCES
            ponto(-28.2562, -52.4080, "Doceria da Vó — Doces caseiros, bolos e brigadeiros artesanais. Rua Moron, 580", CategoriaRestaurante.doces, admin),
            ponto(-28.2635, -52.4130, "Petit Gateau & Cia — Sobremesas sofisticadas, crepes e sorvetes. Av. Brasil Leste, 980", CategoriaRestaurante.doces, admin),

            // PADARIA
            ponto(-28.2578, -52.4100, "Padaria São Cristóvão — Pão francês quentinho e café da manhã. Rua Paissandu, 200", CategoriaRestaurante.padaria, admin),
            ponto(-28.2608, -52.4068, "Pão Caseiro — Especialidade em pão integral e bolos salgados. Rua Capitão Rodrigues, 750", CategoriaRestaurante.padaria, admin)
        );

        pointRepository.saveAll(pontos);

        System.out.println("==============================================");
        System.out.println("  FoodGo: " + pontos.size() + " restaurantes carregados!");
        System.out.println("  Login admin: admin@foodgo.com / Admin123");
        System.out.println("==============================================");
    }

    private Point ponto(double lat, double lng, String description,
                        CategoriaRestaurante categoria, User user) {
        Point p = new Point();
        p.setLat(lat);
        p.setLng(lng);
        p.setDescription(description);
        p.setCategoria(categoria);
        p.setUser(user);
        return p;
    }
}
