// src/__tests__/App.test.js

import { render, within } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';

describe('<App /> component', () => {
    let appDom;
    beforeEach(() => {
        appDom = render(<App/>).container.firstChild;
    });
   test('renders list of events', () => {
    expect(appDom.querySelector('#event-list')).toBeInTheDocument();
   });

   test('render CitySearch', () => {
    expect(appDom.querySelector('#city-search')).toBeInTheDocument();
    });

   test('render NumberOfEvents', () => {
    expect(appDom.querySelector('#numberOfEvents')).toBeInTheDocument();
   });
});



describe('<App /> integration', () => {
    test('renders a list of events matching the city selected by the user', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
    
        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
    
        await user.type(CitySearchInput, "Berlin");
        const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
        await user.click(berlinSuggestionItem);
    
        const EventListDOM = AppDOM.querySelector('#event-list');
        const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');   
    
        const allEvents = await getEvents();
        const berlinEvents = allEvents.filter(
          event => event.location === 'Berlin, Germany'
        );
    
        expect(allRenderedEventItems.length).toBe(berlinEvents.length);
        allRenderedEventItems.forEach(event => {
            expect(event.textContent).toContain("Berlin, Germany");
          });
      });
});



// describe('<App />, integration', () => {

//     test('renders a list of events matching the city which user selected', async() => {

//         const user = userEvent.setup();
//         const appComponent = render(<App />);
//         const appDom = appComponent.container.firstChild;
//         const citySearchComponent = appDom.querySelector('#city-search');
//         const textbox = within(citySearchComponent).queryByRole('textbox');

//         await user.type(textbox, 'Berlin');
//         const berlinSuggestionItem = within(citySearchComponent).queryByText('Berlin, Germany');

//         await user.click(berlinSuggestionItem);
//         const allEvents = await getEvents();
//         const filteredEvents = allEvents.filter((event) => {
//             return event.location == 'Berlin, Germany';
//         });

//         const eventListDom = appDom.querySelector('#event-list');
//         const renderedEvents = within(eventListDom).queryAllByRole('listitem');
//         expect(renderedEvents.length).toBe(filteredEvents.length);

//     })
// })