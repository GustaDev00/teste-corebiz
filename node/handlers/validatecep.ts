export async function verifycep(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { returnCep },
    vtex: {
      route: { params },
    },
    response: res,
  } = ctx
  try{
  console.info('Received:', params.cep)
  const response = await returnCep.correiosCep(params.cep)
  // console.log(response)
  res.status = 200
  ctx.body = response
  ctx.set('cache-control', 'no-cache')
  await next()
  }catch(e){
    console.log(e)
    res.status = 404
  }
}
