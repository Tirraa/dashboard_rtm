'use client';

import type { FunctionComponent } from 'react';

interface HomepageVideoProps {}

const HomepageVideo: FunctionComponent<HomepageVideoProps> = () => (
  <video
    className="absolute bottom-0 left-0 h-full w-full object-cover"
    style={{ zIndex: -1 }}
    playsInline={true}
    autoPlay={true}
    preload="none"
    muted={true}
    loop={true}
  >
    <source src="/assets/medias/videos/rtm-demo.webm" type="video/webm; codecs=av01.0.05M.08" media="(min-width: 415px)" />
  </video>
);

export default HomepageVideo;
