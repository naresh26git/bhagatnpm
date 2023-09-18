pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'myapp:latest' // Specify your Docker image name and tag
        DOCKER_REGISTRY_CREDENTIALS = 'dockerPass' // Specify your Docker credentials ID
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/Bhagathclubits/HRMS-deployment.git', credentialsId: 'github']]])
            }
        }

        stage('Build and Package') {
            steps {
                script {
                    docker.image('node:18.17.1').inside {
                        sh 'mkdir -p /app'
                        dir('/app') {
                            sh 'cp /usr/src/app/package*.json ./'
                            sh 'npm install -g yarn'
                            sh 'yarn install'
                            sh 'cp -r /usr/src/app/* .'
                            sh 'yarn workspace server build:ts'
                        }
                    }
                }
            }
        }

        stage('Docker Build and Push') {
            steps {
                script {
                    // Build the Docker image
                    def customImage = docker.build("${DOCKER_IMAGE_NAME}")

                    // Push the Docker image to the registry using credentials
                    docker.withRegistry('', "${DOCKER_REGISTRY_CREDENTIALS}") {
                        customImage.push()
                    }
                }
            }
        }

        stage('Docker Deploy') {
            steps {
                script {
                    // Deploy your Docker image as needed
                    // Example: Deploy the Docker image to a remote server
                    sh "docker run -d --name your-container-name -p 3000:3000 ${DOCKER_IMAGE_NAME}"
                }
            }
        }

        stage('Clean Up') {
            steps {
                sh 'yarn clean-up'
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
