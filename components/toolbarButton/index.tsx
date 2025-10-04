import React from 'react'
import { Button } from '@/components/ui/button';

interface ToolbarButtonProps {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}

const ToolbarButton = ({ onClick, isActive, children }: ToolbarButtonProps) => {
  return (
    <Button size="sm" variant="ghost" type='button' onClick={onClick} className={`p-0 border border-[#303030] ${isActive && "bg-[#430B68] text-white"}`}>{ children }</Button>
  )
}

export default ToolbarButton