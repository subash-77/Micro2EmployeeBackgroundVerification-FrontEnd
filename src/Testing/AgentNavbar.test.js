import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AgentNavbar from '../Component/Navbar/AgentNavbar'; 

describe('AgentNavbar Component Text Presence Tests', () => {
  test('renders "Agent" text in the sidebar', () => {
    render(
      <MemoryRouter>
        <AgentNavbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Agent')).toBeInTheDocument();
  });

  test('renders "View Records To Verify" menu item text', () => {
    render(
      <MemoryRouter>
        <AgentNavbar />
      </MemoryRouter>
    );

    expect(screen.getByText('View Records To Verify')).toBeInTheDocument();
  });

  test('renders "Records Status" menu item text', () => {
    render(
      <MemoryRouter>
        <AgentNavbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Records Status')).toBeInTheDocument();
  });
  
});
