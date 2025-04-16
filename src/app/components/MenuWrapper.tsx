'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/navigation';
import { PlusOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;


type MenuItem = Required<MenuProps>['items'][number];
type MenuInfo = { key: string }

type HomeProps = {
    children?: ReactNode
}


export default function MenuWrapper({ children }: HomeProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<MenuItem[]>([]);
  const router = useRouter();
  
  // Create playlist broken because playlist set to items before playlists is created
  const items: MenuItem[] = [
    {key: 0, label: 'Add playlist', icon: <PlusOutlined />, 
        children: [{ key: 'add-playlist', label: <PlaylistInput playlists={playlists} setPlaylists={setPlaylists} />}]}, 
    {key: 1, label: 'Playlist1'},
    {key: 2, label: 'Playlist2'}
];

    useEffect(() => {
        if (playlists.length === 0) {
            // TODO: Fetch playlists from endpoint
            setPlaylists(items);
        }

    }, [playlists])

  const onMenuItemClick: MenuProps["onClick"] = (info: MenuInfo) => {
    const key = parseInt(info.key);
    
    if (key === 0) {
        return;
    }

    const selectedPlaylist = items[key]
    // @ts-ignore
    router.replace(`/playlist/${selectedPlaylist?.label}`)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu onClick={onMenuItemClick} theme="dark" mode="inline" items={playlists} />
      </Sider>
      <Content>
        {children}
      </Content>
    </Layout>
  );
}

type PlaylistInput = {
    playlists: MenuItem[];
    setPlaylists: (x: MenuItem[]) => void;
}

const PlaylistInput = ({ playlists, setPlaylists }: PlaylistInput) => {
    console.log('playlists', playlists);

    const [name, setName] = useState<string>('')

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            const newPlaylists = [...playlists, { key: playlists.length - 1, label: name }];
            console.log('newPlaylists', newPlaylists);
            setPlaylists(newPlaylists);
        }
    }

    return <input placeholder={'Add playlist'} value={name} onChange={onChange} onKeyDown={onKeyDown} />
}
