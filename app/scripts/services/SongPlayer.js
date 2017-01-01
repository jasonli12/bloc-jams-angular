(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};

/**
*@desc Define currentAlbum to be album stored in Fixture service (i.e. albumPicasso)
*@type {Object}
*/             
        
        var currentAlbum = Fixtures.getAlbum();
        
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
                stopSong(SongPlayer.currentSong);
            }
        
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
                
            SongPlayer.currentSong = song;
        };
/**
*@function getSongIndex
*@desc Retrieves index of song object in songs Array
*@param {Object} song
*/        
                
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
/**
*@desc current playing song object in songs array in album
*@type {Object}
*/     
        
        SongPlayer.currentSong = null;
        
/**
*@function playSong
*@desc Play song in currentBuzzObject and set playing property of song object to true
*@param {Object} song
*/                
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

/**
*@function stopSong
*@desc Stops song in currentBuzzObject and set playing property of song object to null
*@param {Object} song
*/                
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        };
                    
        
/**
*@function Songplayer.play
*@desc Checks whether currently playing song is the same is target song (ex. clicked song). If they are not the same, run setSong to stop the currently playing song and play target song. If they are the same, play target song.
*@param {Object} song
*/                
        SongPlayer.play = function(song) { //song = associated song object in songs array, ex. { title: 'Blue', duration: 161.71, audioUrl: 'assets/music/blue' }
            
            song = song || SongPlayer.currentSong;
            
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
                
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

/**
*@function Songplayer.pause
*@desc Pause song in currentBuzzObject and set playing property of song object to false
*@param {Object} song
*/     
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
/**
*@function Songplayer.previous
*@desc Sets currentSongIndex to be one before the current song index.
*/     
        
        
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if(currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            } else {
                song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if(currentSongIndex >= currentAlbum.songs.length) {
                stopSong(SongPlayer.currentSong);
            } else {
                song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;

    }
    
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();