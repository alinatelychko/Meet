import React, { useEffect, useState } from 'react';
import './App.css';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';

function App() {

  const [events, setEvents] = useState([]);
  const [noe, setNoe] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');

  const fetchData = async() => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === 'See all cities' ? allEvents
                                                            : allEvents.filter((event) => event.location === currentCity);
    setEvents(filteredEvents.slice(0, noe));
    setAllLocations(extractLocations(allEvents));
  }

  useEffect(() => {
    fetchData();
  }, [currentCity]);
  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity}/>
      <NumberOfEvents />
      <EventList events={events}/>
    </div>
  );
}

export default App;