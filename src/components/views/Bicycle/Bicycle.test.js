import React from 'react';
import { shallow } from 'enzyme';
import { BicycleComponent } from './Bicycle';

describe('Component Bicycle', () => {
  it('should render without crashing', () => {
    const component = shallow(<BicycleComponent />);
    expect(component).toBeTruthy();
  });
});
