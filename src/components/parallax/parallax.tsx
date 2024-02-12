import styles from './parallax.module.css';
import Image from 'next/image';
import React from 'react';

import Tilt from 'react-parallax-tilt';

import balloon from '@/public/leftImg/hotBalloon.webp';
import background from '@/public/leftImg/clouds.webp';

const ParallaxEffectImg = ({ className = '', imageClassName = '' }) => (
  <Tilt
    className={styles.parallaxImage + ` ${className}`}
    glareEnable={true}
    glareMaxOpacity={0.75}
    glarePosition='all'
    scale={1.02}
    trackOnWindow={true}
    tiltMaxAngleX={15}
    tiltMaxAngleY={15}
    perspective={800}
    transitionSpeed={150}
    gyroscope={true}
  >
    <Image
      src={balloon}
      className={styles.hotBalloon + ` ${imageClassName}`}
      alt='hot balloon'
      priority
    />
  </Tilt>
);

export default ParallaxEffectImg;
