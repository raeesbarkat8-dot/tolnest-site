import React from 'react';
import { AgeCalculator } from './AgeCalculator';
import { PercentageCalculator } from './PercentageCalculator';
import { EmiCalculator } from './EmiCalculator';
import { WordCounter } from './WordCounter';
import { TypingSpeedTest } from './TypingSpeedTest';
import { ImageCompressor } from './ImageCompressor';
import { ImageResizer } from './ImageResizer';
import { QrCodeGenerator } from './QrCodeGenerator';
import { UnitConverter } from './UnitConverter';
import { CurrencyConverter } from './CurrencyConverter';
import { PdfToWord } from './PdfToWord';
import { WordToPdf } from './WordToPdf';
import { PasswordGenerator } from './PasswordGenerator';
import { BmiCalculator } from './BmiCalculator';
import { DateDifferenceCalculator } from './DateDifferenceCalculator';

interface ToolRendererProps {
  toolId: string;
}

export const ToolRenderer: React.FC<ToolRendererProps> = ({ toolId }) => {
  switch (toolId) {
    case 'age-calculator':
      return <AgeCalculator />;
    case 'percentage-calculator':
      return <PercentageCalculator />;
    case 'emi-loan-calculator':
      return <EmiCalculator />;
    case 'word-counter':
      return <WordCounter />;
    case 'typing-speed-test':
      return <TypingSpeedTest />;
    case 'image-compressor':
      return <ImageCompressor />;
    case 'image-resizer':
      return <ImageResizer />;
    case 'qr-code-generator':
      return <QrCodeGenerator />;
    case 'unit-converter':
      return <UnitConverter />;
    case 'currency-converter':
      return <CurrencyConverter />;
    case 'pdf-to-word':
      return <PdfToWord />;
    case 'word-to-pdf':
      return <WordToPdf />;
    case 'password-generator':
      return <PasswordGenerator />;
    case 'bmi-calculator':
      return <BmiCalculator />;
    case 'date-difference-calculator':
      return <DateDifferenceCalculator />;
    default:
      return (
        <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
          Tool not found.
        </div>
      );
  }
};
