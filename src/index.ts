import express, { Request, Response } from 'express'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 5000

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
    res.send('Hello : World!')
})

app.get('/videos', (req: Request, res: Response) => {
    res.status(200).send(videos);
})

app.get('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId;
    const video = videos.find((elem) => elem.id === id);
    if (video) {
        res.status(200).send(video); 
    } else {
        res.status(404).send('video is not found!');
    }
})

app.post('/videos', (req: Request, res: Response) => {

    if(req.body.title && req.body.title.length <= 40) {
        const newVideo = {
            id: +(new Date()),
            title: req.body.title,
            author: 'it-incubator.eu'
        }
        videos.push(newVideo)
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

app.delete('/videos/:id',(req: Request, res: Response)=>{
    const id = +req.params.id;
    const video = videos.find((elem) => elem.id === id);  
    
    if (!video) {
        res.status(404).send('video is not found!');   
    } else {
        videos = videos.filter(elem => elem.id !== id);
        res.send(204);
    }
    
   })

app.put('/videos/:id',(req: Request, res: Response)=>{
    const id = +req.params.id;
    let video = videos.find((elem) => elem.id === id);
    
    if(video && req.body.title && req.body.title.length <= 40 ) {
        video.title =  req.body.title;
            res.send(204); 
    } else if(!video) {
        res.status(404).send();
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

