import {
  LRUCache,
  Service,
  ServiceContext,
  ParamsContext,
  RecorderState,
  method,
} from '@vtex/api'
import { Clients } from './clients'
import { analytics } from './handlers/analytics'

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 })
metrics.trackCache('status', memoryCache)

declare global {
  type Context = ServiceContext<Clients, State>

  interface State extends RecorderState {
    code: number
  }
}

const validateCep = () => {

	const prepareAsync = async (ctx:any) => {
		try {
			const {
				vtex: {
					route: { params },
				},
				response: res,
			} = ctx

			console.info('Received params:', params.cep)
			const response = await ctx.Clients.returnCep.ValidateCep(params.cep)

			ctx.body = response
			res.status = 200
		} catch (error) {
			ctx.body = "Problem querying the api"
			ctx.status = 400
		}
	}
	return prepareAsync;

}

export default new Service<Clients, State, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        retries: 2,
        timeout: 10000,
      },
    },
  },
  routes: {
    analytics: method({
      GET: [analytics],
    }),
    weatherForecast: method({
      GET: [analytics],
    }),
    validateCep: method({GET: validateCep()})
  },
})
