pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerPass')
    }

    stages {
        stage('Checkout') {
            steps {
                // Replace 'https://github.com/Bhagathclubits/HRMS-deployment.git' with your GitHub repository URL
                checkout scm
            }
        }

        stage('Install Node.js and npm') {
            steps {
                sh '/var/lib/jenkins/.nvm/nvm.sh install 14.17.6'
                sh '/var/lib/jenkins/.nvm/nvm.sh use 14.17.6'
            }
        }

        stage('Install AWS CLI') {
            steps {
                sh 'pip install awscli'
            }
        }

        stage('Install Yarn and Build') {
            steps {
                sh 'npm install -g yarn'
                sh 'yarn install'
                sh 'yarn workspace client unsafe:build'
                sh 'rm -r apis/server/public'
                sh 'mkdir apis/server/public'
                sh 'cp -r apps/client/dist/ apis/server/public/'
                sh 'yarn workspace server build:ts'
            }
        }

        stage('Docker Build and Push') {
            steps {
                script {
                    def customImageTag = "myapp:${env.BUILD_NUMBER}"
                    
                    // Authenticate with Docker Hub
                    withCredentials([usernamePassword(credentialsId: dockerPass, passwordVariable: 'cluBIT$123*', usernameVariable: 'dockadministrator')]) {
                        sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
                    }

                    // Build and tag Docker image
                    sh "docker build -t ${customImageTag} ."
                    
                    // Push Docker image to Docker Hub
                    sh "docker push ${customImageTag}"
                }
            }
        }

        stage('Deploy') {
            steps {
                // Replace 'successful ' with your actual deployment command
                sh 'successful '
            }
        }
    }

    post {
        success {
            // This block is executed if the pipeline is successful
            // Send a success notification to the specified email address
            emailext to: 'bhagath.sr@gmail.com', subject: 'Pipeline Success', body: 'The pipeline has completed successfully.'
        }
        failure {
            // This block is executed if the pipeline fails
            // Send a failure notification to the specified email address
            emailext to: 'bhagath.sr@gmail.com', subject: 'Pipeline Failure', body: 'The pipeline has failed. Please investigate.'
        }
    }
}
