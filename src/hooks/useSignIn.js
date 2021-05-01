import { useMutation } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations';
import AuthStorage from '../utils/authStorage';

const useSignIn = () => {
  const authStorage = new AuthStorage();

  const [mutate, result] = useMutation(AUTHORIZE, {
    onError: (e) => {
      console.error(e);
    },
  });

  const signIn = async ({ username, password }) => {
    const res = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(res.data.authorize.accessToken);
    return res;
  };

  return [signIn, result];
};

export default useSignIn;
