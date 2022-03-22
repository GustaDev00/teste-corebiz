export async function weatherforecast(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { returnWeatherforecast },
    vtex: {
      route: { params },
    },
    response: res,
  } = ctx
  try{
  console.info('Received:', params.climate)
  const response = await returnWeatherforecast.goweather(params.climate)
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
