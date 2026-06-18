package com.hbp.personalsite.contact;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class ContactService {

    private final ContactRepository repository;
    private final ContactNotifier notifier;

    public ContactService(ContactRepository repository, ContactNotifier notifier) {
        this.repository = repository;
        this.notifier = notifier;
    }

    public ContactMessage save(ContactRequest request) {
        String subject = request.subject() == null || request.subject().isBlank()
                ? null
                : request.subject().trim();

        ContactMessage message = new ContactMessage(
                request.name().trim(),
                request.email().trim(),
                subject,
                request.message().trim(),
                Instant.now()
        );
        ContactMessage saved = repository.save(message);
        notifier.notifyNewMessage(saved);
        return saved;
    }

    public List<ContactMessage> findAll() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }
}
