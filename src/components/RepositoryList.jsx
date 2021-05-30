import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import RepositorySorter from './RepositorySorter';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  search: {
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 5,
    backgroundColor: theme.colors.background,
    color: '#fff',
  },
  searchInput: {
    color: '#FFf',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const FlatlistItem = ({ item }) => (
  <Link to={`/repositories/${item.id}`}>
    <RepositoryItem item={item} />
  </Link>
);

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { search, setSearch, sortMode, setSortMode } = this.props;

    return (
      <View>
        <Searchbar
          placeholder='Search'
          onChangeText={(q) => setSearch(q)}
          value={search}
          style={styles.search}
          iconColor='#fff'
          inputStyle={styles.searchInput}
          theme={{
            dark: true,
            colors: { placeholder: '#ccc', primary: theme.colors.primary },
          }}
        />
        <RepositorySorter sortMode={sortMode} setSortMode={setSortMode} />
      </View>
    );
  };

  render() {
    const { repositories, onEndReach } = this.props;
    return (
      <FlatList
        ListHeaderComponent={this.renderHeader()}
        data={repositories}
        renderItem={FlatlistItem}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [sortMode, setSortMode] = useState('CREATEDAT');
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);

  const { fetchData, repositories, fetchMore } = useRepositories(
    sortMode,
    debouncedSearch
  );

  // Needed for the workaround to this issue
  // https://github.com/apollographql/apollo-client/issues/6816#issuecomment-696988617

  useEffect(() => {
    fetchData();
  }, []);

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositoryNodes}
      sortMode={sortMode}
      setSortMode={setSortMode}
      search={search}
      setSearch={setSearch}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
