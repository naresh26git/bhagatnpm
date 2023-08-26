pipeline {
    agent any
    stages {
        stage('SCM Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/clubitsbhagath/HRMS-deployment.git',
                        credentialsId: 'gitzz'
                    ]]
                ])
            }
        }
        
        stage('Node.js Build') {
            agent {
                docker { image 'node' }
            }
            steps {
                sh 'npm install'
                sh 'npm install -g yarn'
                sh 'yarn install'
                sh 'yarn workspace server build:server'
                sh 'yarn workspace server start'
            }
        }
        
        stage('Email Approval') {
            steps {
                script {
                    def approvalEmail = emailext (
                        to: 'bhagath.sr@gmail.com',
                        subject: 'Deployment Approval',
                        body: 'Please approve the deployment by replying to this email.',
                        replyTo: 'bhagath.sr@gmail.com'
                    )

                    timeout(time: 1, unit: 'HOURS') {
                        def approvalReceived = false
                        waitUntil {
                            def inbox = emailext.getInbox('bhagath.sr@gmail.com')
                            inbox.each { email ->
                                if (email.subject.contains('Deployment Approved')) {
                                    approvalReceived = true
                                }
                            }
                            return approvalReceived
                        }
                    }

                    if (approvalReceived) {
                        echo 'Deployment approved! Proceeding with deployment...'
                        sh 'docker build -t my-node-app .'
                        sh 'docker login -u dockadministrator -p ${dockerPassword}'
                        sh 'docker push dockadministrator/my-node-app'
                        sh 'docker run -d -p 8090:3000 --name nodeapp my-node-app'
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
            emailext body: 'Your deployment was successful.',
                     recipientProviders: [[$class: 'CulpritsRecipientProvider']],
                     subject: 'Deployment Success',
                     to: 'bhagath.sr@gmail.com',
                     attachLog: true
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
