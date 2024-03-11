# Use the official Maven image with a specific JDK version
FROM maven:3.8.4-openjdk-17 as build

# Copy your source code into the image
COPY src /home/app/src
COPY pom.xml /home/app

# Set the working directory
WORKDIR /home/app

# Compile and package your application
RUN mvn clean package

# Use OpenJDK for running the application
FROM openjdk:17

COPY --from=build /home/app/target/*.jar /usr/local/lib/app.jar

EXPOSE 8080 8000

ENTRYPOINT ["java", "-jar", "/usr/local/lib/app.jar"]
