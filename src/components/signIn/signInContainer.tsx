import styles from './signInContainer.module.css';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Grid from '@mui/material/Grid';

import { BuiltInProviderType } from 'next-auth/providers/index';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';

import ParallaxEffectImg from '../parallax/parallax';
import parallaxBackgroundImage from '@/public/leftImg/Background_.webp';

import LoginFrom from '../Forms/loginForm';

type Props = {
  config: {
    providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>;
    hostname: string | undefined;
  };
};

export default function SignInContainer({ config }: Props) {
  const providers = Object.values(config?.providers);
  const github = config.providers['github'];
  const credential = config.providers['credentials'];

  return (
    <Grid
      container
      component='main'
      sx={{ height: '100vh' }}
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden',
          backgroundImage: `url(${parallaxBackgroundImage.src})`,
        }}
        className={`centered-container ${styles.leftItem}`}
      >
        <ParallaxEffectImg />
      </Grid>

      <LoginFrom config={config} />
    </Grid>
  );
}
