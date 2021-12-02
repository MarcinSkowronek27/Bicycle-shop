import React from 'react';
import { shallow } from 'enzyme';
import { BicycleEditComponent } from './BicycleEdit';

describe('Component BicycleEdit', () => {
  it('should render without crashing', () => {
    const component = shallow(<BicycleEditComponent />);
    expect(component).toBeTruthy();
  });
});
