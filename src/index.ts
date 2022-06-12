import express, { Request, Response } from 'express'
import { videosRouter } from './routes/videos-routes';
import { checkIp } from './common/validationIp';
import { requestCount } from './common/smthCount';
import { checkContentType } from './common/validationContent';
import { checkAuthorization } from './common/auth';
import { inputValidatorMiddleware, validateHandler } from './common/input-validator-middleware';
import cors from 'cors'
const app = express()
const port = process.env.PORT || 5000

app.use(cors())

app.use(express.json())

app.all('*', requestCount)

app.all('*', checkAuthorization)

app.all('*', checkIp)

app.all('*', checkContentType)

app.all('*', inputValidatorMiddleware, validateHandler)

app.get('/', (req: Request, res: Response ) => {
    res.send('Hello : World!')
})

app.use('/videos', videosRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

