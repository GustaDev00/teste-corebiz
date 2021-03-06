import { AppClient, InstanceOptions, IOContext } from '@vtex/api'
import axios from 'axios'

export default class validateCep extends AppClient {

  constructor(context: IOContext, options?: InstanceOptions) {
    super('vtex.mocked-analytics@0.x', context, options)
  }

  public async correiosCep(value: any) {
    console.log('Correio response: ', value)
    const cep = value
    let url = `https://viacep.com.br/ws/${cep}/json/`
    const resp = await axios.get(url)
    return resp.data ? resp.data : false
   }
}
