import {useSelector} from 'react-redux';

const useAuthState = (selector = authSate => authSate) => {
  const authData = useSelector(state => state.auth);

  return selector(authData);
};

export default useAuthState;
