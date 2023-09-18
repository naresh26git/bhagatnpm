pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'myapp:latest' // Specify your Docker image name and tag
        DOCKER_BIN_PATH = '/usr/bin/docker' // Specify the path to the docker executable
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
                    // Use the $WORKSPACE environment variable to create the /app directory
                    sh "mkdir -p \$WORKSPACE/app"
                    
                    // Pull the Node.js Docker image
                    sh "$DOCKER_BIN_PATH pull node:18.17.1"
                    
                    // Use an official Node.js runtime as the base image
                    docker.image('node:18.17.1').inside("-v /var/lib/jenkins/workspace/HRMS-pipeline:/app") {
                        // Set the working directory inside the container
                        dir('/app') {
                            // Copy package.json and package-lock.json to the working directory
                            sh 'cp /usr/src/app/package*.json ./'
                            
                            // Use Node.js and Yarn
                            sh 'npm install -g yarn'
                            
                            // Install project dependencies
                            sh 'yarn install'
                            
                            // Copy the rest of the application code to the working directory
                            sh 'cp -r /usr/src/app/* .'

                            // Build your server and client (adjust the build commands as needed)
                            sh 'yarn workspace server build:ts'
                        }
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                // Build a Docker image of your application
                script {
                    sh "$DOCKER_BIN_PATH build -t ${DOCKER_IMAGE_NAME} ."
                }
            }
        }

        stage('Docker Deploy') {
            steps {
                // Deploy your Docker image as needed
                script {
                    // Example: Deploy the Docker image to a local Docker host
                    sh "$DOCKER_BIN_PATH run -d --name your-container-name -p 3000:3000 ${DOCKER_IMAGE_NAME}"
                }
            }
        }

        stage('Clean Up') {
            steps {
                // Clean up any temporary files or resources
                sh 'yarn clean-up' // Replace with any cleanup command you need
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
