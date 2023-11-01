import React from 'react'
import { Pressable, Image } from 'react-native';
import { Title } from './Title';
import { router } from 'expo-router';

interface Props {
  icon: any
  href: string;
  label: string;
}

export const OptionCard: React.FC<Props> = ({ icon, label, href }) => {
  return (
    <Pressable style={{
      display: "flex", flexDirection: "column", gap: 10, justifyContent: "center", alignItems: "center",
      backgroundColor: "#0F172A",
      boxShadow: "-14.72px 17.35px 84.11px 0px rgba(153, 77, 250, 0.30), 15.77px -13.67px 112.5px 0px rgba(12, 221, 236, 0.30);",
      borderColor: "#fff",
      borderWidth: 0.5,
      width: 150,
      height: 150
    }}
      onPress={() => router.push(`/${href}`)}
    >
      <Image source={icon} style={{ width: 60, height: 62 }} />
      <Title size='sm' bold>{label}</Title>
    </Pressable>
  )
}
