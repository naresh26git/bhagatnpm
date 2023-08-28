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

        stage('Node.js Build') {
            agent {
                docker { image 'node' }
            }
            steps {
                dir('server') {
                    sh 'mkdir -p ~/.npm' // Create the .npm directory in the user's home directory
                    sh 'npm config set cache ~/.npm' // Set npm cache to the created directory
                    sh 'npm install -g yarn'
                    sh 'yarn install'
                    sh 'yarn workspace server build:server'
                }
            }
        }

        stage('Run Node.js Application') {
            agent {
                docker { image 'my-node-app' } // Use the correct image name
            }
            steps {
                script {
                    def appContainer = docker.image('my-node-app').run('-p', '8090:3000', '--name', 'nodeapp', '-d')
                }
            }
        }
    }

    post {
        success {
            mail body: 'Your deployment was successful.',
                 subject: 'Deployment Success',
                 to: 'bhagath.sr@gmail.com'
        }
        failure {
            mail body: 'Your deployment has failed.',
                 subject: 'Deployment Failure',
                 to: 'bhagath.sr@gmail.com'
        }
        always {
            script {
                def appContainer = docker.image('my-node-app').container('nodeapp')
                if (appContainer) {
                    appContainer.stop()
                    appContainer.remove(force: true)
                }
            }
        }
    }
}
