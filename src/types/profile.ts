export interface MyProfile {
  id: number;
  userId: number;
  username: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
  backgroundUrl?: string ;

  user: {
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;

    posts: PostWithRelativeTime[];

    _count: {
      followers: number;
      following: number;
    };
  };
}

export interface PostWithRelativeTime {
  id: number;
  authorId: number;
  content: string;
  imageUrl?: string  ;
  createdAt: string;
  updatedAt: string;
  createdRelative: string;

  author: {
    id: number;
    profile: {
      name:string
      username: string;
      avatarUrl?: string | null;
    };
  };

  _count: {
    likes: number;
    comments: number;
  };
  liked: boolean
  likeCount: number
  countComment: number
}
