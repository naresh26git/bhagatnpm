pipeline {
    agent any

    parameters {
        string(name: 'DEPLOY_VERSION', description: 'Version to deploy (e.g., v1.1)')
    }

    stages {
        stage('Checkout') {
            steps {
                // Check out your code from your repository
                checkout([$class: 'GitSCM',
                    branches: [[name: 'main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/Bhagathclubits/HRMS-deployment.git',
                        credentialsId: 'gitzz'
                    ]]
                ])
            }
        }

        stage('Build and Package') {
            steps {
                // Your build and packaging steps as before
            }
        }

        stage('Docker Build') {
            steps {
                // Build Docker image as before
            }
        }

        stage('Deploy') {
            steps {
                // Deploy the Docker image with the specified version
                script {
                    def customImageName = "my-static-web-app:${params.DEPLOY_VERSION}" // Use the specified version
                    
                    // Authenticate with Docker Hub using Jenkins credentials
                    withCredentials([string(credentialsId: 'dockerPass', variable: 'DOCKER_PASSWORD')]) {
                        sh "docker login -u dockadministrator -p ${DOCKER_PASSWORD}"
                        sh "docker push ${customImageName}"
                    }
                }
            }
        }
    }

    post {
        always {
            // Cleanup any Docker images or containers if needed
            cleanWs()
        }
    }
}
