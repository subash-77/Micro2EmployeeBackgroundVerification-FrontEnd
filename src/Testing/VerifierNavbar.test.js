import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import VerifierNavbar from '../Component/Navbar/VerifierNavbar';

describe('VerifierNavbar Component Text Presence Tests', () => {
    test('renders "View Assigned Records" text in the sidebar', () => {
        render(
            <MemoryRouter>
                <VerifierNavbar />
            </MemoryRouter>
        );

        expect(screen.getByText('View Assigned Records')).toBeInTheDocument();
    });
    test('renders "Verifier" text in the sidebar', () => {
        render(
            <MemoryRouter>
                <VerifierNavbar />
            </MemoryRouter>
        );

        expect(screen.getByText('Verifier')).toBeInTheDocument();
    });
    test('renders "Logout" menu item text', () => {
        render(
            <MemoryRouter>
                <VerifierNavbar />
            </MemoryRouter>
        );

        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

});
