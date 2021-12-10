import React from 'react';
import { shallow } from 'enzyme';
import { SummaryComponent } from './Summary';

describe('Component Summary', () => {
  it('should render without crashing', () => {
    const component = shallow(<SummaryComponent />);
    expect(component).toBeTruthy();
  });
});
