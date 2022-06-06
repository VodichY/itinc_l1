import { videos } from './db';

export const videosRepository = {
    getVideos() {
		return videos;	
    },
    getVideoById(id: number) {
		const video = videos.find((elem) => elem.id === id);
		return video;
    },
    deleteVideoById(id: number) {
		const indexElem = videos.findIndex((elem) => elem.id === id);		
		if (indexElem >= 0 ) {
			let deletedVideos = videos.splice(indexElem, 1);
			return true;
		} 
		return false;
    },
    updateVideoById(id: number, title: string) {
		const video = videosRepository.getVideoById(id);
		if(video) {
			video.title =  title;
			return true;
		}		
		return false;
    },
    createVideo(ititle: string) {
		const newVideo = {
            id: +(new Date()),
            title: ititle,
            author: 'it-incubator.eu'
        }
        videos.push(newVideo);
		return newVideo;
    }
}