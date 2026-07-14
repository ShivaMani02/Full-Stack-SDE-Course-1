FROM eclipse-temurin:21-jdk-jammy

ARG JAR_FILE=target/employee-management-api-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar"]
