
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ContentTable } from "@/components/super-admin/content/content-table"

export default function ContentPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Educational Content</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Content
        </Button>
      </div>

      <Tabs defaultValue="articles">
        <TabsList>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="webinars">Webinars</TabsTrigger>
        </TabsList>
        <TabsContent value="articles">
          <ContentTable type="articles" />
        </TabsContent>
        <TabsContent value="videos">
          <ContentTable type="videos" />
        </TabsContent>
        <TabsContent value="guides">
          <ContentTable type="guides" />
        </TabsContent>
        <TabsContent value="webinars">
          <ContentTable type="webinars" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

