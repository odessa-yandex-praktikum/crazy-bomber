import {useState, useEffect} from 'react';

const useAudio = (url: string) => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(true);

    const pauseAudio = () => setPlaying(false);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing]);

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return [pauseAudio];
};

export {useAudio};
