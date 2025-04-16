import React from 'react';
import Link from 'next/link';
import type { Song } from '@/app/types';


const SongItem = ({ song, key }: { song: Song, key: number }) => {
    const { title, album, artist } = song;

    return <div key={key}>{title} | <Link href={`/artist/${artist}`}>{artist}</Link> | {album} </div>
}

export default SongItem;