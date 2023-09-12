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

        stage('Install AWS CLI') {
            steps {
                sh 'curl "https://d1vvhvl2y92vvt.cloudfront.net/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"'
                sh 'unzip awscliv2.zip'
                sh './aws/install'
            }
        }

        stage('Install Node.js and npm') {
            steps {
                sh 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash'
                sh 'source ~/.nvm/nvm.sh && nvm install 14.17.6'
                sh 'source ~/.nvm/nvm.sh && nvm use 14.17.6'
            }
        }

        stage('Install Yarn and Build') {
            steps {
                sh '/full/path/to/npm install -g yarn'
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
            // Send email notification on success
            emailext subject: 'Jenkins Pipeline Success',
                      body: 'Your Jenkins pipeline has succeeded.',
                      to: 'bhagath.sr@gmail.com'
        }
        failure {
            // Send email notification on failure
            emailext subject: 'Jenkins Pipeline Failure',
                      body: 'Your Jenkins pipeline has failed.',
                      to: 'bhagath.sr@gmail.com'
        }
    }
}
