pipeline {
    agent any

    environment {
        NVM_DIR = '/var/lib/jenkins/.nvm'
        NODE_VERSION = '18.17.1'  // Specify the Node.js version here
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
                    [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
                    [ -s "$NVM_DIR/bash_completion" ] && \\. "$NVM_DIR/bash_completion"
                    nvm install $NODE_VERSION
                    nvm use $NODE_VERSION
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
                    [ -s "$NVM_DIR/bash_completion" ] && \\. "$NVM_DIR/bash_completion"
                    nvm use $NODE_VERSION
                    yarn install
                '''
            }
        }

        stage('Build') {
            steps {
                dir('HRMS-pipeline') {
                    sh '''
                    echo "DEBUG: Before sudo"
                    echo "jenkins\\$HRMS" | sudo -S npm install -g yarn
                    echo "DEBUG: After sudo"
                    '''
                }
            }
        }

        stage('Docker Build and Push') {
            steps {
                script {
                    def customImageTag = "myapp:${env.BUILD_NUMBER}"
                    
                    withCredentials([usernamePassword(credentialsId: 'dockerPass', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: ''DOCKERHUB_USERNAME'')]) {
                        sh "docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD"
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
