"use client";
import type { Song } from '@/app/types';
import MenuWrapper from './components/MenuWrapper';
import useSongs from './hooks/useSongs';
import SongItem from '@/app/components/SongItem';

export default function Home() {
    const { songs } = useSongs();

    const songList = songs?.map((song: Song) => <SongItem song={song} />)

  return (
    <MenuWrapper>{songList}</MenuWrapper>
  );
}
