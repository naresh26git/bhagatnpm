pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerPass')
    }

    stages {
        stage('Setup Node.js') {
            steps {
                sh 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash'
                sh 'export NVM_DIR="/var/lib/jenkins/.nvm"'
                sh '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && nvm install 14.17.6'
                sh '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && nvm use 14.17.6'
            }
        }

        stage('Build') {
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
                sh 'echo "Deploying your application"' // Replace with your deployment command
            }
        }
    }

    post {
        success {
            // This block is executed if the pipeline is successful
            // You can add post-build actions or notifications here
            emailext(
                subject: "Pipeline Success",
                body: "Your Jenkins pipeline has completed successfully.",
                to: "bhagath.sr@gmail.com"
            )
        }
        failure {
            // This block is executed if the pipeline fails
            // You can add failure notifications or cleanup steps here
            emailext(
                subject: "Pipeline Failure",
                body: "Your Jenkins pipeline has failed. Please investigate and fix the issues.",
                to: "bhagath.sr@gmail.com"
            )
        }
    }
}
