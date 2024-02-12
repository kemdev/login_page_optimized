import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import logo_white from '@/public/logo_white.png';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface IHeaderProps {
  title?: string;
  imageData?: string | StaticImport;
}

export default function FormHeader({
  title = 'Hello Admin',
  imageData = logo_white.src,
}: IHeaderProps) {
  return (
    <Box
      className='login-header'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Image
        src={imageData}
        alt='logo'
        className='next-image'
        id='next-image'
        width={400}
        height={400}
        style={{
          maxWidth: '40%',
          height: 'auto',
        }}
      />

      <Typography
        component='p'
        className='bt-display-1 uppercase txt-center'
      >
        {title}
      </Typography>
    </Box>
  );
}
