import express, { Request, Response } from 'express'
import cors from 'cors'
const app = express()
const port = process.env.port || 5000

let videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]; 

app.use(cors())

app.use(express.json())

app.get('/', (req: Request, res: Response ) => {
    res.send('Hello: World !')
})

app.get('/videos', (req: Request, res: Response) => {
    res.send(videos);
})

app.get('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId;
    const video = videos.find((elem) => elem.id === id);
    if (video) {
        res.status(201);
        res.send(video);   
    } else {
        res.status(404);
        res.send('video is not found!'); 
    }
})

app.post('/videos', (req: Request, res: Response) => {
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)
})

app.delete('/videos/:id',(req: Request, res: Response)=>{
    const id = +req.params.id;
    videos = videos.filter(elem => elem.id !== id)
    res.status(204).send();
   })

app.put('/videos/:id',(req: Request, res: Response)=>{
    const id = +req.params.id;
    let video = videos.find((elem) => elem.id === id);
    if (video) {
        video.title =  req.body.title;
    }
    res.status(204).send(video);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

