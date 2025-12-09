# Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src

# Tối ưu: Giới hạn RAM cho Maven để không bị Railway kill process
ENV MAVEN_OPTS="-Xmx512m"

# Tối ưu: Dùng -Dmaven.test.skip=true để bỏ qua hẳn việc COMPLIE Test (nhanh hơn, ít lỗi hơn)
RUN mvn clean package -Dmaven.test.skip=true

# Run stage
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/shop-phone-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]