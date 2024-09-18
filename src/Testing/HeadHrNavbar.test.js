import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HeadHrNavbar from '../Component/Navbar/HeadHrNavbar'; 

describe('HeadHrNavbar Component Text Presence Tests', () => {
  test('renders "Records To Verify" text in the sidebar', () => {
    render(
      <MemoryRouter>
        <HeadHrNavbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Records To Verify')).toBeInTheDocument();
  });

  test('renders "Records Status" menu item text', () => {
    render(
      <MemoryRouter>
        <HeadHrNavbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Records Status')).toBeInTheDocument();
  });

  test('renders "HeadHr" menu item text', () => {
    render(
      <MemoryRouter>
        <HeadHrNavbar />
      </MemoryRouter>
    );

    expect(screen.getByText('HeadHr')).toBeInTheDocument();
  });


  test('renders "Logout" menu item text', () => {
    render(
      <MemoryRouter>
        <HeadHrNavbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  
});
