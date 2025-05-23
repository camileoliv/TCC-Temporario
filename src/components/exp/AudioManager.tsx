// components/exp/AudioManager.tsx
import { useEffect, useRef } from 'react';
//import VolumeManager from 'react-native-volume-manager';
import { Audio } from 'expo-av';

type Props = {
  musica: boolean;
  sons: boolean;
  trancarVolume: boolean;
};

export default function AudioManager({ musica, sons, trancarVolume }: Props) {
  const musicaSound = useRef<Audio.Sound | null>(null);
  const efeitoSound = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const configurarAudio = async () => {
      // Música de fundo
      if (musica) {
        if (!musicaSound.current) {
          const sound = new Audio.Sound();
          try {
            await sound.loadAsync(require('../../assets/audio/sample.mp3'));
            await sound.setIsLoopingAsync(true);
            await sound.setVolumeAsync(0.2);
            await sound.playAsync();
            musicaSound.current = sound;
          } catch (error) {
            console.error('Erro ao tocar música:', error);
          }
        }
      } else {
        if (musicaSound.current) {
          await musicaSound.current.unloadAsync();
          musicaSound.current = null;
        }
      }

      // Som de botões
      if (sons) {
        if (!efeitoSound.current) {
          const efeito = new Audio.Sound();
          try {
            await efeito.loadAsync(require('../../assets/audio/click.mp3'));
            efeitoSound.current = efeito;
          } catch (error) {
            console.error('Erro ao carregar som de efeito:', error);
          }
        }
      } else {
        if (efeitoSound.current) {
          await efeitoSound.current.unloadAsync();
          efeitoSound.current = null;
        }
      }

      // Trancar volume
      if (trancarVolume) {
        VolumeManager.setVolume(0.2);
        VolumeManager.showNativeVolumeUI(false);
      } else {
        VolumeManager.showNativeVolumeUI(true);
      }
    };

    configurarAudio();

    return () => {
      if (musicaSound.current) {
        musicaSound.current.unloadAsync();
        musicaSound.current = null;
      }
      if (efeitoSound.current) {
        efeitoSound.current.unloadAsync();
        efeitoSound.current = null;
      }
    };
  }, [musica, sons, trancarVolume]);

  return null;
}