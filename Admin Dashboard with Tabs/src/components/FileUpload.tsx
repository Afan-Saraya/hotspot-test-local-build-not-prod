import { useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Upload, X } from "lucide-react";

interface FileUploadProps {
  label: string;
  value: string;
  onChange: (file: string) => void;
  accept?: string;
  folder?: string; // explicit assets subfolder override
}

export function FileUpload({ label, value, onChange, accept, folder }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      
      // Determine folder based on explicit prop or fallback heuristics
      let uploadFolder = folder || 'uploads';
      if (!folder) {
        if (file.type.startsWith('video/')) {
          uploadFolder = 'video';
        } else if (file.type.startsWith('image/')) {
          // Check if it's for banners or blocks based on label
          if (label.toLowerCase().includes('banner')) {
            uploadFolder = 'banners';
          } else if (label.toLowerCase().includes('block')) {
            uploadFolder = 'blocks';
          } else if (label.toLowerCase().includes('thumbnail') || label.toLowerCase().includes('poster')) {
            uploadFolder = 'video';
          } else if (label.toLowerCase().includes('icon')) {
            uploadFolder = 'blocks/icons';
          } else {
            uploadFolder = 'banners';
          }
        }
      }

      // Upload to backend server
      const formData = new FormData();
      formData.append('file', file);

      try {
        // Get session ID from localStorage
        const sessionId = localStorage.getItem('sessionId');
        
        // Use relative path so device on LAN uses correct origin (Vite proxy routes to server)
        const response = await fetch(`/api/upload?folder=${uploadFolder}`, {
          method: 'POST',
          headers: {
            'x-session-id': sessionId || '',
          },
          body: formData
        });

        if (response.status === 401) {
          alert('Session expired. Please log in again.');
          window.location.reload();
          return;
        }

        if (response.ok) {
          const data = await response.json();
          // Server returns 'url' field
          onChange(data.url);
        } else {
          console.error('Upload failed');
          alert('Failed to upload file');
        }
      } catch (error) {
        console.error('Upload error:', error);
        alert('Failed to upload file');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2 items-center">
        <label className="cursor-pointer">
          <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
            disabled={uploading}
          />
          <Button type="button" variant="outline" className="gap-2" disabled={uploading} asChild>
            <span>
              <Upload className="w-4 h-4" />
              {uploading ? 'Uploading...' : 'Choose File'}
            </span>
          </Button>
        </label>
        {value && !uploading && (
          <>
            <span className="text-sm text-gray-600 flex-1 truncate" title={value}>{value}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleClear}
            >
              <X className="w-4 h-4" />
            </Button>
          </>
        )}
        {uploading && (
          <span className="text-sm text-blue-600">Uploading file...</span>
        )}
      </div>
      {value && !uploading && value.startsWith('/assets') && (
        <div className="text-xs text-green-600">✓ File uploaded successfully</div>
      )}
    </div>
  );
}
