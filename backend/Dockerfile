# syntax=docker/dockerfile:1

# Render has no native Java runtime, so the API ships as a container.
# Build context is this directory (backend/). Mirrors HajimeJapanese/backend/Dockerfile.

# ---- build ----------------------------------------------------------------
# No Maven wrapper in this repo, so the build stage brings its own Maven.
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /build

# Resolve dependencies in their own layer so code-only changes reuse the cache.
COPY pom.xml .
RUN mvn -B -ntp dependency:go-offline

COPY src/ src/
# Tests run in CI and locally (`mvn test`); the deploy image only needs the jar.
RUN mvn -B -ntp -DskipTests package

# ---- run ------------------------------------------------------------------
FROM eclipse-temurin:21-jre AS runtime
WORKDIR /app

# Exactly one jar matches: spring-boot-maven-plugin leaves the plain build
# output as *.jar.original, which this glob does not pick up.
COPY --from=build /build/target/*.jar app.jar

# Render sets PORT (default 10000); application.yml reads it.
EXPOSE 10000

# The default max heap is 1/4 of container memory, which wastes most of a
# 512 MB instance. Let the JVM use most of what it is actually given.
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-jar", "/app/app.jar"]
