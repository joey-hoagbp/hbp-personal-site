package com.hbp.personalsite.contact;

import java.time.Instant;

/**
 * Lightweight confirmation returned after a contact message is stored.
 * Avoids echoing the full submitted payload back to the client.
 */
public record ContactAck(String id, String status, Instant receivedAt) {

    static ContactAck received(ContactMessage saved) {
        return new ContactAck(saved.getId(), "received", saved.getCreatedAt());
    }
}
