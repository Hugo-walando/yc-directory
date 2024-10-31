import SearchForm from '../../components/SearchForm';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
  }>;
}) {
  const query = (await searchParams).query;

  return (
    <>
      <section className='pink_container'>
        <h1 className='heading'>Post Whatever you want!</h1>
        <p className='sub-heading !max-w-3xl'>
          Share an idea or a topic that excites you <br />
          let others discover what drives your curiosity.
        </p>
        <SearchForm query={query} />
      </section>
    </>
  );
}
