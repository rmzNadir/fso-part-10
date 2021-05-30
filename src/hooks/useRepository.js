import { useLazyQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const variables = {
    id,
    first: 2,
  };
  // Had to use lazy query cuz of this issue
  // https://github.com/apollographql/apollo-client/issues/6816#issuecomment-696988617
  const [fetchData, { data, fetchMore, loading, result }] = useLazyQuery(
    GET_REPOSITORY,
    {
      variables,
      fetchPolicy: 'cache-and-network',
    }
  );
  const { repository } = { ...data };

  const handleFetchMore = () => {
    const canFetchMore = !loading && repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    fetchData,
    repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepository;
