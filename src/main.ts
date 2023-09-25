import Express from 'express'
import dotenv from 'dotenv'

import { Server } from './server'

dotenv.config()

const expressApplication = Express()
const server = new Server(expressApplication)

server.startServer()
