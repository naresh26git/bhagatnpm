pipeline {
    agent any

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
                    sh 'docker build -t my-node /var/lib/jenkins/workspace/HRMS-pipeline'
                    sh 'docker tag my-node node/hrms-pipeline:latest'
                    sh "docker tag my-node node/hrms-pipeline:${BUILD_NUMBER}" // Use the build number here

                    // Store the current Docker image name for rollback
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
                        currentBuild.result = 'FAILURE' // Mark the build as FAILURE

                        // Implement rollback logic here
                        sh "docker stop my-node" // Stop the current container
                        sh "docker rm my-node"   // Remove the current container
                        sh "docker run -d --name my-node ${env.CURRENT_IMAGE_NAME}" // Start the previous container

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
