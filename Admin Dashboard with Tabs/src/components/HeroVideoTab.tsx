import { Plus, Trash2 } from "lucide-react";
import { BilingualInput } from "./BilingualInput";
import { ColorPicker } from "./ColorPicker";
import { FileUpload } from "./FileUpload";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

export interface HeroVideo {
  id: string;
  videoFile: string;
  thumbnail: string;
  titleBosnian: string;
  titleEnglish: string;
  buttonTextBosnian: string;
  buttonTextEnglish: string;
  buttonLink: string;
  titleColor: string;
  buttonBackground: string;
  buttonTextColor: string;
}

interface HeroVideoTabProps {
  videos: HeroVideo[];
  onVideosChange: (videos: HeroVideo[]) => void;
}

export function HeroVideoTab({ videos, onVideosChange }: HeroVideoTabProps) {
  // Default values for new videos
  const DEFAULT_VIDEO: Omit<HeroVideo, 'id'> = {
    videoFile: "",
    thumbnail: "",
    titleBosnian: "POVEŽI SE I\nISTRAŽI PONUDE",
    titleEnglish: "CONNECT AND\nEXPLORE OFFERS",
    buttonTextBosnian: "POGLEDAJ",
    buttonTextEnglish: "VIEW",
    buttonLink: "",
    titleColor: "rgba(255, 255, 255, 1)",
    buttonBackground: "rgba(122, 73, 240, 1)",
    buttonTextColor: "rgba(255, 255, 255, 1)"
  };

  const addVideo = () => {
    const newVideo: HeroVideo = {
      id: Date.now().toString(),
      ...DEFAULT_VIDEO
    };
    onVideosChange([...videos, newVideo]);
  };

  const resetVideo = (id: string) => {
    onVideosChange(videos.map(v => v.id === id ? { ...DEFAULT_VIDEO, id, videoFile: v.videoFile, thumbnail: v.thumbnail } : v));
  };

  const removeVideo = (id: string) => {
    onVideosChange(videos.filter(v => v.id !== id));
  };

  const updateVideo = (id: string, updates: Partial<HeroVideo>) => {
    onVideosChange(videos.map(v => v.id === id ? { ...v, ...updates } : v));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3>Hero Videos</h3>
          <p className="text-sm text-gray-500">Add multiple hero videos for rotation</p>
        </div>
        <Button onClick={addVideo} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Hero Video
        </Button>
      </div>

      {videos.map((video, index) => (
        <Card key={video.id}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Hero Video {index + 1}</CardTitle>
                <CardDescription>Configure video content and styling</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => resetVideo(video.id)}
                  title="Reset to default values"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                    <path d="M21 3v5h-5"/>
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                    <path d="M3 21v-5h5"/>
                  </svg>
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeVideo(video.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h4>Content</h4>
              <FileUpload
                label="Video File"
                value={video.videoFile}
                onChange={(val) => updateVideo(video.id, { videoFile: val })}
                accept="video/*"
              />
              
              <FileUpload
                label="Thumbnail Image"
                value={video.thumbnail}
                onChange={(val) => updateVideo(video.id, { thumbnail: val })}
                accept="image/*"
              />

              <BilingualInput
                label="Title"
                bosnianValue={video.titleBosnian}
                englishValue={video.titleEnglish}
                onBosnianChange={(val) => updateVideo(video.id, { titleBosnian: val })}
                onEnglishChange={(val) => updateVideo(video.id, { titleEnglish: val })}
              />

              <BilingualInput
                label="Button Text"
                bosnianValue={video.buttonTextBosnian}
                englishValue={video.buttonTextEnglish}
                onBosnianChange={(val) => updateVideo(video.id, { buttonTextBosnian: val })}
                onEnglishChange={(val) => updateVideo(video.id, { buttonTextEnglish: val })}
              />

              <div className="space-y-2">
                <Label>Button Link</Label>
                <Input
                  value={video.buttonLink}
                  onChange={(e) => updateVideo(video.id, { buttonLink: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4>Colors & Styling</h4>
              <ColorPicker
                label="Title Text Color"
                value={video.titleColor}
                onChange={(val) => updateVideo(video.id, { titleColor: val })}
              />

              <ColorPicker
                label="Button Background"
                value={video.buttonBackground}
                onChange={(val) => updateVideo(video.id, { buttonBackground: val })}
              />

              <ColorPicker
                label="Button Text Color"
                value={video.buttonTextColor}
                onChange={(val) => updateVideo(video.id, { buttonTextColor: val })}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {videos.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            No hero videos added yet. Click "Add Hero Video" to get started.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
