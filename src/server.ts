import Express, { type Express as ExpressApplication } from 'express'
import cors from 'cors'
import { storesRouter } from './routes/stores.routes'
import { ACCEPTED_ORIGINS, PORT } from './config'

export class Server {
	private readonly port: number = Number(PORT ?? '3000')

	public constructor(
		private readonly app: ExpressApplication
	) {
		// Middlewares
		this.app.use(Express.json())
		this.app.use(cors({ origin: ACCEPTED_ORIGINS?.split(','), methods: 'GET' }))

		// Routes
		this.app.use('/stores', storesRouter)
	}

	startServer(): void {
		this.app.listen(this.port)
		console.log(`Server listening to the port: ${this.port}`)
	}
}
