import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HrNavbar from '../Component/Navbar/HrNavbar'; 

describe('HrNavbar Component Text Presence Tests', () => {
  test('renders "View Employee" text in the sidebar', () => {
    render(
      <MemoryRouter>
        <HrNavbar />
      </MemoryRouter>
    );

    expect(screen.getByText('View Employee')).toBeInTheDocument();
  });

  test('renders "Request Status" menu item text', () => {
    render(
      <MemoryRouter>
        <HrNavbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Request Status')).toBeInTheDocument();
  });

  test('renders "HR" menu item text', () => {
    render(
      <MemoryRouter>
        <HrNavbar />
      </MemoryRouter>
    );

    expect(screen.getByText('HR')).toBeInTheDocument();
  });


  test('renders "Logout" menu item text', () => {
    render(
      <MemoryRouter>
        <HrNavbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  
});
