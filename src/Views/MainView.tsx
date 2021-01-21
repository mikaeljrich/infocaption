import React, { useState } from 'react';
import { makeStyles, Box, Theme, Typography } from '@material-ui/core';
import { ReactComponent as Heart } from '../images/heart.svg';
import SearchBar from 'src/Components/SearchBar';
import searchHelper from '../helpers/searchHelper';
import SearchResults from 'src/Components/SearchResults';
import { Pagination } from '@material-ui/lab';
import { ReactComponent as SearchImage } from '../images/search.svg';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.grey[50],
  },
}));

const MainView: React.FC = () => {
  const classes = useStyles();
  const [searchResult, setSearchResult] = useState<SearchResult>();

  const handleSearch = (
    searchStr: string,
    searchOptions: SearchOptions,
  ): void => {
    searchHelper(searchStr, searchOptions)
      .then((d) => {
        setSearchResult(d);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const clearSearch = (): void => {
    setSearchResult(undefined);
  };

  return (
    <div className={classes.container}>
      <SearchBar
        onSearch={handleSearch}
        clearSearch={clearSearch}
        searchComplete={!!searchResult}
      />
      {searchResult && searchResult.results.length ? (
        <>
          <SearchResults guides={searchResult.results} />
          <Box display="flex" justifyContent="center" paddingBottom={6}>
            <Pagination
              count={searchResult.totalPages}
              page={searchResult.currentPage}
              onChange={(e, val) =>
                handleSearch(searchResult.searchStr, { page: val })
              }
            />
          </Box>
        </>
      ) : (
        <Box
          width={400}
          margin="auto"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <SearchImage width="100%" />
        </Box>
      )}
      <Box display="flex" justifyContent="center" p={4}>
        <Typography>
          Made with <Heart width={24} height="auto" /> by Mikael Richardsson
        </Typography>
      </Box>
    </div>
  );
};

export default MainView;
