import express, { Request, Response } from 'express'
import { videosRouter } from './routes/videos-routes';
import cors from 'cors'
const app = express()
const port = process.env.PORT || 5000

app.use(cors())

app.use(express.json())

app.get('/', (req: Request, res: Response ) => {
    res.send('Hello : World!')
})

app.use('/videos', videosRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

