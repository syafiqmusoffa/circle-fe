export type ThreadProps = {
  id: number;
  authorId: number;
  content: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
    author: {
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
      profile: {
      userId:number
      avatarUrl: string;
      username: string;
      name: string
    };
  };
  _count: {
    comments: number;
    likes: number;
  };
  createdRelative: string;
  likeCount: number
  likeComment:number
  liked: boolean
};

export interface ThreadById {
  id: number;
  content: string;
  imageUrl?: string;
  createdAt: string;

  author: {
    id: number;
    profile: {
      username: string;
      name?: string;
      avatarUrl?: string;
    };
    _count: {
      postLike: number;
      comments: number;
    };
  };
}

export interface ReplyProps {
  id: number;
  postId: number;
  content: string;
  createdAt: string;
  author: {
    profile: {
      id: number;
      userId: number;
      username: string;
      name: string;
      bio: string
      avatarUrl: string;
    }

  }
}
