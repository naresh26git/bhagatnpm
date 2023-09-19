pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerPass')
        NVM_DIR = '/var/lib/jenkins/.nvm'
        NODE_VERSION = '18.17.1'  // Specify the Node.js version here
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install NVM') {
            steps {
                sh 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash'
                sh 'export NVM_DIR="$HOME/.nvm"'
                sh '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"'
                sh '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"'
            }
        }

        stage('Setup Node.js') {
            steps {
                sh '''
                    nvm install $NODE_VERSION
                    nvm use $NODE_VERSION
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    nvm use $NODE_VERSION
                    npm install -g yarn
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
