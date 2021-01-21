import React from 'react';
import { Box } from '@material-ui/core';
import GuideCard from './GuideCard';

interface Props {
  guides: Guide[];
}

const SearchResults: React.FC<Props> = ({ guides }) => {
  return (
    <Box display="flex" justifyContent="center" padding={4}>
      <Box display="flex" flexDirection="column" width={800}>
        {guides.map((g) => (
          <GuideCard key={g.id} guide={g} />
        ))}
      </Box>
    </Box>
  );
};

export default SearchResults;
