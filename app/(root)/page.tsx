import PostCard from '@/components/PostCard';
import SearchForm from '../../components/SearchForm';
import { POSTS_QUERY } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
  }>;
}) {
  const query = (await searchParams).query;

  const posts = await client.fetch(POSTS_QUERY);

  console.log(JSON.stringify(posts, null, 2));

  // const posts = [
  //   {
  //     _createdAt: new Date(),
  //     views: 55,
  //     author: { _id: 1 },
  //     _id: 1,
  //     description: 'this is a description.',
  //     image:
  //       'https://tagageek.com/wp-content/uploads/2024/09/We-Robot-10-10-Tesla-Invite-au-Devoilement-de-sa-Robotaxi.webp',
  //     category: 'Robots',
  //     title: 'We Robots',
  //   },
  // ];

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
            posts.map((post: PostCardType, index: number) => (
              <PostCard key={post?._id} post={post} />
            ))
          ) : (
            <p>No posts found</p>
          )}
        </ul>
      </section>
    </>
  );
}
