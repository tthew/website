import React from 'react'

import s from './update-banner.module.css'

const UpdateBanner = () => {
  return (
    <div className={s.updateBanner}>
      <p>This website has been updated! <a href='#' onClick={(e) => e.preventDefault() || window.location.reload()}>Refresh now to get the latest content</a>.</p>
    </div>
  )
}

export default UpdateBanner
