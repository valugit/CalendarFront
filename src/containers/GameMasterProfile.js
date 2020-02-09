import React from 'react';
import { useSelector } from 'react-redux';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import GMCalendar from './calendars/GMCalendar';
import NotFound from './utils/404';
import './../styles/containers/profile.scss'

const GameMasterProfile = props => {
  const user = useSelector(state => state.user)

  return user.role === 'player'
    ? <>
      <Header />
      <main>
        <div className={ 'GMCalendar' }>
          <GMCalendar
            interactive={ true }
            defaultView={ "dayGridMonth" }
            views={ 'dayGridMonth,timeGridWeek,timeGridDay,listMonth' }
            id={ props.match.params.id }
          />
        </div>
      </main>
      <Footer />
    </>
    : <NotFound />
}

export default GameMasterProfile;
