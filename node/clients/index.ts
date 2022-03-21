import { IOClients } from '@vtex/api'
import { Cep } from './Queries/Cep'


// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
	public get returnCep() {
		return this.getOrSet("ValidateCep", Cep);
	}
}
