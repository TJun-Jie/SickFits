import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import SingleProduct from '../../components/SingleProduct';

export default function SingleProductPage({ query }) {
  const router = useRouter();
  const { id } = router.query;
  return <SingleProduct id={id} />;
}
