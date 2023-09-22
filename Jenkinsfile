pipeline {
    agent any

    parameters {
        string(name: 'DOCKERFILE_PATH', defaultValue: '/var/lib/jenkins/workspace/HRMS-pipeline/Dockerfile', description: 'Path to your Dockerfile')
    }

    environment {
        // Set your desired image name and tag
        IMAGE_NAME = 'myapp'
        IMAGE_TAG = 'latest'
        DOCKER_USERNAME = 'dockadministrator' // Replace with your Docker Hub username
    }

    tools {
        // Define the NodeJS installation name here
        nodejs 'NodeJS'
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
                // Use the configured NodeJS installation
                sh 'npm install -g yarn'
                sh 'yarn install'
            }
        }

        stage('Install Yarn') {
            steps {
                script {
                    sh 'npm config set prefix $WORKSPACE/.npm-global'
                    sh 'npm install -g yarn'
                }
            }
        }

        stage('Install Client Dependencies') {
            steps {
                dir('apps/client') {
                    script {
                        sh 'yarn install'
                    }
                }
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
                        sh "docker build -t ${env.IMAGE_NAME}:${env.IMAGE_TAG} --build-arg IMAGE_NAME=${env.IMAGE_NAME} --build-arg IMAGE_TAG=${env.IMAGE_TAG} -f ./Dockerfile ."
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
                // Deploy your Docker image using Docker Compose
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
