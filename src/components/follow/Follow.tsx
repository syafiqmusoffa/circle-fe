import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FollowingTab from "./FollowingTab";
import FollowerTab from "./FollowerTab";

export default function Follow() {
  return (
    <Tabs defaultValue="following" className="w-full">
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger value="following">Following</TabsTrigger>
        <TabsTrigger value="follower">Follower</TabsTrigger>
      </TabsList>

      <TabsContent value="following">
        <FollowingTab />
      </TabsContent>
      <TabsContent value="follower">
        <FollowerTab />
      </TabsContent>
    </Tabs>
  );
}
