pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'myapp:latest' // Specify your Docker image name and tag
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout your source code from GitHub using Git credentials
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/Bhagathclubits/HRMS-deployment.git', credentialsId: 'github']]])
            }
        }

        stage('Build and Package') {
            steps {
                script {
                    // Use an official Node.js runtime as the base image
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        // Build your Docker image
                        def customImage = docker.build("${DOCKER_IMAGE_NAME}")
                        
                        // Set the working directory inside the container
                        customImage.inside('/app') {
                            // Copy package.json and package-lock.json to the working directory
                            sh 'cp /usr/src/app/package*.json ./'
                            
                            // Use Node.js and Yarn
                            sh 'npm install -g yarn'
                            
                            // Install project dependencies
                            sh 'yarn install'
                            
                            // Copy the rest of the application code to the working directory
