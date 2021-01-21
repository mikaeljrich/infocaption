import axios from 'axios';

const doSearch = async (
  searchStr: string,
  searchOptions: SearchOptions,
): Promise<SearchResult> => {
  const url = new URL('https://support.infocaption.com/API/lucene/guidesearch');

  url.searchParams.append('searchQuery', searchStr);
  searchOptions.page && //eslint-disable-line
    url.searchParams.append('page', searchOptions.page.toString()); //eslint-disable-line

  searchOptions.from && url.searchParams.append('from', searchOptions.from);
  searchOptions.to && url.searchParams.append('to', searchOptions.to);

  if (searchOptions.types && searchOptions.types.length > 0) {
    searchOptions.types.forEach((t) => url.searchParams.append('type[]', t));
  }

  console.log(url.href);

  try {
    const res = await axios.get<SearchResult>(url.href);

    const { data } = res;

    return { ...data, searchStr: searchStr };
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default doSearch;
