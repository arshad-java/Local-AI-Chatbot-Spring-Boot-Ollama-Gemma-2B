package com.arshad.ai;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ChatController {

    private final Deque<String> lastQuestions = new ArrayDeque<>(5);
    private final WebClient client = WebClient.create("http://localhost:11434/api/generate");

    @PostMapping
    public ResponseEntity<String> chat(@RequestBody String userInput) {
        saveQuestion(userInput);
        String reply = askOllama(userInput).block();
        return ResponseEntity.ok(reply);
    }

    private void saveQuestion(String question) {
        if (lastQuestions.size() == 5) {
            lastQuestions.removeFirst();
        }
        lastQuestions.addLast(question);
    }

    @GetMapping("/history")
    public ResponseEntity<?> getHistory() {
        return ResponseEntity.ok(lastQuestions);
    }

    public Mono<String> askOllama(String prompt) {
        Map<String, Object> request = Map.of(
            "model", "gemma:2b",
            "prompt", prompt,
            "stream", false
        );

        return client.post()
            .header(HttpHeaders.CONTENT_TYPE, "application/json")
            .bodyValue(request)
            .retrieve()
            .bodyToMono(String.class);
    }
}
