import useSWR from "swr";
import { useRouter } from "next/router";
import { ProductCard, Review } from "./Product.styled";
import { StyledLink } from "../Link/Link.styled";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR(`/api/products/${id}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }
  console.log(data.reviews);
  return (
    <ProductCard>
      <h2>{data.name}</h2>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>
      <StyledLink href="/">Back to all</StyledLink>
      <ul>
        {data.reviews.map((review) => (
          <Review key={review._id}>
            <p>{review.title}</p>
            <p>{review.text}</p>
            <p>{review.rating}</p>
          </Review>
        ))}
      </ul>
    </ProductCard>
  );
}
