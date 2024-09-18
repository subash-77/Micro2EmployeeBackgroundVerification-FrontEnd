import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HeadAgentNavbar from '../Component/Navbar/HeadAgentNavbar'; 

describe('HeadAgentNavbar Component Text Presence Tests', () => {
  test('renders "Add Agents" text in the sidebar', () => {
    render(
      <MemoryRouter>
        <HeadAgentNavbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Add Agents')).toBeInTheDocument();
  });

  test('renders "Assign tasks" menu item text', () => {
    render(
      <MemoryRouter>
        <HeadAgentNavbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Assign tasks')).toBeInTheDocument();
  });

  test('renders "Task Status" menu item text', () => {
    render(
      <MemoryRouter>
        <HeadAgentNavbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Task Status')).toBeInTheDocument();
  });

  test('renders "HeadAgent" menu item text', () => {
    render(
      <MemoryRouter>
        <HeadAgentNavbar />
      </MemoryRouter>
    );

    expect(screen.getByText('HeadAgent')).toBeInTheDocument();
  });

  test('renders "Logout" menu item text', () => {
    render(
      <MemoryRouter>
        <HeadAgentNavbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Logout')).toBeInTheDocument();
  });


  
});
