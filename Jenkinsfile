pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerPass')
    }

    stages {
        stage('Build') {
            steps {
                // Replace 'https://github.com/Bhagathclubits/HRMS-deployment.git' with your GitHub repository URL
                sh 'git clone https://github.com/Bhagathclubits/HRMS-deployment.git'

                // Navigate to the cloned repository directory
                dir('your-repo-name') {
                    // Install NVM and Node.js
                    sh '''
                    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
                    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
                    nvm install 14.17.6
                    nvm use 14.17.6
                    '''

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
            echo "Pipeline succeeded!"
        }
        failure {
            // This block is executed if the pipeline fails
            echo "Pipeline failed!"
        }
    }
}
