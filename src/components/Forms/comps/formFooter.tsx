import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import { candy } from '@/util/boxShadowsVariants';
import Grid from '@mui/material/Grid';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';

interface IFormProps {
  githubHandler?: () => void;
  github?: Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  >['github'];
  githubButtonClassName: string | undefined;
}

export default function FormFooter({
  githubHandler,
  github,
  githubButtonClassName,
}: IFormProps) {
  return (
    <>
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
        form='login-form'
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
          className={githubButtonClassName}
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
            Login with {github?.name}
          </Typography>
        </Button>
      </Box>
    </>
  );
}
