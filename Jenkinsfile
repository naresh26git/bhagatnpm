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

        stage('Setup Node.js') {
            steps {
                script {
                    def nvmScript = "${NVM_DIR}/nvm.sh"
                    if (fileExists(nvmScript)) {
                        sh "source ${nvmScript}"
                        sh "nvm install ${NODE_VERSION}"
                        sh "nvm use ${NODE_VERSION}"
                        sh "npm install -g yarn"  // Add this line
                    } else {
                        error "NVM setup script not found at ${nvmScript}"
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    [ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"
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
                    yarn build:server  // Add this line
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
