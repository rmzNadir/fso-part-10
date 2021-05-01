import { useMutation } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE, {
    onError: (e) => {
      console.error(e);
    },
  });

  const signIn = async ({ username, password }) => {
    const res = await mutate({ variables: { username, password } });
    return res;
  };

  return [signIn, result];
};

export default useSignIn;
