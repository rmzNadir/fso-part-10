import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(AUTHORIZE, {
    onError: (e) => {
      console.error(e);
    },
  });

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } });

    const {
      authorize: { accessToken },
    } = { ...data };

    if (accessToken) {
      await authStorage.setAccessToken(accessToken);

      apolloClient.resetStore();
    }

    return accessToken || '';
  };

  return [signIn, result];
};

export default useSignIn;
