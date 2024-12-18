import { formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Author, Post } from '@/sanity/types';

export type PostCardType = Omit<Post, 'author'> & { author?: Author };

const PostCard = ({ post }: { post: PostCardType }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;

  return (
    <li className='post-card group'>
      <div className='flex-between'>
        <p className='post_card_date'>{formatDate(_createdAt)}</p>
        <div className='flex gap-1.5'>
          <EyeIcon className='size-6 text-primary'></EyeIcon>
          <span className='text-16-medium'>{views}</span>
        </div>
      </div>

      <div className='flex-between mt-5 gap-5'>
        <div className='flex-1'>
          <Link href={`/user.${author?._id}`}>
            <p className='text-16-medium line-clamp-1'>{author?.name}</p>
          </Link>
          <Link href={`/post/${_id}`}>
            <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
          </Link>
        </div>
        <Link href={`/user.${author?._id}`}>
          <Image
            src='https://placehold.co/48x48'
            alt='placeholder'
            width={48}
            height={48}
            className='rounded-full'
          />
        </Link>
      </div>
      <Link href={`/post/${_id}`}>
        <p className='post-card_desc'>{description}</p>

        <img src={image} alt='placeholder' className='post-card_img' />
      </Link>
      <div className='flex-between gap-3 mt-5'>
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className='text-16-medium'>{category}</p>
        </Link>
        <Button className='post-card_btn' asChild>
          <Link href={`/post/${_id}`}>Read More</Link>
        </Button>
      </div>
    </li>
  );
};

export default PostCard;
