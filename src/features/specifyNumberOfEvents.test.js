import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, fireEvent } from '@testing-library/react';

import React from 'react';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('User specifies the number of events to display', ({ given, when, then }) => {
    let mainPage;

    given('the user has opened the Meet app', () => {
      const { container } = render(<App />);
      mainPage = container;
    });

    when('the user selects a specific number of events to display, e.g., 10', () => {
        const { getByLabelText, getByTestId } = render(<App />);
        const numberOfEventsInput = getByLabelText('Number of Events');
        fireEvent.change(numberOfEventsInput, { target: { value: '10' } });
        fireEvent.click(getByTestId('apply-btn'));
      });
      

    then('the app should display the specified number of events on the main page', () => {
      expect(mainPage.querySelectorAll('.event').length).toBe(10);
    });

    then('the displayed events should not exceed the specified number', () => {
      expect(mainPage.querySelectorAll('.event').length).toBeLessThanOrEqual(10);
    });
  });

  test('User resets the number of events to default', ({ given, when, then }) => {
    let mainPage;

    given('the user has opened the Meet app and selected a specific number of events', () => {
      const { container, getByLabelText, getByTestId } = render(<App />);
      mainPage = container;

      const numberOfEventsInput = getByLabelText('Number of Events');
      fireEvent.change(numberOfEventsInput, { target: { value: '10' } });
      fireEvent.click(getByTestId('apply-btn'));
    });

    when('the user resets the number of events to the default value', () => {
      const { getByLabelText, getByTestId } = render(<App />);
      const numberOfEventsInput = getByLabelText('Number of Events');
      fireEvent.change(numberOfEventsInput, { target: { value: '' } });
      fireEvent.click(getByTestId('apply-btn'));
    });

    then('the app should display the default number of events on the main page', () => {
      expect(mainPage.querySelectorAll('.event').length).toBe(32); // Assuming the default is 32 events
    });

    then('the displayed events should not exceed the default number', () => {
      expect(mainPage.querySelectorAll('.event').length).toBeLessThanOrEqual(32);
    });
  });
});
