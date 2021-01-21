import React, { useState, useRef } from 'react';
import { Link, Share, FileCopy, OpenInNew } from '@material-ui/icons';
import {
  Card,
  CardMedia,
  CardContent,
  makeStyles,
  Box,
  Typography,
  Theme,
  Button,
  Popover,
  OutlinedInput,
  IconButton,
} from '@material-ui/core';

interface Props {
  guide: Guide;
}

const baseURL = 'https://support.infocaption.com/';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(4),
  },
  thumbnail: {
    width: 160,
    backgroundColor: theme.palette.grey[100],
    backgroundSize: 'contain',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: theme.palette.grey[600],
  },
  titleText: {
    fontWeight: 600,
  },
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
  buttonRoot: {
    width: 56,
    height: 56,
    borderRadius: 0,
  },
}));

const GuideCard: React.FC<Props> = ({ guide }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const inputAnchorEl = useRef<HTMLInputElement>();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleCopyToClipboard = (): void => {
    inputAnchorEl.current && inputAnchorEl.current.select();
    document.execCommand('copy');
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.thumbnail}
        image={`${baseURL}${guide.thumbnailURL}`}
      >
        {!guide.thumbnailURL && <Link />}
      </CardMedia>
      <Box display="flex" flexDirection="column" flex={1}>
        <CardContent>
          <Typography className={classes.titleText} gutterBottom variant="h6">
            {guide.name}
          </Typography>
          <Typography variant="body2">{guide.summary}</Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginTop={4}
          >
            <Typography className={classes.dateText} variant="caption">
              {guide.lastModifiedDate}
            </Typography>
            <Box>
              <Button size="small" color="primary" onClick={handleClick}>
                URL
                <Share />
              </Button>
              <Popover
                open={!!anchorEl}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <Box display="flex">
                  <OutlinedInput
                    inputRef={inputAnchorEl}
                    value={guide.fullURL}
                    endAdornment={
                      <Box display="flex" pl={1}>
                        <IconButton
                          onClick={handleCopyToClipboard}
                          className={classes.buttonRoot}
                        >
                          <FileCopy />
                        </IconButton>
                        <IconButton
                          onClick={() => window.open(guide.fullURL, '_blank')}
                          className={classes.buttonRoot}
                        >
                          <OpenInNew />
                        </IconButton>
                      </Box>
                    }
                    classes={{
                      root: classes.inputRoot,
                      focused: classes.inputFocused,
                      notchedOutline: classes.outline,
                      adornedEnd: classes.adornedEnd,
                    }}
                  />
                </Box>
              </Popover>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default GuideCard;
