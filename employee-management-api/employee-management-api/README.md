# Employee Management API

A beginner-friendly Spring Boot 3 REST API for managing employees. This project uses Java 21, Spring Boot 3, Spring Data JPA, MySQL, JWT authentication, Swagger OpenAPI, and Docker.

## Technologies

- Java 21
- Spring Boot 3
- Spring Web
- Spring Data JPA
- Spring Security
- JWT
- MySQL
- Lombok
- Validation
- Swagger OpenAPI
- Docker

## Auto-Configuration

Spring Boot automatically configures the application using the values in `src/main/resources/application.properties`.

The main auto-configured components are:

- `DataSource` using MySQL connection properties
- `EntityManager` for JPA and Hibernate
- `JpaRepository` support for repository classes
- `SecurityFilterChain` for JWT-based authentication
- Swagger OpenAPI UI for API documentation

You do not need to write manual wiring for these features. Spring Boot scans the packages under `com.example.employeemanagement` and configures beans automatically.

## Installation

1. Clone the repository.
2. Open the project in VS Code.
3. Ensure Java 21 and Maven are installed.
4. If running locally, start MySQL and create a database named `employee_db`.

### Local MySQL setup

```sql
CREATE DATABASE employee_db;
```

## Run using Maven

```bash
./mvnw clean package
./mvnw spring-boot:run
```

Open the application at `http://localhost:8080`.

## Run using Docker

```bash
docker compose up --build
```

Docker Compose will start:

- `mysql` on port `3306`
- `employee-management-api` on port `8080`

## Database Inspection

### Using MySQL CLI locally

```bash
mysql -u root -p
```

Then run:

```sql
SHOW DATABASES;
USE employee_db;
SHOW TABLES;
SELECT * FROM employees LIMIT 10;
SELECT * FROM users LIMIT 10;
```

### Using Docker to inspect the MySQL container

```bash
docker compose exec mysql mysql -u root -p
```

Then run the same SQL commands above.

### Verify JPA table creation

Spring Boot creates the required tables automatically by reading the entity classes and using `spring.jpa.hibernate.ddl-auto=update`.

## API Endpoints

- `POST /api/auth/register` - register a new user
- `POST /api/auth/login` - authenticate and receive JWT token
- `POST /api/employees` - create an employee (requires JWT token)
- `GET /api/employees` - list employees (requires JWT token)
- `GET /api/employees/{id}` - get employee by ID (requires JWT token)
- `PUT /api/employees/{id}` - update employee (requires JWT token)
- `DELETE /api/employees/{id}` - delete employee (soft delete, requires JWT token)

## Swagger UI

Open `http://localhost:8080/swagger-ui/index.html`

## Postman Collection

Import `postman_collection.json` into Postman.

- Use the `Login User` request to get a JWT token.
- Copy the returned token into the `jwtToken` collection variable.
- Run the protected employee requests with the bearer token.

## Folder Structure

- `src/main/java/com/example/employeemanagement`
  - `controller`
  - `service`
  - `service/impl`
  - `repository`
  - `entity`
  - `dto`
  - `config`
  - `security`
  - `exception`
  - `util`
- `src/main/resources`
  - `application.properties`
- `Dockerfile`
- `docker-compose.yml`
