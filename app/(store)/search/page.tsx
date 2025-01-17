async function SearchPage({
  searchParams,
}: {
  searchParams: {
    quary: String;
  };
}) {
  const { quary } = await searchParams;
  return <div>SearchPage for { quary }</div>;
}

export default SearchPage;
