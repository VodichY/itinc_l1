import {Request, Response, Router} from 'express'
import { videosRepository } from '../repositories/videos-repository'

// put here array with videos
export const videosRouter = Router({})

// bind here videosRouter with all handlers

videosRouter.get('/', (req: Request, res: Response) => {
    const videos = videosRepository.getVideos();
    res.status(200).send(videos);
})

videosRouter.get('/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId;
    const video = videosRepository.getVideoById(id);

    if (video) {
        res.status(200).send(video); 
    } else {
        res.status(404).send('video is not found!');
    }
})

videosRouter.post('/', (req: Request, res: Response) => {

    if(req.body.title && req.body.title.length <= 40) {
        const newVideo = videosRepository.createVideo(req.body.title);
        res.status(201).send(newVideo)
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

videosRouter.delete('/:id',(req: Request, res: Response)=>{
    const id = +req.params.id;
    const video = videosRepository.getVideoById(id);  
    
    if (!video) {
        res.status(404).send('video is not found!');   
    } else {
        const result = videosRepository.deleteVideoById(id);
        res.sendStatus(204);
    }
    
   })

videosRouter.put('/:id',(req: Request, res: Response)=>{
    const id = +req.params.id;
    const video = videosRepository.getVideoById(id);
        
    if(video && req.body.title && req.body.title.length <= 40 ) {
        const result = videosRepository.updateVideoById(id, req.body.title);
            res.sendStatus(204); 
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