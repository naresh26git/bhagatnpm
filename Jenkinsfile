pipeline {
    agent any

    stages {
        stage('SCM Checkout - First GitHub Account') {
            steps {
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    checkout([$class: 'GitSCM',
                        branches: [[name: 'main']],
                        userRemoteConfigs: [[
                            url: 'https://github.com/Bhagathclubits/HRMS-deployment.git',
                            credentialsId: 'gitzz'
                        ]]
                    ])
                }
            }
        }

        stage('Node.js Build and Start') {
            agent {
                docker {
                    image 'node' // Define the Node.js Docker image
                    args '-u root' // Optional: Run the container as root if necessary
                }
            }
            steps {
                script {
                    sh 'npm install'
                    sh 'npm install -g yarn'
                    sh 'yarn install'
                    sh 'yarn workspace server build:server'
                    sh 'yarn workspace server start'
                }
            }
        }

        stage('Build the Docker image') {
            steps {
                script {
                    sh 'docker build -t my-node /var/lib/jenkins/workspace/HRMS-pipeline'
                    sh 'docker tag my-node node/hrms-pipeline:latest'
                    sh "docker tag my-node node/hrms-pipeline:${BUILD_NUMBER}"
                    env.CURRENT_IMAGE_NAME = "node/hrms-pipeline:${BUILD_NUMBER}"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    try {
                        // Deploy the new version here
                        // Add commands or scripts for deploying the Docker image to your EC2 instance

                        // Perform testing and validation on the new version
                        // Add testing and validation steps here

                        // If testing and validation succeed, update the current version
                        sh "echo ${BUILD_NUMBER} > current_version.txt"
                    } catch (Exception e) {
                        echo "Deployment or testing/validation failed. Initiating rollback..."
                        currentBuild.result = 'FAILURE'
                        sh "docker stop my-node"
                        sh "docker rm my-node"
                        sh "docker run -d --name my-node ${env.CURRENT_IMAGE_NAME}"
                        error("Rollback completed. Deployment failed.")
                    }
                }
            }
        }
    }

    post {
        success {
            mail body: 'Dear Balaji, your deployment was successful.',
                 subject: 'Deployment Success',
                 to: 'bhagath.sr@gmail.com'
        }
        failure {
            mail body: 'Your deployment has failed.',
                 subject: 'Dear Balaji, your Deployment has Failed',
                 to: 'bhagath.sr@gmail.com'
        }
    }
}
