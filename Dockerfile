FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml ./
RUN mvn dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN mvn clean package -DskipTests

# DEBUG: Show JAR file
RUN ls -la /app/target/

# Run stage with Java 21
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

# Copy JAR
COPY --from=build /app/target/*.jar app.jar

# DEBUG: Check JAR exists
RUN ls -la /app/

EXPOSE 9090
CMD ["java", "-jar", "app.jar"]
