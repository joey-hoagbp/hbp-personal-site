package com.hbp.personalsite;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Verifies the full application context wires up — controller, service, the
 * MongoDB repository proxy, CORS config and validation advice. Spring Data
 * MongoDB connects lazily, so this passes without a running database.
 */
@SpringBootTest
class PersonalSiteApplicationTests {

    @Test
    void contextLoads() {
    }
}
