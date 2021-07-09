import {createRef} from 'react';

export const navigationRef = createRef();
export const isMountedRef = createRef();
export const routeNameRef = createRef();

const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};

const reset = (name, params) => {
  if (isMountedRef.current && navigationRef.current) {
    return navigationRef.current.reset({
      index: 0,
      routes: [
        {
          name,
          params,
        },
      ],
    });
  } else {
    console.error('!!!!not mounted yet!!!!!!!');
  }
};

export default {
  navigate,
  reset,
  routeNameRef,
};
