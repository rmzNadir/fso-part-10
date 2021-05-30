import React, { useState } from 'react';
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
    marginHorizontal: 10,
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
    return (
      <FlatList
        ListHeaderComponent={this.renderHeader()}
        data={this.props.repositories}
        renderItem={FlatlistItem}
        ItemSeparatorComponent={ItemSeparator}
      />
    );
  }
}

const RepositoryList = () => {
  const [sortMode, setSortMode] = useState('CREATEDAT');
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);

  const { repositories } = useRepositories(sortMode, debouncedSearch);

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <RepositoryListContainer
      repositories={repositoryNodes}
      sortMode={sortMode}
      setSortMode={setSortMode}
      search={search}
      setSearch={setSearch}
    />
  );
};

export default RepositoryList;
