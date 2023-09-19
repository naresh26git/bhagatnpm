pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout your source code from GitHub using Git credentials
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/Bhagathclubits/HRMS-deployment.git', credentialsId: 'github']]])
            }
        }

        stage('Build') {
            steps {
                // Use Node.js and Yarn
                tools {
                    nodejs 'Node.js' // Set up Node.js tool in Jenkins
                    yarn 'Yarn'     // Set up Yarn tool in Jenkins
                }

                // Install dependencies and build your application
                sh 'yarn install'
                sh 'yarn workspace client unsafe:build'
                sh 'yarn workspace server build:ts'
            }
        }

        stage('Docker Build') {
            steps {
                // Build a Docker image of your application using Docker credentials
                script {
                    docker.withRegistry('https://your-ecr-url.amazonaws.com', 'dockerPass') {
                        def imageName = 'myapp:latest'

                        // Include the Dockerfile in the build context
                        context 'path/to/your/Dockerfile'

                        // Specify the build arguments if needed
                        args('-e SOME_VAR=some_value')

                        // Build the Docker image
                        build()
                    }
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
}
