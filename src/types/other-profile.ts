export type Profile = {
  id: number;
  userId: number;
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  backgroundUrl: string | null;
  interests: string[];
  user: {
    id: number;
    email: string;
    profile: {
      userId: number;
      username: string;
      name: string;
      bio: string;
    };
    _count: {
      followers: number;
      following: number;
    };
    isFollowed: boolean;
  };
};
