FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

COPY pom.xml .
COPY .mvn .mvn
COPY src ./src

# Giảm RAM cho Maven để tránh Railway build OOM
ENV MAVEN_OPTS="-Xmx128m"

RUN mvn -e -X clean package -Dmaven.test.skip=true

FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
