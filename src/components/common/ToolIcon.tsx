import React from 'react';
import {
  CalendarClock,
  Percent,
  Coins,
  FileText,
  Keyboard,
  Minimize2,
  Maximize2,
  QrCode,
  ArrowLeftRight,
  DollarSign,
  FileCheck,
  FileType,
  ShieldCheck,
  Activity,
  CalendarRange,
  Wrench
} from 'lucide-react';

interface ToolIconProps {
  name: string;
  className?: string;
}

export const ToolIcon: React.FC<ToolIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'CalendarClock':
      return <CalendarClock className={className} />;
    case 'Percent':
      return <Percent className={className} />;
    case 'Coins':
      return <Coins className={className} />;
    case 'FileText':
      return <FileText className={className} />;
    case 'Keyboard':
      return <Keyboard className={className} />;
    case 'Minimize2':
      return <Minimize2 className={className} />;
    case 'Maximize2':
      return <Maximize2 className={className} />;
    case 'QrCode':
      return <QrCode className={className} />;
    case 'ArrowLeftRight':
      return <ArrowLeftRight className={className} />;
    case 'DollarSign':
      return <DollarSign className={className} />;
    case 'FileCheck':
      return <FileCheck className={className} />;
    case 'FileType':
      return <FileType className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Activity':
      return <Activity className={className} />;
    case 'CalendarRange':
      return <CalendarRange className={className} />;
    default:
      return <Wrench className={className} />;
  }
};
