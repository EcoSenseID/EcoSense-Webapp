// @ts-nocheck
import React from 'react'
import { render, screen } from '@testing-library/react'
import HomePage from '../pages/index'

describe('Sample Test', () => {
    it('Testing to see if Jest works', () => {
      expect(1).toBe(1);
    })
});

// describe('HomePage', () => {
//   it('renders a heading', () => {
//     const textToFind = 'The Best Partner';
    
//     render(HomePage);
//     const heading = screen.getByText(textToFind);

//     expect(heading).toBeInTheDocument();
//   })
// });

export {};