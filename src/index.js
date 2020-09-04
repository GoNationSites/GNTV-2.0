import React, { useState, useEffect } from 'react'
import axios from 'axios-jsonp'
import jsonAdapter from 'axios-jsonp'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import slugify from 'slugify'

export const TV = ({ gonationID }) => {
  return <div>Example Component: {gonationID}</div>
}
