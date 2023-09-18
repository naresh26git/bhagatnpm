pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout your source code from GitHub using Git credentials
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/Bhagathclubits/HRMS-deployment.git', credentialsId: 'github']]])
            }
        }

        stage('Build and Package') {
            steps {
                script {
                    // Create the /app directory in the Jenkins workspace
                    sh 'mkdir -p $WORKSPACE/app'
                    
                    // Use an official Node.js runtime as the base image
                    sh '/usr/bin/docker pull node:18.17.1'
                    sh '/usr/bin/docker run -t -d -u 115:122 -v ${WORKSPACE}/app:/app -w /app -v /var/lib/jenkins/workspace/HRMS-pipeline:/usr/src/app -e ******** -e ******** node:18.17.1 cat'
                    
                    // Set the working directory inside the container
                    dir('/app') {
                        // Copy package.json and package-lock.json to the working directory
                        sh 'cp /usr/src/app/package*.json ./'
                        
                        // Use Node.js and Yarn
                        sh 'npm install -g yarn'
                        
                        // Install project dependencies
                        sh 'yarn install'
                        
                        // Copy the rest of the application code to the working directory
                        sh 'cp -r /usr/src/app/* .'

                        // Build your server and client (adjust the build commands as needed)
                        sh 'yarn workspace server build:ts'
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                // Build a Docker image of your application
                script {
                    sh "/usr/bin/docker build -t myapp ."
                }
            }
        }

        stage('Docker Deploy') {
            steps {
                // Deploy your Docker image as needed
                script {
                    // Example: Deploy the Docker image to a local Docker host
                    sh "/usr/bin/docker run -d --name your-container-name -p 3000:3000 myapp"
                }
            }
        }

        stage('Clean Up') {
            steps {
                // Clean up any temporary files or resources
                sh 'yarn clean-up' // Replace with any cleanup command you need
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
