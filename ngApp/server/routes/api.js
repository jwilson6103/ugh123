const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Video = require('../models/video')

const db = 'mongodb://localhost/videoplayer'
mongoose.Promise = global.Promise
mongoose.connect(db, function(err){
    if(err){
        console.error("Error! " + err)
    }
})

router.get('/videos', function(req, res){
    Video.find({})
    .exec(function(err, videos){
        if (err) {
            console.log("Error retrieving videos")
        } else {
            res.json(videos)
        }
    })
})

router.get('/videos/:id', function(req, res){
    Video.findById(req.params.id)
    .exec(function(err, video){
        if (err) {
            console.log("Error retrieving videos")
        } else {
            res.json(video)
        }
    })
})

router.post('/video', function(req, res){
    var newVideo = new Video()
    newVideo.title = req.body.title
    newVideo.url = req.body.url
    newVideo.description = req.body.description
    newVideo.save(function(err, insertedVideo){
        if (err){
            console.log('Error saving video' + err)
        } else {
            res.json(insertedVideo)
        }
    })
})

router.put('/video/:id', function(req, res){
    Video.findByIdAndUpdate(req.params.id,
    {
        $set: {title: req.body.title,
        url: req.body.url,
        description: req.body.description}
    },
    {
        new: true
    },
    function(err, updatedVideo){
        if(err){
            res.send("Error updating video")
        } else {
            res.json(updatedVideo)
        }
    }
    )
})

router.delete('/video/:id', function(req, res){
    Video.findByIdAndRemove(req.params.id,
    function(err, deleteVideo){
        if(err){
            res.send('Error deleting vide')
        } else {
            res.json(deleteVideo)
        }
    })
})

module.exports = router