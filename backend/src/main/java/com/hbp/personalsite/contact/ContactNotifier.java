package com.hbp.personalsite.contact;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

/**
 * Sends an email notification to the site owner when a new contact message is submitted.
 *
 * <p>The {@link JavaMailSender} is injected via an {@link ObjectProvider} so it remains
 * optional: when mail is not configured (no {@code MAIL_HOST} etc.), Spring Boot does not
 * auto-create the sender bean, and this component still starts and simply skips sending.
 */
@Component
public class ContactNotifier {

    private static final Logger log = LoggerFactory.getLogger(ContactNotifier.class);

    private final ObjectProvider<JavaMailSender> mailSenderProvider;
    private final boolean enabled;
    private final String from;
    private final String to;

    public ContactNotifier(
            ObjectProvider<JavaMailSender> mailSenderProvider,
            @Value("${app.mail.enabled}") boolean enabled,
            @Value("${app.mail.from}") String from,
            @Value("${app.mail.to}") String to) {
        this.mailSenderProvider = mailSenderProvider;
        this.enabled = enabled;
        this.from = from;
        this.to = to;
    }

    /**
     * Sends a notification email for a newly persisted contact message. Never throws:
     * any failure is logged and swallowed so the HTTP response stays 201.
     */
    public void notifyNewMessage(ContactMessage message) {
        if (!enabled || isBlank(to) || isBlank(from)) {
            log.debug("Contact notification skipped (enabled={}, from blank={}, to blank={})",
                    enabled, isBlank(from), isBlank(to));
            return;
        }

        JavaMailSender mailSender = mailSenderProvider.getIfAvailable();
        if (mailSender == null) {
            log.info("Contact notification skipped: no JavaMailSender configured (mail not set up).");
            return;
        }

        try {
            String subject = message.getSubject() == null || message.getSubject().isBlank()
                    ? "(no subject)"
                    : message.getSubject();

            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setFrom(from);
            mail.setTo(to);
            mail.setReplyTo(message.getEmail());
            mail.setSubject("[Portfolio contact] " + subject);
            mail.setText(buildBody(message, subject));

            mailSender.send(mail);
            log.info("Contact notification email sent to {}", to);
        } catch (Exception e) {
            log.error("Failed to send contact notification email; message is already persisted.", e);
        }
    }

    private String buildBody(ContactMessage message, String subject) {
        return "New contact form submission:\n\n"
                + "Name:    " + message.getName() + "\n"
                + "Email:   " + message.getEmail() + "\n"
                + "Subject: " + subject + "\n"
                + "Sent at: " + message.getCreatedAt() + "\n\n"
                + "Message:\n"
                + message.getMessage() + "\n";
    }

    private static boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}
