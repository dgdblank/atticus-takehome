import React, { useState } from 'react';
import MenuWrapper from '@/app/components/MenuWrapper';
import useSongs from '@/app/hooks/useSongs';
import SongItem from '@/app/components/SongItem';
import { Song } from '@/app/types';

const ArtistPage = ({ params }) => {
    // Use artist name to filter songs by artist
    console.log(params);

    const { songs } = useSongs()
    const [songsByAlbum, setSongsByAlbum] = useState<{[key: string]: React.ReactNode[]}>({});

    songs.forEach((song, index) => {
        const item = <SongItem key={index} song={song} />
        if (songsByAlbum[song.album]) {
            songsByAlbum[song.album].push(item);
        } else {
            songsByAlbum[song.album] = [item];
        }
    })

    return <MenuWrapper>
        <div>Songs by Album</div>
    </MenuWrapper>;
}

type SongsByAlbum = {
    album: string;
    songs: React.ReactNode[];
}
const SongsByAlbum = ({ album, songs }: SongsByAlbum) => {
    return <div>
        <div>{album}</div>
        <div>{songs}</div>
    </div>
}

export default ArtistPage;