stage('Build and Package') {
    steps {
        script {
            // Use the $WORKSPACE environment variable to create the /app directory
            sh "mkdir -p \$WORKSPACE/app"
            
            // Pull the Node.js Docker image
            sh "$DOCKER_BIN_PATH pull node:18.17.1"
            
            // Use an official Node.js runtime as the base image
            docker.image('node:18.17.1').inside("-u 115:122 -v \$WORKSPACE/app:/app") {
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
}
