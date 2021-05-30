import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sortMode, searchKeyword) => {
  let method = 'CREATED_AT';
  let order = 'DESC';
  if (sortMode) {
    method = sortMode === 'CREATEDAT' ? 'CREATED_AT' : 'RATING_AVERAGE';
    order = sortMode === 'CREATEDAT' ? 'DESC' : sortMode.split('-')[1];
  }

  const { data, refetch, loading } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy: method,
      orderDirection: order,
      searchKeyword: searchKeyword,
    },
    fetchPolicy: 'cache-and-network',
  });
  const { repositories } = { ...data };
  console.log('repositories', repositories);
  return { repositories, loading, refetch: refetch };
};

export default useRepositories;
