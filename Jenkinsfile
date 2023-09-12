pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerPass')
        NVM_DIR = "$HOME/.nvm"
    }

    stages {
        stage('Set up Node.js') {
            steps {
                // Install NVM
                sh 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash'
                
                // Load NVM without the use of 'source'
                sh 'export NVM_DIR="$HOME/.nvm"'
                sh '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"'
                
                // Check if nvm.sh exists
                sh '[ -s "$NVM_DIR/nvm.sh" ] && echo "nvm.sh found" || echo "nvm.sh not found"'
                
                // Install Node.js
                sh 'nvm install 14.17.6'
                sh 'nvm use 14.17.6'
            }
        }

        stage('Build') {
            steps {
                // Replace 'https://github.com/Bhagathclubits/HRMS-deployment.git' with your GitHub repository URL
                sh 'git clone https://github.com/Bhagathclubits/HRMS-deployment.git'

                // Navigate to the cloned repository directory
                dir('HRMS-deployment') {
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
        }

        stage('Docker Build and Push') {
            steps {
                script {
                    def customImageTag = "myapp:${env.BUILD_NUMBER}"
                    
                    // Authenticate with Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'dockerPass', passwordVariable: 'cluBIT$123*', usernameVariable: 'dockadministrator')]) {
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
                // Replace 'your-deployment-command' with your actual deployment command
                sh 'your-deployment-command'
            }
        }
    }

    post {
        success {
            // This block is executed if the pipeline is successful
            // You can add post-build actions or notifications here
            echo 'Deployment successful!'
            emailext(
                subject: 'Deployment Successful',
                body: 'Your Jenkins deployment was successful!',
                to: 'bhagath.sr@gmail.com'
            )
        }
        failure {
            // This block is executed if the pipeline fails
            // You can add failure notifications or cleanup steps here
            echo 'Deployment failed!'
            emailext(
                subject: 'Deployment Failed',
                body: 'Your Jenkins deployment has failed!',
                to: 'bhagath.sr@gmail.com'
            )
        }
    }
}
