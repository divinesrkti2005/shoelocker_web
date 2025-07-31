import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero', () => {
  it('renders the main heading', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    expect(screen.getByText(/Step Into/i)).toBeInTheDocument();
    expect(screen.getByText(/Excellence/i)).toBeInTheDocument();
  });

  it('renders feature cards', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    expect(screen.getByText('Premium Quality')).toBeInTheDocument();
    expect(screen.getByText('Fast Delivery')).toBeInTheDocument();
    expect(screen.getByText('Exclusive Collection')).toBeInTheDocument();
  });

  it('renders Shop Now button', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    expect(screen.getByText('Shop Now')).toBeInTheDocument();
  });

  it('renders View Collection button', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    expect(screen.getByText('View Collection')).toBeInTheDocument();
  });

  it('renders Popular Categories heading', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    expect(screen.getByText('Popular Categories')).toBeInTheDocument();
  });
}); 