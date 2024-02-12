import React, { ReactNode, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import isEmail from 'validator/lib/isEmail';
import { IFormLoginProps, IFormValidate } from '@/types/client/types';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';

interface IFormContentProps {
  footerAction?: ReactNode | ReactNode[] | null | undefined;
  config: {
    providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>;
    hostname: string | undefined;
  };
}

export default function FormContents({
  footerAction,
  config,
}: IFormContentProps) {
  const [formValidate, setFormValidate] = useState<IFormValidate>({
    email: false,
    password: false,
  });

  const [formData, setFormData] = useState<IFormLoginProps>({
    email: '',
    password: '',
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

  const credentialHandler = async (data: IFormLoginProps) => {
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

  const setFormDataEmailHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const email = event.target.value as string;
    setFormData({
      ...formData,
      email: email,
    });
  };

  return (
    <Box
      component='form'
      noValidate
      onSubmit={handleSubmit}
      sx={{ mt: 1 }}
      id='login-form'
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
        helperText={!formValidate.email ? ' ' : 'Invalid email address!'}
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
        variant='standard'
        onChange={(e) => {
          const value = e.target.value;
          setFormValidate({
            ...formValidate,
            password: value.length < 6,
          });
        }}
        helperText={
          !formValidate.password ? ' ' : 'Password should at least 6 character!'
        }
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

      {footerAction}
    </Box>
  );
}
