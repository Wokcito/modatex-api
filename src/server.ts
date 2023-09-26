import Express, { type Express as ExpressApplication } from 'express'
import cors from 'cors'

import { storesRouter } from './routes/stores.routes'

export class Server {
	private readonly port: number = parseInt(process.env.PORT ?? '3000')

	public constructor(
		private readonly app: ExpressApplication
	) {
		// Middlewares
		this.app.use(Express.json())
		this.app.use(cors({ origin: process.env.ACCEPTED_ORIGIN, methods: 'GET' }))

		// Routes
		this.app.use('/stores', storesRouter)
	}

	startServer(): void {
		this.app.listen(this.port)
		console.log(`Server listening to the port: ${this.port}`)
	}
}
