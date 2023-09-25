import Express, { type Express as ExpressApplication } from 'express'

import { cors } from './middlewares'
import { storesRouter } from './routes/stores.routes'

export class Server {
	private readonly port: string | number = process.env.PORT ?? 3000

	public constructor(
		private readonly app: ExpressApplication
	) {
		// Middlewares
		this.app.use(Express.json())
		this.app.use(cors())

		// Routes
		this.app.use('/stores', storesRouter)
	}

	startServer(): void {
		this.app.listen(this.port)
		console.log(`Server listening to the port: ${this.port}`)
	}
}
