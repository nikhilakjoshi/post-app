import { Post } from "@prisma/client";
import { useState } from "react";
import { trpc } from "../utils/trpc";

export const getServerSideProps = async () => {
  const posts = (await fetch("http://localhost:3000/api/posts").then((a) =>
    a.json()
  )) as Post[];
  return {
    props: {
      posts: posts.length > 0 ? posts : [],
    },
  };
};

interface Props {
  posts: Post[];
}

const Posts: React.FC<Props> = ({ posts }) => {
  const [newPost, setNewPost] = useState<string>("");
  const { data } = trpc.post.getAll.useQuery(undefined, {
    initialData: posts,
    refetchOnMount: false,
  });
  const ctxx = trpc.useContext();
  const mutation = trpc.post.createPost.useMutation({
    onSuccess: () => {
      ctxx.post.getAll.invalidate();
    },
  });
  const handleSavePost = async () => {
    await mutation.mutateAsync({ post: newPost });
  };
  if (mutation.isLoading)
    return (
      <div className="grid h-screen w-screen place-items-center bg-zinc-700 text-gray-100">
        Saving...
      </div>
    );
  return (
    <div className="appp min-h-screen bg-zinc-700">
      <div className="container mx-auto max-w-screen-xl py-6">
        <div className="flex flex-col text-center">
          <h1 className="text-3xl font-bold text-gray-100">Hello Posts</h1>
          {data?.map((post) => (
            <div
              className="my-4 rounded-sm bg-gray-200 px-4 py-4 text-left text-gray-700"
              key={post.id}
            >
              <div className="title">{post.post}</div>
            </div>
          ))}
          <textarea
            rows={4}
            name="newPost"
            id="newPost"
            maxLength={200}
            className="my-4 rounded-sm border px-4 py-4 text-gray-700"
            onChange={(e) => setNewPost(e.target.value)}
          />
          <button
            onClick={() => handleSavePost()}
            className="rounded bg-teal-200 px-3 py-2 text-gray-700"
          >
            Save post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Posts;
