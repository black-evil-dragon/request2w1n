FROM eclipse-temurin:21-jdk-jammy AS builder

WORKDIR /app

COPY . .

RUN ./mvnw clean package -DskipTests



FROM eclipse-temurin:21-jre-jammy AS extractor

WORKDIR /app
COPY --from=builder /app/target/api-0.0.1-SNAPSHOT.jar app.jar

RUN java -Djarmode=layertools -jar app.jar extract



FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

COPY --from=extractor /app/dependencies/ ./
COPY --from=extractor /app/spring-boot-loader/ ./
COPY --from=extractor /app/snapshot-dependencies/ ./
COPY --from=extractor /app/application/ ./


ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]