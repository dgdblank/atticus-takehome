'use client';
import React, { useState, useEffect}  from 'react';
import MenuWrapper from '@/app/components/MenuWrapper';
import useSongs from '@/app/hooks/useSongs';
import { Song } from '@/app/types';
import SongItem from '@/app/components/SongItem';

import { Divider, Button } from 'antd';


const Playlist = () => {
    const [playlistSongs, setPlaylistSongs] = useState<Song[]>([]);
    const { songs } = useSongs();

    useEffect(() => {
        setPlaylistSongs(songs);
    }, [songs])

    const songList = playlistSongs?.map((song: Song, index) => <SongItem key={index} song={song} />)

    const onShuffle = () => {
        let sortedSongs: Song[] = [];
        playlistSongs.forEach((song, index) => {
            const newIndex = Math.floor(Math.random() * playlistSongs.length - 1);
            const oldSong = playlistSongs[newIndex];

            sortedSongs[index] = oldSong;
            sortedSongs[newIndex] = song;

        })
        
        setPlaylistSongs(sortedSongs);
    }

    return (
    <MenuWrapper>
        <div>
            <div className="right-align">
                <Button onClick={onShuffle}>Shuffle</Button>
                <Button>Sort</Button>
            </div>

            <Divider dashed />
            <div>{songList}</div>
        </div>
    </MenuWrapper>);
}

export default Playlist;