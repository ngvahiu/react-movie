import React from 'react'
import Carousel from '../../templates/HomeTemplate/Layout/Carousel/Carousel'
import SelectionBar from '../../components/SelectionBar/SelectionBar'
import AppMovie from '../../components/AppMovie/AppMovie'
import FilmList from '../../components/FilmList/FilmList'
import CinemaSystem from '../../components/CinemaSystem/CinemaSystem'
import News from '../News/News'

function Home() {
  return (
    <div>
        <Carousel />
        <SelectionBar />
        <FilmList />
        <CinemaSystem />
        <News />
        <AppMovie />
    </div>
  )
}

export default Home