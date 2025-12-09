# Build stage: Dùng Maven để build code ra file .jar
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# Build bỏ qua test để tiết kiệm thời gian (có thể bỏ -DskipTests nếu muốn chạy test)
RUN mvn clean package -DskipTests

# Run stage: Dùng JDK nhỏ gọn để chạy ứng dụng
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/shop-phone-0.0.1-SNAPSHOT.jar app.jar

# Railway sẽ cấp PORT qua biến môi trường, nhưng ta cứ EXPOSE 8080 để tường minh
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]