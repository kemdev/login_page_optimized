import styles from './signinContainer.module.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { BuiltInProviderType } from 'next-auth/providers/index';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';
import isEmail from 'validator/lib/isEmail';
import ParallaxEffectImg from '../parallax/parallax';
import parallaxBackgroundImage from '@/public/leftImg/Background_.webp';
import { ThemeProvider, createTheme } from '@mui/material';
import Image from 'next/image';
import logo_white from '@/public/logo_white.png';
import GitHubIcon from '@mui/icons-material/GitHub';
import { candy } from '@/util/boxShadowsVariants';

type Props = {
  config: {
    providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>;
    hostname: string | undefined;
  };
};

interface IFormValidate {
  email: boolean;
  password: boolean;
}

export default function SignInContainer({ config }: Props) {
  const providers = Object.values(config?.providers);
  const github = config.providers['github'];
  const credential = config.providers['credentials'];

  const [formValidate, setFormValidate] = useState<IFormValidate>({
    email: false,
    password: false,
  });

  // NOTE submit Handler
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const getData = new FormData(event.currentTarget);

    const email = getData.get('email') as string;
    const password = getData.get('password') as string;
    const emailValidator = isEmail(email);

    if (!emailValidator || password.length < 6) {
      setFormValidate({
        email: !emailValidator,
        password: password.length < 6,
      });
      return;
    }

    setFormValidate({
      email: true,
      password: true,
    });

    const data = {
      email,
      password,
    };

    credentialHandler(data);
  };

  const githubHandler = async () => {
    try {
      return await signIn(github.id);
    } catch (error) {
      return console.log('There been an error', error);
    }
  };

  // Credential Handler
  const credentialHandler = async (data: {
    email: string;
    password: string;
  }) => {
    try {
      return await signIn('credentials', {
        hostname: config.hostname,
        redirect: false,
        ...data,
      });
    } catch (error) {
      return console.log('There been an error', error);
    }
  };

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
        md={7}
        sx={{
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden',
          backgroundImage: `url(${parallaxBackgroundImage.src})`,
        }}
        className='centered-container leftItem'
      >
        <ParallaxEffectImg />
      </Grid>
      {/* <ThemeProvider theme={theme}> */}
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        className={styles.rightItem}
      >
        {/* <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          > */}
        <Box
          className='login-header'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Image
            src={logo_white.src}
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
            Hello Admin
          </Typography>
        </Box>

        {/* form */}
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            focused
            variant='standard'
            error={formValidate.email}
            onChange={(e) => {
              const value = e.target.value;
              const validate = isEmail(value);
              setFormValidate({
                ...formValidate,
                email: !validate,
              });
            }}
            sx={{
              '& .Mui-error::after': {
                borderBottomColor: '#d32f2f !important',
              },
            }}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            error={formValidate.password}
            onChange={(e) => {
              const value = e.target.value;
              setFormValidate({
                ...formValidate,
                password: value.length < 6,
              });
            }}
            variant='standard'
          />
          <FormControlLabel
            control={
              <Checkbox
                value='remember'
                color='primary'
              />
            }
            label='Remember me'
            sx={{
              '& .Mui-checked': {
                color: '#fff !important',
              },
              '& .MuiSvgIcon-root': {
                color: '#fff',
              },
            }}
          />
          <Button
            type='submit'
            variant='outlined'
            sx={{
              my: 4,
              mx: 'auto',
              fontSize: '1.4em',
              width: '50%',
              display: 'block',
              '&:hover': {
                backgroundColor: '#fff',
                color: '#000',
              },
            }}
            color='inherit'
            className='button'
          >
            Login
          </Button>

          <Grid
            container
            className='form-footer-container'
          >
            <Grid
              item
              xs
            >
              <Link
                href='#'
                variant='body2'
              >
                Forgot password?
              </Link>
            </Grid>

            <Grid item>
              <Link
                href='#'
                variant='body2'
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>

          <Box
            display={'flex'}
            justifyContent='center'
          >
            <Button
              fullWidth
              variant='outlined'
              color='inherit'
              sx={{
                width: '50%',
                mt: 4,
                background: '#fff',
                color: '#1c1b1c',

                '&:hover': {
                  color: '#fff',
                  boxShadow: candy,
                  border: 'none',
                },
              }}
              onClick={githubHandler}
            >
              <GitHubIcon
                sx={{ mr: 2 }}
                fontSize='large'
              />
              <Typography
                component='p'
                sx={{
                  textTransform: 'initial',
                  fontWeight: 'bolder',
                }}
              >
                Login with {github.name}
              </Typography>
            </Button>
          </Box>
        </Box>
        {/* </Box> */}
      </Grid>
      {/* </ThemeProvider> */}
    </Grid>
  );
}
