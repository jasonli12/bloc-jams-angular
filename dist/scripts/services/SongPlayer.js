(function() {
    function SongPlayer() {
        var SongPlayer = {};

/**
*@desc current playing song object in songs array in album
*@type {Object}
*/     
        
        var currentSong = null;
        
/**
*@desc Buzz object audio file
*@type {Object}
*/        
        var currentBuzzObject = null;
/**
*@function setSong
*@desc Stops currently playing song and loads new audio file as currentBuzzObject
*@param {Object} song
*/        
        
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
        
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
                
            currentSong = song;
        };
/**
*@function Songplayer.play
*@desc Checks whether currently playing song is the same is target song (ex. clicked song). If they are not the same, run setSong to stop the currently playing song and play target song. If they are the same, play target song.
*@param {Object} song
*/                
        SongPlayer.play = function(song) { //song = associated song object in songs array, ex. { title: 'Blue', duration: 161.71, audioUrl: 'assets/music/blue' }
            
/**
*@function playSong
*@desc Play song in currentBuzzObject and set playing property of song object to true
*/                
            var playSong = function() {
                currentBuzzObject.play();
                song.playing = true;
            }
            
            if (currentSong !== song) {
                setSong(song);
                playSong();
                
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong();
                }
            }
        };

/**
*@function Songplayer.pause
*@desc Pause song in currentBuzzObject and set playing property of song object to false
*@param {Object} song
*/     
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;

    }
    
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();