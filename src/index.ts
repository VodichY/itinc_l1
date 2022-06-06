import express, { Request, Response } from 'express'
import { videosRepository } from './repositories/videos-repository'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 5000

app.use(cors())

app.use(express.json())

app.get('/', (req: Request, res: Response ) => {
    res.send('Hello : World!')
})

app.get('/videos', (req: Request, res: Response) => {
    const videos = videosRepository.getVideos();
    res.status(200).send(videos);
})

app.get('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId;
    const video = videosRepository.getVideoById(id);

    if (video) {
        res.status(200).send(video); 
    } else {
        res.status(404).send('video is not found!');
    }
})

app.post('/videos', (req: Request, res: Response) => {

    if(req.body.title && req.body.title.length <= 40) {
        const newVideo = videosRepository.createVideo(req.body.title);
        res.status(201).send(newVideo)
    } else {
        res.sendStatus(400).
        send({
            "errorsMessages": [
                {
                    "message": "The Title field is required.",
                    "field": "title"
                }
            ],
            "resultCode": 1
        }); 
    }

    
})

app.delete('/videos/:id',(req: Request, res: Response)=>{
    const id = +req.params.id;
    const video = videosRepository.getVideoById(id);  
    
    if (!video) {
        res.status(404).send('video is not found!');   
    } else {
        const result = videosRepository.deleteVideoById(id);
        res.sendStatus(204);
    }
    
   })

app.put('/videos/:id',(req: Request, res: Response)=>{
    const id = +req.params.id;
    const video = videosRepository.getVideoById(id);
        
    if(video && req.body.title && req.body.title.length <= 40 ) {
        const result = videosRepository.updateVideoById(id, req.body.title);
            res.send(204); 
    } else if(!video) {
        res.sendStatus(404);
    } else { 
        res.status(400).
        send({
            "errorsMessages": [
                {
                    "message": "The Title field is required.",
                    "field": "title"
                }
            ],
            "resultCode": 1
        });    
    }
   
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

