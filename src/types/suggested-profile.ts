// types/suggested-profile.ts
export interface SuggestedUserType {
  id: number;
  email: string;
  isFollowed: boolean
  profile: {
    userId: number;
    username: string;
    name: string;
    bio: string;
    avatarUrl: string;
    interests: string[];
  };
}
export interface UserFollowsType {
  id: number;
  email: string;
  profile: {
    userId: number;
    username: string;
    name: string;
    bio: string;
    avatarUrl: string;
    interests: string[];
  },
  isFollowed: boolean
}
