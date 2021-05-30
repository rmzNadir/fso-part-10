import { useLazyQuery } from '@apollo/client';
import { AUTHORIZED_USER } from '../graphql/queries';

const useAuthorizedUser = (includeReviews = false) => {
  const variables = {
    includeReviews,
    first: 2,
  };

  // Had to use lazy query cuz of this issue
  // https://github.com/apollographql/apollo-client/issues/6816#issuecomment-696988617
  const [fetchData, { data, fetchMore, loading, result }] = useLazyQuery(
    AUTHORIZED_USER,
    {
      variables,
      fetchPolicy: 'cache-and-network',
    }
  );
  const { authorizedUser } = { ...data };

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: authorizedUser.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    fetchData,
    authorizedUser,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useAuthorizedUser;
