package com.hbp.personalsite.profile;

/**
 * An embedded bilingual string — Vietnamese and English variants of the same text.
 * Used as a value type inside all profile documents.
 */
public record Localized(String vi, String en) {
}
