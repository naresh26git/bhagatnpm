pipeline {
    agent any

    stages {
        stage('SCM Checkout') {
            steps {
                catchError {
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
                    sh 'npm install --cache .npm'
                    sh 'npm install -g yarn'
                    sh 'yarn install'
                    sh 'yarn workspace server build:server'
                    sh 'yarn workspace server start'
                }
            }
        }

        stage('Email Approval') {
            steps {
                script {
                    def approvalReceived = false

                    def approvalEmail = mail (
                        to: 'bhagath.sr@gmail.com',
                        subject: 'Deployment Approval',
                        body: 'Please approve the deployment by replying to this email.',
                        replyTo: 'bhagath.sr@gmail.com'
                    )

                    timeout(time: 1, unit: 'HOURS') {
                        waitUntil {
                            def inbox = emailext.getInbox()
                            inbox.each { email ->
                                if (email.subject.contains('Deployment Approved')) {
                                    approvalReceived = true
                                    return true
                                }
                            }
                            return false
                        }
                    }

                    if (approvalReceived) {
                        echo 'Deployment approved! Proceeding with deployment...'

                        withCredentials([string(variable: 'dockerPassword', credentialsId: 'dockerPassword')]) {
                            docker.build('my-node-app').inside {
                                sh 'docker push dockadministrator/my-node-app'
                                sh 'docker run -d -p 8090:3000 --name nodeapp my-node-app'
                            }
                        }
                    } else {
                        error 'Deployment approval not received. Stopping deployment.'
                    }
                }
            }
        }
        
        // Add other stages as needed
    }

    post {
        success {
            mail body: 'Your deployment was successful.',
                 subject: 'Deployment Success',
                 to: 'bhagath.sr@gmail.com'
        }
        always {
            script {
                if (sh(returnStatus: true, script: "docker ps -a --format '{{.Names}}' | grep -w nodeapp") == 0) {
                    sh 'docker rm -f nodeapp'
                }
            }
        }
    }
}
