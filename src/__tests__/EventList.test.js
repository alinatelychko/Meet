import { render, waitFor, within } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';
import App from '../App';

describe('<EventList /> component', () => {
    let EventListComponent;
    beforeEach(() => {
        EventListComponent = render(<EventList/>);
    })
  test('has an element with "list" role', () => {
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });

  test('renders correct number of events', async() => {
     const allEvents = await getEvents();
     EventListComponent.rerender(<EventList events={allEvents} />);
     expect(EventListComponent.getAllByRole('listitem')).toHaveLength(allEvents.length);
  })
});

// describe('<EventList />, integration', () => {
   
//     test('renders 32 events when app mounted and rendered', async() => {
//       const appComponent = render(<App />);
//       const appDom = appComponent.container.firstChild;
//       const eventListDom = appDom.querySelector('#event-list');
//       await waitFor(() => {
//         const eventListItems = within(eventListDom).queryAllByRole('listitem');
//         expect(eventListItems.length).toBeGreaterThan(0);
//       });
//     });
// });


describe('<EventList /> integration', () => {
  test('renders a list of 32 events when the app is mounted and rendered', async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector('#event-list');
    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBeGreaterThan(0);
    });
  });
});