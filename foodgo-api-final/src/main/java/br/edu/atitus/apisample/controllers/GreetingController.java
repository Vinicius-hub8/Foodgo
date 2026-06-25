package br.edu.atitus.apisample.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
// Define uma Controller REST.
// Métodos desta classe poderão responder requisições HTTP.
// O retorno é enviado diretamente na resposta da API.
@RequestMapping("/greeting")
// Define o caminho base para todas as rotas desta Controller.
// Neste caso, todas começam com /greeting.
public class GreetingController {

    @GetMapping({"","/", "/{namePath}"})
    // Mapeia requisições HTTP GET.
    // Aceita:
    // GET /greeting
    // GET /greeting/
    // GET /greeting/Luciano
    public ResponseEntity<String> getGreeting(
            @RequestParam(required = false) String name,
            // Obtém um parâmetro da URL.
            // Exemplo:
            // GET /greeting?name=Luciano
            @PathVariable(required = false) String namePath
            // Obtém um valor diretamente da rota.
            // Exemplo:
            // GET /greeting/Luciano
            ) {

        if (name ==  null)
            name = namePath != null ? namePath : "World";
        String greeting = String.format("%s %s!", "Hello", name);
        return ResponseEntity.ok(greeting);
        // Retorna:
        // HTTP 200 OK
        // Corpo: Hello Luciano!
    }

    @PostMapping
    // Mapeia requisições HTTP POST.
    // Geralmente utilizado para criar novos recursos.
    public ResponseEntity<String> postGreeting(
            @RequestBody String user
            // Obtém o conteúdo enviado no corpo da requisição.
            ) throws Exception{
        if (user.length() > 50)
            throw new Exception("Corpo da requisição não pode ser maior que 50");

        return ResponseEntity.created(null).body(user);
        // ResponseEntity permite controlar completamente a resposta HTTP.
        //
        // created(...) -> HTTP 201 Created
        // body(...)    -> conteúdo retornado ao cliente
        //
        // Equivalente:
        // Status: 201
        // Body: conteúdo enviado na requisição

        // Outra possibilidade:
        // return ResponseEntity.status(201).body(user);
    }

    @ExceptionHandler(Exception.class)
    // Sempre que uma Exception ocorrer dentro desta Controller,
    // este método será executado automaticamente.
    public ResponseEntity<String> excpetionHandler(Exception ex){
        String message = ex.getMessage().replace("\r\n", "");
        return ResponseEntity.badRequest().body(message);
        // Retorna:
        // HTTP 400 Bad Request
        // Corpo: mensagem da exceção
    }
}
