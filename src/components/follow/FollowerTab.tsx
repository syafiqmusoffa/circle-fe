import { useGetFollower } from "@/hooks/use-follow";
import FollowCard from "./FollowCard";

export default function FollowerTab() {
  const { data: users, isLoading } = useGetFollower();

  if (isLoading) return <div className="text-gray-400">Loading followers...</div>;

  return (
    <div className="space-y-3">
      {users?.filter((u:any) => u.profile)
        .map((user:any) => <FollowCard key={user.id} user={user} />)}
    </div>
  );
}
