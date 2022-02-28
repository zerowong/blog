import http2 from 'http2'
import http from 'http'
import type { Http2SecureServer } from 'http2'
import type { Server } from 'http'
import fs from 'fs'
import koa from 'koa'
import helmet from 'koa-helmet'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import mongoose from 'mongoose'
import router from './routes'
import { CORS_ORIGIN, SERVER_KEY_PATH, SERVER_CRT_PATH, serverConfig } from './utils'
import { errorHanlder } from './middlewares'

/**
 * 连接数据库
 */
async function connectDb() {
  await mongoose.connect('mongodb://localhost/blog', {
    user: serverConfig.db.user,
    pass: serverConfig.db.pass,
  })
  const { user, name, host, port } = mongoose.connection
  console.log('[Mongoose] Connected. info:', {
    user,
    db: name,
    host,
    port,
    models: mongoose.connection.modelNames(),
    ver: mongoose.version,
  })
}

/**
 * 启动服务
 */
function startServer() {
  const version = '1.1.0'

  const app = new koa()

  app.use(helmet())

  app.use(logger())

  app.use(cors({ credentials: true, origin: CORS_ORIGIN, maxAge: 3600 }))

  app.use(
    bodyParser({
      enableTypes: ['json'],
      onerror(err, ctx) {
        ctx.throw(422)
      },
    })
  )

  app.use(errorHanlder)

  app.use(router.routes())
  app.use(router.allowedMethods())

  let server: Http2SecureServer | Server
  const info = {
    NODE_ENV: process.env.NODE_ENV,
    tls: true,
    node_ver: process.version,
    ver: version,
  }

  return new Promise<void>((resolve, reject) => {
    try {
      if (process.env.NODE_ENV === 'prod') {
        server = http2.createSecureServer(
          {
            key: fs.readFileSync(SERVER_KEY_PATH),
            cert: fs.readFileSync(SERVER_CRT_PATH),
            allowHTTP1: true,
          },
          app.callback()
        )
      } else {
        server = http.createServer(app.callback())
        info.tls = false
      }

      server.listen(process.env.PORT ?? 3000, () => {
        const address = server.address()
        if (address && typeof address !== 'string') {
          Object.assign(info, address)
        }
        console.log('[Server] Launched. info:', info)
      })

      return resolve()
    } catch (err) {
      return reject(err)
    }
  })
}

Promise.all([connectDb(), startServer()]).then(
  () => {
    return process.send?.('ready')
  },
  () => {
    return process.exit(1)
  }
)
