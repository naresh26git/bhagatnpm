pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = "node/hrms-pipeline"
    }

    stages {
        stage('SCM Checkout') {
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

        stage('Build the Docker image') {
            steps {
                script {
                    // Build the Docker image from the current directory
                    sh "docker build -t ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER} ."

                    // Tag the image as "latest"
                    sh "docker tag ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER} ${DOCKER_IMAGE_NAME}:latest"
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
                        currentBuild.result = 'FAILURE' // Mark the build as FAILURE

                        // Implement rollback logic here
                        sh "docker stop ${DOCKER_IMAGE_NAME}" // Stop the current container
                        sh "docker rm ${DOCKER_IMAGE_NAME}"   // Remove the current container
                        sh "docker run -d --name ${DOCKER_IMAGE_NAME} ${DOCKER_IMAGE_NAME}:latest" // Start the previous container

                        error("Rollback completed. Deployment failed.")
                    }
                }
            }
        }
    }

    post {
        success {
            mail body: 'Dear Balaji your deployment was successful.',
                 subject: 'Deployment Success',
                 to: 'bhagath.sr@gmail.com'
        }
        failure {
            mail body: 'Your deployment has failed.',
                 subject: 'Dear Balaji your Deployment has Failed',
                 to: 'bhagath.sr@gmail.com'
        }
    }
}
