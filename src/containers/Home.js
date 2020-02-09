import React from 'react';
import { useSelector } from 'react-redux';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import GMCalendar from './calendars/GMCalendar';
import GMList from './GMList';
import './../styles/containers/home.scss';

const Main = () => {
  const user = useSelector(state => state.user);

  return <main>
    {
      user.role === 'gamemaster'
        ? <div className={ 'GMCalendar' }>
          <GMCalendar interactive={ true } defaultView={ "dayGridMonth" } views={ 'dayGridMonth,timeGridWeek,timeGridDay,listMonth' } />
        </div>
        : <GMList />
    }
  </main>
}

const Home = () => <>
  <Header />
  <Main />
  <Footer />
</>;

export default Home;