import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import SignInContainer from '@/components/signIn/signInContainer';

export default function SignIn({
  providers,
  hostname,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const config = {
    providers,
    hostname,
  };
  return <SignInContainer config={config}></SignInContainer>;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<{
  redirect?: any;
  props?: any;
}> {
  const session = await getServerSession(context.req, context.res, authOptions);
  const hostname: string = context.req.headers.host as string;
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: '/' }, props: { hostname } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [], hostname },
  };
}
