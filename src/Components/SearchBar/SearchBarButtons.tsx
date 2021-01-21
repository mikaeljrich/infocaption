import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import { Search, FilterList } from '@material-ui/icons';

interface Props {
  onSearchClick: () => void;
  onFilterClick: () => void;
}

const useStyles = makeStyles({
  buttonRoot: {
    width: 56,
    height: 56,
    borderRadius: 0,
  },
  filterButton: {
    backgroundColor: '#E5E5E5',
  },
});

const SearchBarButtons: React.FC<Props> = ({
  onSearchClick,
  onFilterClick,
}) => {
  const classes = useStyles();

  return (
    <>
      <IconButton
        onClick={onSearchClick}
        classes={{
          root: classes.buttonRoot,
        }}
      >
        <Search />
      </IconButton>
      <IconButton
        onClick={onFilterClick}
        classes={{
          root: classes.buttonRoot + ' ' + classes.filterButton,
        }}
      >
        <FilterList />
      </IconButton>
    </>
  );
};

export default SearchBarButtons;
