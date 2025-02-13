
import React from 'react';
import { Textarea } from "@/components/ui/textarea";

interface TextInputProps {
  value: string;
  onChange: (text: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange }) => {
  return (
    <div className="w-full space-y-2 animate-fade-in">
      <label className="block text-sm font-medium text-gray-700">Enter your text</label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type or paste your text here..."
        className="min-h-[200px] p-4 text-base transition-all duration-200 focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
};

export default TextInput;
