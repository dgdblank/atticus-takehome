'use client';
import { Song } from '@/app/types';
import { useState, useEffect} from 'react';

const useSongs = () => {
    const [songs, setSongs] = useState<Song[]>([])
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState(<boolean>false);

    const shouldFetch = songs.length === 0 && !loading && !error;

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://storage.googleapis.com/atticus-frontend-assessment/api/songs.json')
            
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }

            const data = await response.json();
            setLoading(false);
            setSongs(data?.songs);
        } catch (err: any) {
            setLoading(false);
            setError(err.message);
        }
    }
    
    useEffect(() => {
        if (shouldFetch) {
            fetchData()
        }
    }, [songs, error, loading])

    
    return {
        songs,
        error,
        loading,
    }
}

export default useSongs;