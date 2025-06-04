import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';

type AudioContextProps = {
  musica: boolean;
  sons: boolean;
  trancarVolume: boolean;
  setMusica: (value: boolean) => void;
  setSons: (value: boolean) => void;
  setTrancarVolume: (value: boolean) => void;
  playEffect: (soundFile: any) => void;
};

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [musica, setMusica] = useState<boolean | null>(null);
  const [sons, setSons] = useState<boolean | null>(null);
  const [trancarVolume, setTrancarVolume] = useState<boolean | null>(null);

  const musicSound = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const setupMusic = async () => {
      try {
        if (musica) {
          if (!musicSound.current) {
            const { sound } = await Audio.Sound.createAsync(
              require('../assets/audio/track-1.mp3'),
              { isLooping: true, shouldPlay: true, volume: trancarVolume ? 0.2 : 1.0 }
            );
            musicSound.current = sound;
          } else {
            await musicSound.current.setVolumeAsync(trancarVolume ? 0.2 : 1.0);
            await musicSound.current.playAsync();
          }
        } else {
          if (musicSound.current) {
            await musicSound.current.stopAsync();
          }
        }
      } catch (error) {
        console.log('Erro ao configurar música:', error);
      }
    };

    setupMusic();

    return () => {
      musicSound.current?.unloadAsync();
      musicSound.current = null;
    };
  }, [musica, trancarVolume]);

  const playEffect = async (soundFile: any) => {
    if (!sons) return;
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.setVolumeAsync(trancarVolume ? 0.3 : 1.0);
    await sound.playAsync();

    sound.setOnPlaybackStatusUpdate(status => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  };

  return (
    <AudioContext.Provider
      value={{
        musica,
        sons,
        trancarVolume,
        setMusica,
        setSons,
        setTrancarVolume,
        playEffect,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
