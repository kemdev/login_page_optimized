// TODO mongoose later

import { User } from '@/lib/user';
import { IUser } from '@/types/user';

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  user: IUser;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  let user = await User.findOne({ email }).select('-__v');

  if (!user) {
    console.log('There is no user')
    res.status(206).json({
      message: 'User not found',
      success: false,
      user: null,
    });

    return;
  }

  user = user.toObject();

  // delete user.password;
  // delete user.token;

  // const userData = {
  //   ...user,
  //   token,
  //   refreshToken,
  //   accessTokenExpires: 3600,
  //   refreshTokenExpires: 604800,
  // };
  // res.status(200).json({ user: userData });
}
