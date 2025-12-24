import express, { type Request, type Response } from 'express'
import path from 'node:path'
const app = express()
import('./todo/todoController.ts')

export default app