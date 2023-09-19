pipeline {
    agent any

    environment {
        // Set your desired image name and tag
        IMAGE_NAME = 'myapp'
        IMAGE_TAG = 'latest'
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
                sh '/root/.nvm/versions/node/v18.17.1/bin/yarn install'

                // Optionally, you can also install any global npm packages here
                // sh '/root/.nvm/versions/node/v18.17.1/bin/npm install -g some-package'
            }
        }

        stage('Build Server') {
            steps {
                // Build the server
                sh '/root/.nvm/versions/node/v18.17.1/bin/yarn build:server'
            }
        }

        stage('Start Server') {
            steps {
                // Start the server
                sh '/root/.nvm/versions/node/v18.17.1/bin/yarn workspace server start'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build your Docker image and pass IMAGE_NAME and IMAGE_TAG as build arguments
                script {
                    withCredentials([string(credentialsId: 'dockerPass', variable: 'DOCKER_CREDENTIALS')]) {
                        sh "/usr/bin/docker build -t ${env.IMAGE_NAME}:${env.IMAGE_TAG} --build-arg IMAGE_NAME=${env.IMAGE_NAME} --build-arg IMAGE_TAG=${env.IMAGE_TAG} -f /path/to/your/Dockerfile ."
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                // Push the Docker image to Docker Hub
                script {
                    withCredentials([string(credentialsId: 'dockerPass', variable: 'DOCKER_CREDENTIALS')]) {
                        sh "/usr/bin/docker login -u your-docker-username -p ${DOCKER_CREDENTIALS}"
                        sh "/usr/bin/docker push ${env.IMAGE_NAME}:${env.IMAGE_TAG}"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                // Use a deployment tool or script to deploy your Docker image
                // Example: Deploy to a Kubernetes cluster, AWS ECS, or another platform
            }
        }
    }

    post {
        success {
            echo 'Build and deployment completed successfully.'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}
