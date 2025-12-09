# --- Stage 1: Build bằng Maven ---
FROM maven:3.9-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY . .
# Lệnh này sẽ đóng gói code thành file .jar và bỏ qua bước test để build nhanh hơn
RUN mvn clean package -DskipTests

# --- Stage 2: Chạy ứng dụng ---
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Copy file .jar từ Stage 1 sang Stage 2 (đổi tên thành app.jar cho gọn)
COPY --from=build /app/target/*.jar app.jar

# Mở cổng 8080 (Cổng mặc định của Spring Boot)
EXPOSE 8080

# Lệnh chạy ứng dụng
ENTRYPOINT ["java", "-jar", "app.jar"]