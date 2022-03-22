import { AppClient, InstanceOptions, IOContext } from '@vtex/api'
import axios from 'axios'

export default class validateCep extends AppClient {

  constructor(context: IOContext, options?: InstanceOptions) {
    super('vtex.mocked-analytics@0.x', context, options)
  }

  public async goweather(value: any) {
    console.log('Clima tempo response: ', value)
    const locate = value
    let url = `https://goweather.herokuapp.com/weather/${locate}`
    const resp = await axios.get(url)
    return resp.data ? resp.data : false
   }
}
