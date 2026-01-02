// API = event e.g socket.on("send -- event")
// req.body = data
// request = socket
// data send = emit
// data receive = on

import app from './src/app.ts'
import { envConfig } from './src/config/config.ts'
import connectToDb from './src/config/dbConfig.ts'
import { Server } from 'socket.io'

export let io:Server

async function startServer() {
    try {
        await connectToDb()
    
        const port = envConfig.port || 4000
    
        const server = app.listen(port, () => {
            console.log(`Server has started on port ${port}`)
        })
    
        io = new Server(server, {
            cors: {
                origin: "http://localhost:5173"
            }
        })
    
        const todo = await import("./src/todo/todoController.ts")
        todo.default.init()
        
    } catch (error) {
        console.log("Failed to start server: ", error)
    }
}

startServer()