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
                    sh 'npm install -g yarn'
                    sh 'yarn install'
                    sh 'yarn workspace server build:server'
                }
            }
        }

        stage('Run Node.js Application') {
            agent {
                docker { image 'node' }
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
