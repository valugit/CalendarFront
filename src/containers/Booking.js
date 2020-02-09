import React from 'react'
import { useSelector } from 'react-redux';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import PlayerCalendar from './calendars/PlayerCalendar';
import NotFound from './utils/404';
import './../styles/containers/profile.scss';

const Booking = () => {
  const user = useSelector(state => state.user)

  return user.role === 'player'
    ? <>
      <Header />
      <main className={ 'reservations' }>
        <PlayerCalendar />
      </main>
      <Footer />
    </>
    : <NotFound />
}

export default Booking;