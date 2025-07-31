import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders the company name', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText('ShoeLocker')).toBeInTheDocument();
  });

  it('renders the Home link', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders the Sneakers link', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText('Sneakers')).toBeInTheDocument();
  });

  it('renders the About Us link', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText('About Us')).toBeInTheDocument();
  });

  it('renders the Contact link', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders the FAQ link', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('renders the Terms & Conditions link', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText('Terms & Conditions')).toBeInTheDocument();
  });

  it('renders the Privacy Policy link', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  it('renders the Reviews link', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText('Reviews')).toBeInTheDocument();
  });

  it('renders the company description', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/Your premier destination/i)).toBeInTheDocument();
  });

  it('renders the copyright text', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });
}); 