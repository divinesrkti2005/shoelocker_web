import React from 'react';
import { render, screen } from '@testing-library/react';
import PackageCard from './PackageCard';

describe('PackageCard', () => {
  it('renders package name', () => {
    render(<PackageCard packageData={{ name: 'Test Package' }} />);
    expect(screen.getByText('Test Package')).toBeInTheDocument();
  });
}); 