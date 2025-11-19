'use client';

import Spline from '@splinetool/react-spline';

export default function SplineViewer() {
  return (
    <div className="w-full h-full bg-transparent">
      <Spline
        scene="https://prod.spline.design/akUKTv7FEnibl3uX/scene.splinecode"
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      />
    </div>
  );
}
