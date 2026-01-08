import { LiquidMetal } from '@paper-design/shaders-react'
import React from 'react'

const Logo = () => {
  return (
    <LiquidMetal
        width={50}
        height={50}
        image="/bb-logo-white.png"
        colorBack="#aaaaac00"
        colorTint="#ffffff00"
        shape={undefined}
        repetition={3}
        softness={0.1}
        shiftRed={0.3}
        shiftBlue={0.3}
        distortion={0.07}
        contour={0.4}
        angle={70}
        speed={0.5}
        scale={1}
        fit="cover"
    />
  )
}

export default Logo