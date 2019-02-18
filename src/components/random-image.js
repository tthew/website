import React, { useState } from 'react'
import Img from 'gatsby-image'

import { useInterval } from '../hooks/useInterval'

const getRandomImageKey = (data) => {
  const keys = Object.keys(data)
  return keys[Math.floor(Math.random() * Math.floor(keys.length))]
}

const RandomImage = ({ imageSharpData, maxDuration = 10000, play = true, ...restProps }) => {
  const [ randomImageKey, setRandomImageKey ] = useState(getRandomImageKey(imageSharpData))

  useInterval(() => {
    setRandomImageKey(getRandomImageKey(imageSharpData))
  }, play ?  Math.floor(Math.random() * Math.floor(maxDuration)): null)

  return (
    <>
      {[...Object.keys(imageSharpData).find(key => key === randomImageKey)].map((key) => (
        <Img
          {...restProps}
          key={key}
          fluid={restProps.fluid ? imageSharpData[key].childImageSharp.fluid : null}
          fixed={restProps.fixed ? imageSharpData[key].childImageSharp.fixed : null}
        />
      ))}
    </>
  )
}

export default RandomImage
