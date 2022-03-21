import { IOClients } from '@vtex/api'
import { ValidateCep } from './Queries/validateCep'


// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
	public get getCep() {
		return this.getOrSet("getCep", ValidateCep);
	}
}
