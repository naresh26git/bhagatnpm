pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerPass')
        NVM_DIR = '/var/lib/jenkins/.nvm'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node.js') {
            steps {
                sh '''
                    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
                    nvm install 14.17.6
                    nvm use 14.17.6
                '''
            }
        }

        stage('Build') {
            steps {
                dir('your-repo-name') {
                    sh 'npm install -g yarn'
                    sh 'yarn install'
                    sh 'yarn workspace client unsafe:build'
                    sh 'rm -r apis/server/public'
                    sh 'mkdir apis/server/public'
                    sh 'cp -r apps/client/dist/ apis/server/public/'
                    sh 'yarn workspace server build:ts'
                }
            }
        }

        stage('Docker Build and Push') {
            steps {
                script {
                    def customImageTag = "myapp:${env.BUILD_NUMBER}"
                    
                    withCredentials([usernamePassword(credentialsId: 'dockerPass', passwordVariable: 'cluBIT$123*', usernameVariable: 'dockadministrator')]) {
                        sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
                    }

                    sh "docker build -t ${customImageTag} ."
                    sh "docker push ${customImageTag}"
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'echo "Deploying your application"'
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
