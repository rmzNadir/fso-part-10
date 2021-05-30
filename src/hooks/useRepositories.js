import { useLazyQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sortMode, searchKeyword) => {
  let method = 'CREATED_AT';
  let order = 'DESC';
  if (sortMode) {
    method = sortMode === 'CREATEDAT' ? 'CREATED_AT' : 'RATING_AVERAGE';
    order = sortMode === 'CREATEDAT' ? 'DESC' : sortMode.split('-')[1];
  }

  const variables = {
    orderBy: method,
    orderDirection: order,
    searchKeyword: searchKeyword,
    first: 5,
  };
  // Had to use lazy query cuz of this issue
  // https://github.com/apollographql/apollo-client/issues/6816#issuecomment-696988617
  const [fetchData, { data, fetchMore, loading, result }] = useLazyQuery(
    GET_REPOSITORIES,
    {
      variables,
      fetchPolicy: 'cache-and-network',
    }
  );
  const { repositories } = { ...data };

  const handleFetchMore = () => {
    const canFetchMore = !loading && repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    fetchData,
    repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
