import React, { useState } from 'react';
import {
  TextField,
  Box,
  useTheme,
  makeStyles,
  Theme,
  Collapse,
  Grid,
  Typography,
  Select,
  Chip,
  MenuItem,
  OutlinedInput,
  Button,
} from '@material-ui/core';
import { TodayRounded, ArrowBack } from '@material-ui/icons';
import SearchBarButtons from './SearchBarButtons';
import { DatePicker } from '@material-ui/pickers';
import Moment from 'moment';

interface Props {
  onSearch: (searchStr: string, searchOptions: SearchOptions) => void;
  clearSearch: () => void;
  searchComplete: boolean;
}

interface Options {
  [key: string]: string;
}

const options: Options = {
  '1': 'Snabbguide',
  '2': 'Steg-för-steg guide',
  '7': 'Textguide',
  '9': 'Kunskapstest',
  '11': 'Översikt',
  '12': 'Snabbinspelning',
  '13': 'Push training',
  '14': 'Kurs',
  '15': 'URL',
  '16': 'Ranking',
  '17': 'Arbetsflöde',
};

const useStyles = makeStyles((theme: Theme) => ({
  inputRoot: {
    backgroundColor: 'white !important',
    overflow: 'hidden',
    '& svg': {
      fill: theme.palette.primary.light,
    },
  },
  inputFocused: {
    border: 'none',
  },
  outline: {
    border: 'none',
  },
  adornedEnd: {
    paddingRight: 0,
  },
  container: {
    backgroundColor: theme.palette.warning.light,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

const SearchBar: React.FC<Props> = ({
  onSearch,
  clearSearch,
  searchComplete,
}) => {
  const [searchText, setSearchText] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [from, setFrom] = useState<Moment.Moment | null>(null);
  const [to, setTo] = useState<Moment.Moment | null>(null);
  const [filterTypes, setFilterTypes] = useState<string[]>(
    Object.keys(options),
  );
  const theme = useTheme();
  const classes = useStyles();

  const handleSearch = (): void => {
    const opts: SearchOptions = {};

    if (showFilter) {
      to && (opts.to = to.format('YYYY-MM-DD'));
      from && (opts.from = from.format('YYYY-MM-DD'));

      opts.types = filterTypes;
    }

    onSearch(searchText, opts);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setFilterTypes(event.target.value as string[]);
  };

  const clear = (): void => {
    clearSearch();
    setFrom(null);
    setTo(null);
    setFilterTypes(Object.keys(options));
    setShowFilter(false);
    setSearchText('');
  };

  return (
    <div className={classes.container}>
      <Box
        width={800}
        padding={`${theme.spacing(6)}px 0`}
        margin="auto"
        display="flex"
        flexDirection="column"
      >
        <Box minHeight={48}>
          {searchComplete && (
            <Button fullWidth={false} onClick={clearSearch}>
              <ArrowBack />
              Go back
            </Button>
          )}
        </Box>
        <TextField
          fullWidth
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
          variant="outlined"
          onKeyPress={(e) => {
            e.key === 'Enter' && handleSearch();
          }}
          InputProps={{
            endAdornment: (
              <SearchBarButtons
                onSearchClick={() => handleSearch()}
                onFilterClick={() => setShowFilter(!showFilter)}
              />
            ),
            classes: {
              root: classes.inputRoot,
              focused: classes.inputFocused,
              notchedOutline: classes.outline,
              adornedEnd: classes.adornedEnd,
            },
          }}
        />
        <Collapse in={showFilter}>
          <Box paddingTop={4}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle1">From</Typography>
                <DatePicker
                  disableToolbar
                  fullWidth
                  autoOk
                  format="YYYY-MM-DD"
                  inputVariant="outlined"
                  InputProps={{
                    classes: {
                      root: classes.inputRoot,
                      focused: classes.inputFocused,
                      notchedOutline: classes.outline,
                    },
                    endAdornment: <TodayRounded />,
                  }}
                  variant="inline"
                  placeholder="Pick a date"
                  value={from}
                  onChange={(date) => {
                    date && setFrom(date);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">To</Typography>
                <DatePicker
                  disableToolbar
                  fullWidth
                  autoOk
                  format="YYYY-MM-DD"
                  inputVariant="outlined"
                  InputProps={{
                    classes: {
                      root: classes.inputRoot,
                      focused: classes.inputFocused,
                      notchedOutline: classes.outline,
                    },
                    endAdornment: <TodayRounded />,
                  }}
                  variant="inline"
                  placeholder="Pick a date"
                  value={to}
                  onChange={(date) => {
                    date && setTo(date);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Guide Types</Typography>
                <Select
                  multiple
                  variant="outlined"
                  value={filterTypes}
                  fullWidth
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      classes={{
                        root: classes.inputRoot,
                        notchedOutline: classes.outline,
                      }}
                    />
                  }
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {(selected as string[]).map((id) => (
                        <Chip
                          key={id}
                          label={options[id]}
                          className={classes.chip}
                          color="primary"
                        />
                      ))}
                    </div>
                  )}
                  classes={{
                    root: classes.inputRoot,
                    outlined: classes.outline,
                  }}
                >
                  {Object.keys(options).map((id) => (
                    <MenuItem key={id} value={id}>
                      {options[id]}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </Box>
    </div>
  );
};

export default SearchBar;
