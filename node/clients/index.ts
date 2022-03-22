import { IOClients } from '@vtex/api'
import Cep from './Queries/Cep'
import Analytics from './Queries/analytics'
import Climate from './Queries/Climate'


// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
	public get returnCep() {
		return this.getOrSet("returnCep", Cep);
	}

  public get analytics() {
    return this.getOrSet('analytics', Analytics)
  }

  public get returnWeatherforecast() {
    return this.getOrSet('returnWeatherforecast', Climate)
  }
}
