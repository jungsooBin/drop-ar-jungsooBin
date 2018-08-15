import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

import CameraView from '../CameraView';

// Tests to write:
// Check if every time the button is pressed: one object is being added to scene by checking length of the scenes children

// Check if remove works by checking scenes children length lowers by one

// Check remove all works by checking lenght of scene children is empty

// Check take screenshot works by checking state changes with an image
