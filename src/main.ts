/* eslint-disable import/first */
import * as dotenv from 'dotenv'
dotenv.config()

import Express from 'express'
import { Server } from './server'

const expressApplication = Express()
const server = new Server(expressApplication)

server.startServer()
