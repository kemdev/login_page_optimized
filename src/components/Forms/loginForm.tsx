import styles from './loginForm.module.css';
import React from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { BuiltInProviderType } from 'next-auth/providers/index';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';

import { ThemeProvider, createTheme } from '@mui/material';

import Header from './comps/formHeader';
import FormContents from './comps/formContents';
import FormFooter from './comps/formFooter';

const theme = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          ':after': {
            borderBottomColor: '#fff !important',
          },
          '&:before': {
            borderBottomColor: '#ffffff70',
          },
          '&:hover': {
            '&:before': {
              borderBottom: '1px solid #fff !important',
            },
          },
          input: {
            color: '#fff',
            '&::placeholder': {
              color: '#fff',
            },
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          color: '#fff !important',

          '& .Mui-focused': {
            colors: '#ffff !important',
          },
        },
      },
    },
  },
});

interface IFormProps {
  config: {
    providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>;
    hostname: string | undefined;
  };
}

export default function LoginFrom({ config }: IFormProps) {
  return (
    <ThemeProvider theme={theme}>
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        component={Paper}
        elevation={6}
        square
        className={styles.rightItem + ' d-grid-center'}
      >
        <Header />

        {/* form */}
        <FormContents
          config={config}
          footerAction={
            <FormFooter
              github={config.providers['github']}
              githubButtonClassName={styles['github-btn']}
            />
          }
        />
      </Grid>
    </ThemeProvider>
  );
}
