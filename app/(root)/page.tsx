import PostCard, { PostCardType } from '@/components/PostCard';
import SearchForm from '../../components/SearchForm';
import { POSTS_QUERY } from '@/sanity/lib/queries';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { auth } from '@/auth';
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
  }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();

  console.log(session?.id);

  const { data: posts } = await sanityFetch({ query: POSTS_QUERY, params });

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
      <section className='section_container'>
        <p className='text-30-semibold'>
          {query ? `Showing results for "${query}"` : 'Showing all posts'}
        </p>

        <ul className='mt-7 card_grid'>
          {posts?.length > 0 ? (
            posts.map((post: PostCardType) => (
              <PostCard key={post?._id} post={post} />
            ))
          ) : (
            <p>No posts found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
