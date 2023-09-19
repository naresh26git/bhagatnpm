pipeline {
    agent any

    environment {
        // Set your desired image name and tag
        IMAGE_NAME = 'myapp'
        IMAGE_TAG = 'latest'
        DOCKER_USERNAME = 'dockadministrator' // Replace with your Docker Hub username
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout your source code from GitHub using credentials
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[credentialsId: 'github', url: 'https://github.com/Bhagathclubits/HRMS-deployment.git']]])
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install global yarn
                sh 'npm install -g yarn'
                sh 'yarn install'
            }
        }

        stage('Build Server') {
            steps {
                // Build the server
                sh 'yarn build:server'
            }
        }

        stage('Start Server') {
            steps {
                // Start the server
                sh 'yarn workspace server start'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build your Docker image and pass IMAGE_NAME and IMAGE_TAG as build arguments
                script {
                    withCredentials([string(credentialsId: 'dockerPass', variable: 'DOCKER_CREDENTIALS')]) {
                        sh "docker build -t ${env.IMAGE_NAME}:${env.IMAGE_TAG} --build-arg IMAGE_NAME=${env.IMAGE_NAME} --build-arg IMAGE_TAG=${env.IMAGE_TAG} -f Dockerfile ."
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                // Push the Docker image to Docker Hub
                script {
                    withCredentials([string(credentialsId: 'dockerPass', variable: 'DOCKER_CREDENTIALS')]) {
                        sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_CREDENTIALS}"
                        sh "docker push ${env.IMAGE_NAME}:${env.IMAGE_TAG}"
                    }
                }
            }
        }

        stage('Deploy with Docker') {
            steps {
                // Replace 'docker-compose -f /path/to/your/docker-compose.yaml up -d' with your actual deployment command
                sh 'docker-compose -f /root/docker-compose.yaml up -d'
            }
        }
    }

    post {
        success {
            echo 'Build, push, and deployment completed successfully.'
        }
        failure {
            echo 'Build, push, or deployment failed.'
        }
    }
}

