import { find, filter } from 'lodash';

type Post = {
    id: number;
    title: string;
    authorId?: number;
    author?: Author;
    votes: number;
};

type Author = {
    id: number;
    firstName: string;
    lastName: string;
    posts?: Array<Post>;
};

// example data
const authors: Array<Author> = [
    { id: 1, firstName: 'Tom', lastName: 'Coleman' },
    { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
    { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
  ];
  
const posts: Array<Post> = [
    { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
    { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
    { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
    { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
  ];

const resolvers = {
    Query: {
      posts(): Array<Post> {
        return posts;
      },
    },
    Mutation: {
      upvotePost(_: Array<Post>, { postId }: {postId: number}): Post {
        const post = find(posts, { id: postId });
        if (!post) {
          throw new Error(`Couldn't find post with id ${postId}`);
        }
        post.votes += 1;
        return post;
      },
    },
    Author: {
      posts(author: string): Array<Post> {
        // @ts-ignore
        return filter(posts, { authorId: author.id });
      },
    },
    Post: {
      author(post:Post): string[] {
        // @ts-ignore
        return find(authors, { id: post.authorId });
      },
    },
  };
  
export default resolvers;