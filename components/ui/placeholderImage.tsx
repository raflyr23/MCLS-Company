// components/ui/PlaceholderImage.tsx
import React from 'react';

interface PlaceholderImageProps {
  className?: string;
  text?: string;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ 
  className = 'h-48', 
  text = 'Placeholder Gambar' 
}) => (
  <div
    className={`bg-gray-200 w-full flex items-center justify-center text-gray-400 ${className}`}
  >
    <svg
      className="w-10 h-10"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
    <span className="ml-2 text-sm font-medium">{text}</span>
  </div>
);

export default PlaceholderImage;