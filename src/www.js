#!/usr/bin/env node
import 'dotenv-flow/config.js'
import startServer from './server.js'
import http from 'http'
import {configureEnvironment} from "./lib/configure-environment.js"
import connect from "./lib/database/db.js"


const start = async () => {
    const db = await connect()
    const app = startServer(db)
    /**
     * Get port from environment and store in Express.
     */
    
    const port = normalizePort(process.env.PORT || '3001');
    app.set('port', port);
    
    /**
     * Create HTTP server.
     */
    
    const server = http.createServer(app);
    
    /**
     * Listen on provided port, on all network interfaces.
     */
    
    server.listen(port);
    server.on('error', onError);
    server.on('listening', () => {
        const addr = server.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        console.debug('Listening on ' + bind);
    });
    
    
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);
    
    if(isNaN(port)) {
        // named pipe
        return val;
    }
    
    if(port >= 0) {
        // port number
        return port;
    }
    
    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if(error.syscall !== 'listen') {
        throw error;
    }
    
    // var bind = typeof port === 'string'
    //     ? 'Pipe ' + port
    //     : 'Port ' + port;
    
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(' requires elevated privileges');
            // process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(' is already in use');
            // process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */


start().then((s)=>{
    console.log(s)
}).catch((error)=>{
    onError(error)
})
