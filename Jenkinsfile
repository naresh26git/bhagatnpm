pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerPass')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Node.js and npm') {
            steps {
                sh 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash'
                sh 'export NVM_DIR="/var/lib/jenkins/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && nvm install 14.17.6'
                sh 'export NVM_DIR="/var/lib/jenkins/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && nvm use 14.17.6'
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
                    
                    withCredentials([usernamePassword(credentialsId: 'dockerPass', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
                        sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
                    }

                    sh "docker build -t ${customImageTag} ."
                    sh "docker push ${customImageTag}"
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'your-deployment-command-here'
            }
        }
    }

    post {
        success {
            // This block is executed if the pipeline is successful
            // You can add post-build actions or notifications here
        }
        failure {
            // This block is executed if the pipeline fails
            // You can add failure notifications or cleanup steps here
        }
    }
}
