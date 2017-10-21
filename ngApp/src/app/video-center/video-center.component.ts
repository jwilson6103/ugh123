import { Component, OnInit } from '@angular/core';
import { Video } from './../video'
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService]
})
export class VideoCenterComponent implements OnInit {

  videos: Array<Video>

  selectedVideo: Video

  private hidenewvideo: boolean = true

  constructor(private _videoService: VideoService) { }

  ngOnInit() {
    this._videoService.getVideos()
      .subscribe(resVideoData => this.videos = resVideoData)
  }

  onSelectVideo(video:any){
    this.selectedVideo = video
    this.hidenewvideo = true
    console.log(this.selectedVideo)
  }

  onSubmitAddVideo(video: Video) {
    this._videoService.addVideo(video)
      .subscribe(resNewVideo => {
        this.videos.push(resNewVideo)
        this.hidenewvideo = true
        this.selectedVideo = resNewVideo
      })
  }

  onUpdateVideoEvent(video:any) {
    this._videoService.updateVideo(video)
      .subscribe(resUpdatedVideo => video = resUpdatedVideo)
    this.selectedVideo = null
  }

  onDeleteVideoEvent(video:any) {
    let videoArray = this.videos  
    this._videoService.deleteVideo(video)
      .subscribe(resDeletedVideo => {
        for(let i=0; i < videoArray.length; i++) {
          if(videoArray[i]._id === video._id) {
            videoArray.splice(i,1)
          }
        }
      })
    this.selectedVideo = null
  }

  newVideo() {
    this.hidenewvideo = false
  }

}
