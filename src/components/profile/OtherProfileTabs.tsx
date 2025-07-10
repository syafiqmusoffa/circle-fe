import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import OtherProfileThread from "./OtherProfileThreads";
import { OtherProfilePict } from "./OtherProfilePicts";

function OtherProfileTabs() {
  return (
    <Tabs defaultValue="thread" className="w-full">
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger value="thread">Thread</TabsTrigger>
        <TabsTrigger value="pict">Pict</TabsTrigger>
      </TabsList>

      <TabsContent value="thread">
        <OtherProfileThread />
      </TabsContent>
      <TabsContent value="pict">
        <OtherProfilePict />
      </TabsContent>
    </Tabs>
  );
}

export default OtherProfileTabs;
