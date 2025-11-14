import { Plus, Trash2 } from "lucide-react";
import { ColorPicker } from "./ColorPicker";
import { FileUpload } from "./FileUpload";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";

export interface Block {
  id: string;
  imageFile: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface BlocksStyling {
  blockBackground: string;
  titleColor: string;
  descriptionColor: string;
  buttonBackground: string;
  buttonTextColor: string;
}

export interface BlockSet {
  id: string;
  blocks: Block[];
  styling: BlocksStyling;
}

interface BlocksTabProps {
  blockSets: BlockSet[];
  onBlockSetsChange: (blockSets: BlockSet[]) => void;
}

export function BlocksTab({ blockSets, onBlockSetsChange }: BlocksTabProps) {
  // Default styling for new block sets
  const DEFAULT_STYLING = {
    blockBackground: "rgba(31, 31, 31, 1)",
    titleColor: "rgba(255, 255, 255, 1)",
    descriptionColor: "rgba(196, 196, 196, 1)",
    buttonBackground: "rgba(122, 73, 240, 1)",
    buttonTextColor: "rgba(255, 255, 255, 1)"
  };

  // Default block template
  const DEFAULT_BLOCK: Omit<Block, 'id'> = {
    imageFile: "",
    title: "New Block",
    description: "Description here",
    buttonText: "VIEW",
    buttonLink: ""
  };

  const addBlockSet = () => {
    const newBlockSet: BlockSet = {
      id: Date.now().toString(),
      blocks: [],
      styling: { ...DEFAULT_STYLING }
    };
    onBlockSetsChange([...blockSets, newBlockSet]);
  };

  const removeBlockSet = (id: string) => {
    onBlockSetsChange(blockSets.filter(bs => bs.id !== id));
  };

  const updateBlockSet = (id: string, updates: Partial<BlockSet>) => {
    onBlockSetsChange(blockSets.map(bs => bs.id === id ? { ...bs, ...updates } : bs));
  };

  const resetBlockSetStyling = (id: string) => {
    onBlockSetsChange(blockSets.map(bs => bs.id === id ? { ...bs, styling: { ...DEFAULT_STYLING } } : bs));
  };

  const addBlockToSet = (setId: string) => {
    const newBlock: Block = {
      id: Date.now().toString() + Math.random(),
      ...DEFAULT_BLOCK
    };
    
    const updatedBlockSets = blockSets.map(bs => {
      if (bs.id === setId) {
        return { ...bs, blocks: [...bs.blocks, newBlock] };
      }
      return bs;
    });
    onBlockSetsChange(updatedBlockSets);
  };

  const removeBlockFromSet = (setId: string, blockId: string) => {
    const updatedBlockSets = blockSets.map(bs => {
      if (bs.id === setId) {
        return { ...bs, blocks: bs.blocks.filter(b => b.id !== blockId) };
      }
      return bs;
    });
    onBlockSetsChange(updatedBlockSets);
  };

  const updateBlock = (setId: string, blockId: string, updates: Partial<Block>) => {
    const updatedBlockSets = blockSets.map(bs => {
      if (bs.id === setId) {
        return {
          ...bs,
          blocks: bs.blocks.map(b => b.id === blockId ? { ...b, ...updates } : b)
        };
      }
      return bs;
    });
    onBlockSetsChange(updatedBlockSets);
  };

  const updateStyling = (setId: string, styling: BlocksStyling) => {
    updateBlockSet(setId, { styling });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3>Content Block Sets</h3>
          <p className="text-sm text-gray-500">Add multiple block sets for rotation - each set can contain multiple blocks</p>
        </div>
        <Button onClick={addBlockSet} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Block Set
        </Button>
      </div>

      {blockSets.map((blockSet, setIndex) => (
        <Card key={blockSet.id} className="border-2">
          <CardHeader className="bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Block Set {setIndex + 1}</CardTitle>
                <CardDescription>
                  This set will rotate with other sets on the frontend
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => resetBlockSetStyling(blockSet.id)}
                  title="Reset styling to defaults"
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
                  onClick={() => removeBlockSet(blockSet.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Blocks within this set */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4>Blocks in this Set</h4>
                <Button
                  onClick={() => addBlockToSet(blockSet.id)}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Block
                </Button>
              </div>

              {blockSet.blocks.map((block, blockIndex) => (
                <Card key={block.id} className="bg-gray-50">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">Block {blockIndex + 1}</CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeBlockFromSet(blockSet.id, block.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FileUpload
                      label="Block Image"
                      value={block.imageFile}
                      onChange={(val) => updateBlock(blockSet.id, block.id, { imageFile: val })}
                      accept="image/*"
                    />

                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={block.title}
                        onChange={(e) => updateBlock(blockSet.id, block.id, { title: e.target.value })}
                        placeholder="Block title"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={block.description}
                        onChange={(e) => updateBlock(blockSet.id, block.id, { description: e.target.value })}
                        placeholder="Block description"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Button Text</Label>
                      <Input
                        value={block.buttonText}
                        onChange={(e) => updateBlock(blockSet.id, block.id, { buttonText: e.target.value })}
                        placeholder="Learn more"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Button Link</Label>
                      <Input
                        value={block.buttonLink}
                        onChange={(e) => updateBlock(blockSet.id, block.id, { buttonLink: e.target.value })}
                        placeholder="https://example.com"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}

              {blockSet.blocks.length === 0 && (
                <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
                  No blocks in this set yet. Click "Add Block" to add content blocks.
                </div>
              )}
            </div>

            <Separator />

            {/* Styling for this set */}
            <div className="space-y-4">
              <h4>Styling for Block Set {setIndex + 1}</h4>
              <p className="text-sm text-gray-500">
                These styles apply to all blocks in this set
              </p>

              <ColorPicker
                label="Block Background"
                value={blockSet.styling.blockBackground}
                onChange={(val) => updateStyling(blockSet.id, { ...blockSet.styling, blockBackground: val })}
              />

              <ColorPicker
                label="Title Color"
                value={blockSet.styling.titleColor}
                onChange={(val) => updateStyling(blockSet.id, { ...blockSet.styling, titleColor: val })}
              />

              <ColorPicker
                label="Description Color"
                value={blockSet.styling.descriptionColor}
                onChange={(val) => updateStyling(blockSet.id, { ...blockSet.styling, descriptionColor: val })}
              />

              <ColorPicker
                label="Button Background"
                value={blockSet.styling.buttonBackground}
                onChange={(val) => updateStyling(blockSet.id, { ...blockSet.styling, buttonBackground: val })}
              />

              <ColorPicker
                label="Button Text Color"
                value={blockSet.styling.buttonTextColor}
                onChange={(val) => updateStyling(blockSet.id, { ...blockSet.styling, buttonTextColor: val })}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {blockSets.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            No block sets added yet. Click "Add Block Set" to get started.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
