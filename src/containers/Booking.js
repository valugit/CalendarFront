import React from 'react'
import { useSelector } from 'react-redux';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import PlayerCalendar from './calendars/PlayerCalendar';
import NotFound from './utils/404';

const Booking = () => {
  const user = useSelector(state => state.user)

  return user.role === 'player'
    ? <>
      <Header />
      <main>
        <PlayerCalendar />
      </main>
      <Footer />
    </>
    : <NotFound />
}

export default Booking;