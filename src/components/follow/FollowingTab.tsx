import { useGetFollowing } from "@/hooks/use-follow";
import FollowCard from "./FollowCard";

export default function FollowingTab() {
  const { data: users, isLoading } = useGetFollowing();

  if (isLoading) return <div>Loading following...</div>;

  return (
    <div className="space-y-3">
      {users
        ?.filter((u:any) => u.profile)
        .map((user:any) => <FollowCard key={user.id} user={user} />)}
    </div>
  );
}
