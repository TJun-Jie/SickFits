import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells apollo that we will take care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // if there are items and there aren't enough items to satisfy how many were requested
      // and we are on the last page
      // then just send it
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // we don't have any items, so we must go to the network and fetch them
        return false;
      }
      // return the items because they are already in the cache
      if (items.length) {
        return items;
      }
      // return false if they are not in the cache ( makes network request)
      return false;
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // runs when the Apollo client comes back from the network with our product
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      //
      return merged;
    },
  };
}
