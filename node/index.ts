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

	const cepAsync = async (ctx: any) => {
		try {
			// pegando os parametros da url
			const request = ctx.query;
			const { cep } = request || {};
			const newResponse = await ctx.clients.getCep.getCep(cep);
			// console.log("response =>", newResponse)
			ctx.status = 200;
			ctx.body = newResponse
		} catch (err) {
			ctx.status = 400;
			ctx.body = "Sem resposta";
		}
	};

	return cepAsync;
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
    validateCep: method({
      GET: validateCep,
    }),
    weatherForecast: method({
      GET: [analytics],
    })
  },
})
