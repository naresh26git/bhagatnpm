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
                    sh 'docker tag my-node dockeadministrator/hrms-pipeline:latest'
                    sh "docker tag my-node dockeadministrator/hrms-pipeline:${BUILD_NUMBER}"
                    sh 'docker image push dockeadministrator/hrms-pipeline:latest'
                    sh "docker image push dockeadministrator/hrms-pipeline:${BUILD_NUMBER}"
                }
            }
        }
    }

    post {
        success {
            mail body: 'HRMS deployment was successful.',
                 subject: 'Deployment Success',
                 to: 'bhagath.sr@gmail.com'
        }
        failure {
            mail body: 'HRMS deployment has failed.',
                 subject: 'Deployment Failure',
                 to: 'bhagath.sr@gmail.com'
        }
    }
}
