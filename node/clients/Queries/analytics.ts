import { AppClient, InstanceOptions, IOContext } from '@vtex/api'

export default class Analytics extends AppClient {

  constructor(context: IOContext, options?: InstanceOptions) {
    super('vtex.mocked-analytics@0.x', context, options)
  }

  public getLiveUsers(): any {
    return this.http.get('_v/live-products')
   }
}
