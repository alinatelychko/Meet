import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, fireEvent } from '@testing-library/react';
import mockData from "../mock-data";
import React from 'react';
import CitySearch from '../components/CitySearch';
import EventList from '../components/EventList';
import Event from '../components/Event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('User can show details of an event', ({ given, when, then }) => {
    let mainPage;
    let event;

    given('the main page is open', () => {
      const { container } = render(<CitySearch />);
      mainPage = container;
    });

    when('the user clicks on an event', () => {
      const sampleEvent = mockData[0];
      const { getByText } = render(<EventList events={[sampleEvent]} />);
      event = getByText(sampleEvent.summary);

      fireEvent.click(event);
    });

    then('the user should see the details of that event', () => {
        expect(mainPage).toHaveTextContent(mockData[0].description);
      });
      
  });

  test('User can hide details of an event', ({ given, when, then }) => {
    let mainPage;
    let event;

    given('the user has opened the details of an event', () => {
      const sampleEvent = mockData[0];
      const { container } = render(<CitySearch />);
      mainPage = container;

      const { getByText } = render(<EventList events={[sampleEvent]} />);
      event = getByText(sampleEvent.summary);

      fireEvent.click(event);
    });

    when('the user clicks on hide details', () => {
      fireEvent.click(event);
    });

    then('the details of the event should be hidden', () => {
        expect(event).not.toHaveTextContent(mockData[0].description);
      });
      
  });
});
