const express = require('express')
const app = express()
const initCycleTLS = require('cycletls')
const morgan = require('morgan')

const PORT = 33333

const DEFAULT_JA3 =
  '771,4865-4866-4867-49195-49199-49196-49200-52393-52392-49171-49172-156-157-47-53,0-23-65281-10-11-35-16-5-13-18-51-45-43-27-21,29-23-24,0'

let client;

const start = async () => {
  client = await initCycleTLS()
  app.use(express.json())
  app.use(morgan('tiny'))
  app.all('*', async (req, res) => {
    let headers = req.headers
    const target = headers['x-cycletls-target']
    const proxy = headers['x-cycletls-proxy'] || undefined
    const ja3 = headers['x-cycletls-ja3'] || DEFAULT_JA3
    const timeout = headers['x-cycletls-timeout'] || 30000

    if (!target) {
      return res.status(400).send('targetUrl query parameter is required')
    }

    const url = `${target}${req.url}`
    const host = new URL(url).host
    const method = req.method
    const body = JSON.stringify(req.body)

    const userAgent = headers['user-agent']

    delete headers['x-cycletls-target']
    delete headers['x-cycletls-timeout']
    delete headers['host']
    delete headers['content-length']

    headers = {
      ...headers,
      host
    }
    const options = {
      ja3,
      userAgent,
      timeout,
      headers
    }
    if (proxy) {
      options.proxy = proxy
      delete headers['x-cycletls-proxy']
    }
    options.body = body === '{}' ? '' : body

    await client(url, options, method.toLocaleLowerCase())
      .then((response) => {
        const headers = response.headers
        Object.keys(headers).forEach((key) => {
          if (key.toLocaleLowerCase().startsWith('x-')) res.setHeader(key, headers[key])
        })

        if (headers['Set-Cookie']) {
          const cookies = headers['Set-Cookie'].map((cookie) => {
            return cookie.replace(/domain=([^;]+);/i, `Domain=${host};`)
          })
          res.setHeader('Set-Cookie', cookies)
        }
        res.status(response.status).json(response.body)
      })
      .catch((err) => {
        res.status(500).json({ error: err.message })
      })
  })

  app.listen(PORT, () => {
    console.log(`✨ CycletlsAPIServer running on http://localhost:${PORT}`)
  })
}

start()

process.on('uncaughtException', async (err) => {
  console.log('🚀 ~ uncaughtException ~ err', err?.message)
})

process.on('unhandledRejection', async (err) => {
  console.log('🚀 ~ unhandledRejection ~ err', err)
})
