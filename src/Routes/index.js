import React from 'react';
import AuthRoute from './Route';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../Navigator/utils';

const Routes = () => {
  return (
    <NavigationContainer independent={true} ref={navigationRef}>
      <AuthRoute />
    </NavigationContainer>
  );
};

export default Routes;
