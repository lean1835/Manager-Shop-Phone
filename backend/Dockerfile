FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

COPY pom.xml .

# Giảm RAM cho Maven để tránh Railway build OOM
ENV MAVEN_OPTS="-Xmx128m"

# Giới hạn RAM cho Maven để không bị crash (quan trọng)
ENV MAVEN_OPTS="-Xmx300m"

# Chạy build bình thường, bỏ -X và -e để log gọn nhẹ
RUN mvn clean package -Dmaven.test.skip=true

FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
