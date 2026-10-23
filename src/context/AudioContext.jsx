import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { murottalTracks } from '../data/murottalData';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(true);

  const audioRef = useRef(new Audio());

  // Sinkronisasi volume audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, []);

  const playTrack = (track) => {
    if (!track) return;

    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      return;
    }

    setCurrentTrack(track);
    setIsLoading(true);
    audioRef.current.src = track.audioUrl;
    audioRef.current.load();
    audioRef.current.play().catch(() => {
      setIsLoading(false);
    });
    setIsPlayerOpen(true);
  };

  const togglePlay = () => {
    if (!currentTrack) {
      // Putar default Surah An-Nur
      playTrack(murottalTracks[0]);
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  };

  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const changeVolume = (val) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolume(clamped);
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        isLoading,
        isPlayerOpen,
        setIsPlayerOpen,
        playTrack,
        togglePlay,
        seek,
        changeVolume,
        stopAudio
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
