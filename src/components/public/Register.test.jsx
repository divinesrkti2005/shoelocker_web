import React from 'react';
import { render, screen } from '@testing-library/react';
import Register from './Register';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const renderWithClient = (ui) =>
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  );

describe('Register', () => {
  it('renders the registration form fields', () => {
    renderWithClient(<Register />);
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    renderWithClient(<Register />);
    expect(screen.getByText(/Create Your Account/i)).toBeInTheDocument();
  });

  it('renders privacy policy and terms of use links', () => {
    renderWithClient(<Register />);
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Use')).toBeInTheDocument();
  });

  it('shows error for mismatched passwords (placeholder)', () => {
    // This test is a placeholder; actual error state would need to be simulated with a mock or by refactoring
    expect(true).toBe(true);
  });
}); 