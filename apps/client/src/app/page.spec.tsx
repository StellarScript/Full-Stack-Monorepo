import React from 'react';
import { expect, it, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '../app/page';

async function resolvedComponent(Component: (x: object) => React.ReactNode, props: object) {
   const ComponentResolved = await Component(props);
   return () => ComponentResolved;
}

describe('Header test', () => {
   it('should render all the content', async () => {
      const HeaderResolved = await resolvedComponent(Page, {});
      render(<HeaderResolved />);
      expect(screen.getByText('Documentation')).toBeDefined();
   });
});
