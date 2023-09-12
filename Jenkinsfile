pipeline {
    agent any

    parameters {
        string(name: 'DEPLOY_VERSION', description: 'Version to deploy (e.g., v1.1)')
    }

    stages {
        stage('Checkout') {
            steps {
                // Check out your code from the repository
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
                // Build and package your application
                // Example: Compile, bundle, or build your code
                sh 'npm install'  // Replace with your build commands
                sh 'npm run build'  // Replace with your build commands
            }
        }

        stage('Docker Build') {
            steps {
                // Build a Docker image with the specified version
                script {
                    def customImageName = "my-static-web-app:${params.DEPLOY_VERSION}" // Use the specified version
                    
                    sh "docker build -t ${customImageName} ."
                }
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
