# Awesome Book Collection App
Spring Boot and React demo project to collect your farourite books in one place, awesome!

## Running locally

Prerequirements to run:
- JDK (v. 11 recommended)
- Maven 3.6


Following command installs and runs the app when it run from terminal window in the app root directory:

`./mvnw spring-boot:run`

This command should install Node and NPM and run also the React app without other installations.


To develop frontend it's easier if you don't need to relaunch app on every code change. For that you can use or install:
- Node (v.16 recommended)
- NPM (v.8 recommended)

React app can be lauched after the Spring Boot app launch by run this command in terminal:

```npm run watch``` 

After that it watches for changes and builds app automatically on every change. There's not yet "hot" reloaders for Spring boot so you need to refresh web browser manually after every build.