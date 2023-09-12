pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerPass')
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout your code from your version control system (e.g., Git)
                checkout scm
            }
        }

        stage('Build') {
            steps {
                // Set up Node.js environment
                sh 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash'
                sh 'source ~/.nvm/nvm.sh && nvm install 14.17.6'
                sh 'source ~/.nvm/nvm.sh && nvm use 14.17.6'

                // Install dependencies and build
                sh 'npm install -g yarn'
                sh 'yarn install'
                sh 'yarn workspace client unsafe:build'
                sh 'rm -r apis/server/public'
                sh 'mkdir apis/server/public'
                sh 'cp -r apps/client/dist/ apis/server/public/'
                sh 'yarn workspace server build:ts'

                // You can run tests or linters here if necessary
                // sh 'yarn lint'
                // sh 'yarn test'
            }
        }

        stage('Docker Build and Push') {
            steps {
                script {
                    def customImageTag = "myapp:${env.BUILD_NUMBER}"
                    
                    // Authenticate with Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'dockerPass', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
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
                // Replace '<YOUR_DEPLOYMENT_COMMAND>' with your actual deployment command
                sh 'echo "Deploying your application"' // Example deployment command
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
