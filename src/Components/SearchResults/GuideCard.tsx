import React from 'react';
import { Link, Share } from '@material-ui/icons';
import {
  Card,
  CardMedia,
  CardContent,
  makeStyles,
  Box,
  Typography,
  Theme,
  Button,
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
}));

const GuideCard: React.FC<Props> = ({ guide }) => {
  const classes = useStyles();

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
              <Button size="small" color="primary">
                URL
                <Share />
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default GuideCard;
