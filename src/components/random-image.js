import React, { useState } from 'react'
import Img from 'gatsby-image'

import { useInterval } from '../hooks/useInterval'

const getRandomImageKey = (data) => {
  const keys = Object.keys(data)
  return keys[Math.floor(Math.random() * Math.floor(keys.length))]
}

const RandomImage = ({ imageSharpData, maxDuration = 10000, play = true, ...restProps }) => {
  const [ randomImageKey, setRandomImageKey ] = useState(getRandomImageKey(imageSharpData))
  const interval = Math.floor(Math.random() * Math.floor(maxDuration))

  useInterval(() => {
    setRandomImageKey(getRandomImageKey(imageSharpData))
  }, play ?  interval : null)

  return (
    <>
      {imageSharpData[randomImageKey] && (
        <Img
          {...restProps}
          fluid={restProps.fluid ? imageSharpData[randomImageKey]?.childImageSharp.fluid : null}
          fixed={restProps.fixed ? imageSharpData[randomImageKey]?.childImageSharp.fixed : null}
        />
      )}
    </>
  )
}

export default RandomImage
