# Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

COPY pom.xml .
COPY src ./src

ENV MAVEN_OPTS="-Xmx256m"

RUN mvn -e -X clean package -Dmaven.test.skip=true

# Run stage (KHÔNG DÙNG ALPINE)
FROM eclipse-temurin:17-jdk
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
