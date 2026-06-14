package com.hbp.personalsite.contact;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService service;

    public ContactController(ContactService service) {
        this.service = service;
    }

    /** Stores a message submitted through the site's contact form. */
    @PostMapping
    public ResponseEntity<ContactAck> submit(@Valid @RequestBody ContactRequest request) {
        ContactMessage saved = service.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ContactAck.received(saved));
    }

    /**
     * Lists stored messages, newest first.
     *
     * NOTE: This is open for local development convenience. Before exposing the
     * API publicly, put this endpoint behind authentication (e.g. Spring Security).
     */
    @GetMapping
    public List<ContactMessage> list() {
        return service.findAll();
    }
}
