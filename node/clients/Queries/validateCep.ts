import { InstanceOptions, IOContext, ExternalClient } from "@vtex/api";
import axios from 'axios'

export class ValidateCep extends ExternalClient {
	public constructor(ctx: IOContext, options?: InstanceOptions) {
		super("http://licensemanager.vtex.com.br/api/pvt/accounts", ctx, {
			...options,
			headers: {
				...(options && options.headers),
				...{
					"Content-Type": "application/json",
					store: "1",
				},
				...(ctx.adminUserAuthToken
					? { VtexIdclientAutCookie: ctx.adminUserAuthToken }
					: null),
			},
		});
	}

	public async ValidateCep(value: string) {
    const cep = value
    let url = `https://viacep.com.br/ws/${cep}/json/`
    axios.get(url).then((resp) => {
      return resp.data
    }).catch(() => {
      return false
    })

	}
}
