import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import RepositorySorter from './RepositorySorter';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const FlatlistItem = ({ item }) => (
  <Link to={`/repositories/${item.id}`}>
    <RepositoryItem item={item} />
  </Link>
);

export const RepositoryListContainer = ({
  repositories,
  sortMode,
  setSortMode,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      ListHeaderComponent={() => (
        <RepositorySorter sortMode={sortMode} setSortMode={setSortMode} />
      )}
      data={repositoryNodes}
      renderItem={FlatlistItem}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const RepositoryList = () => {
  const [sortMode, setSortMode] = useState('CREATEDAT');
  const { repositories } = useRepositories(sortMode);
  return (
    <RepositoryListContainer
      repositories={repositories}
      sortMode={sortMode}
      setSortMode={setSortMode}
    />
  );
};

export default RepositoryList;
