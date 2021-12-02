import React from 'react';
import { shallow } from 'enzyme';
import { BicycleAddComponent } from './BicycleAdd';

describe('Component BicycleAdd', () => {
  it('should render without crashing', () => {
    const component = shallow(<BicycleAddComponent />);
    expect(component).toBeTruthy();
  });
});
