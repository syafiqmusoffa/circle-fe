import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProfileThread from "./ProfileThread";
import { ProfilePict } from "./ProfilePict";

function ProfileTabs() {
  return (
    <Tabs defaultValue="thread" className="w-full">
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger value="thread">Thread</TabsTrigger>
        <TabsTrigger value="pict">Pict</TabsTrigger>
      </TabsList>

      <TabsContent value="thread">
        <ProfileThread />
      </TabsContent>
      <TabsContent value="pict">
        <ProfilePict />
      </TabsContent>
    </Tabs>
  );
}

export default ProfileTabs;
