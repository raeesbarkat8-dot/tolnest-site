import React, { useState, useMemo } from 'react';
import { ArrowLeftRight, Copy, Check, RotateCcw, Scale } from 'lucide-react';

interface UnitDefinition {
  id: string;
  name: string;
  factorToBase: number; // For non-temperature: multiply by factor to get base
}

const CATEGORIES_DATA: Record<
  string,
  {
    name: string;
    baseUnit: string;
    units: UnitDefinition[];
  }
> = {
  length: {
    name: 'Length',
    baseUnit: 'meter',
    units: [
      { id: 'm', name: 'Meter (m)', factorToBase: 1 },
      { id: 'km', name: 'Kilometer (km)', factorToBase: 1000 },
      { id: 'cm', name: 'Centimeter (cm)', factorToBase: 0.01 },
      { id: 'mm', name: 'Millimeter (mm)', factorToBase: 0.001 },
      { id: 'mi', name: 'Mile (mi)', factorToBase: 1609.344 },
      { id: 'yd', name: 'Yard (yd)', factorToBase: 0.9144 },
      { id: 'ft', name: 'Foot (ft)', factorToBase: 0.3048 },
      { id: 'in', name: 'Inch (in)', factorToBase: 0.0254 }
    ]
  },
  weight: {
    name: 'Weight / Mass',
    baseUnit: 'kilogram',
    units: [
      { id: 'kg', name: 'Kilogram (kg)', factorToBase: 1 },
      { id: 'g', name: 'Gram (g)', factorToBase: 0.001 },
      { id: 'mg', name: 'Milligram (mg)', factorToBase: 0.000001 },
      { id: 'lb', name: 'Pound (lb)', factorToBase: 0.45359237 },
      { id: 'oz', name: 'Ounce (oz)', factorToBase: 0.028349523125 },
      { id: 'ton', name: 'Metric Ton (t)', factorToBase: 1000 },
      { id: 'st', name: 'Stone (st)', factorToBase: 6.35029 }
    ]
  },
  temperature: {
    name: 'Temperature',
    baseUnit: 'celsius',
    units: [
      { id: 'c', name: 'Celsius (°C)', factorToBase: 1 },
      { id: 'f', name: 'Fahrenheit (°F)', factorToBase: 1 },
      { id: 'k', name: 'Kelvin (K)', factorToBase: 1 }
    ]
  },
  area: {
    name: 'Area',
    baseUnit: 'sqm',
    units: [
      { id: 'sqm', name: 'Square Meter (m²)', factorToBase: 1 },
      { id: 'sqkm', name: 'Square Kilometer (km²)', factorToBase: 1000000 },
      { id: 'sqft', name: 'Square Foot (ft²)', factorToBase: 0.092903 },
      { id: 'sqyd', name: 'Square Yard (yd²)', factorToBase: 0.836127 },
      { id: 'sqmi', name: 'Square Mile (mi²)', factorToBase: 2589988.11 },
      { id: 'acre', name: 'Acre (ac)', factorToBase: 4046.85642 },
      { id: 'ha', name: 'Hectare (ha)', factorToBase: 10000 }
    ]
  },
  volume: {
    name: 'Volume',
    baseUnit: 'liter',
    units: [
      { id: 'l', name: 'Liter (L)', factorToBase: 1 },
      { id: 'ml', name: 'Milliliter (mL)', factorToBase: 0.001 },
      { id: 'gal', name: 'US Gallon (gal)', factorToBase: 3.78541 },
      { id: 'qt', name: 'US Quart (qt)', factorToBase: 0.946353 },
      { id: 'pt', name: 'US Pint (pt)', factorToBase: 0.473176 },
      { id: 'cup', name: 'US Cup', factorToBase: 0.236588 },
      { id: 'floz', name: 'US Fluid Ounce (fl oz)', factorToBase: 0.0295735 }
    ]
  },
  speed: {
    name: 'Speed',
    baseUnit: 'mps',
    units: [
      { id: 'mps', name: 'Meters / second (m/s)', factorToBase: 1 },
      { id: 'kmh', name: 'Kilometers / hour (km/h)', factorToBase: 0.277778 },
      { id: 'mph', name: 'Miles / hour (mph)', factorToBase: 0.44704 },
      { id: 'knot', name: 'Knot (kn)', factorToBase: 0.514444 }
    ]
  },
  storage: {
    name: 'Digital Storage',
    baseUnit: 'byte',
    units: [
      { id: 'b', name: 'Byte (B)', factorToBase: 1 },
      { id: 'kb', name: 'Kilobyte (KB)', factorToBase: 1024 },
      { id: 'mb', name: 'Megabyte (MB)', factorToBase: 1048576 },
      { id: 'gb', name: 'Gigabyte (GB)', factorToBase: 1073741824 },
      { id: 'tb', name: 'Terabyte (TB)', factorToBase: 1099511627776 }
    ]
  }
};

export const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<string>('length');
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('ft');
  const [inputValue, setInputValue] = useState<string>('10');
  const [copied, setCopied] = useState<boolean>(false);

  // Switch category defaults
  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    const units = CATEGORIES_DATA[cat].units;
    setFromUnit(units[0].id);
    setToUnit(units[1] ? units[1].id : units[0].id);
  };

  // Swap From & To
  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  // Compute conversion
  const convertedValue = useMemo(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return null;

    if (category === 'temperature') {
      // Temperature custom conversion
      let celsius = 0;
      if (fromUnit === 'c') celsius = val;
      else if (fromUnit === 'f') celsius = (val - 32) * (5 / 9);
      else if (fromUnit === 'k') celsius = val - 273.15;

      if (toUnit === 'c') return celsius;
      if (toUnit === 'f') return (celsius * 9) / 5 + 32;
      if (toUnit === 'k') return celsius + 273.15;
      return celsius;
    }

    const currentCat = CATEGORIES_DATA[category];
    const fromDef = currentCat.units.find((u) => u.id === fromUnit);
    const toDef = currentCat.units.find((u) => u.id === toUnit);

    if (!fromDef || !toDef) return null;

    // Convert to base, then to target
    const baseValue = val * fromDef.factorToBase;
    return baseValue / toDef.factorToBase;
  }, [category, fromUnit, toUnit, inputValue]);

  const handleCopy = () => {
    if (convertedValue === null) return;
    navigator.clipboard.writeText(convertedValue.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInputValue('1');
  };

  const activeCatInfo = CATEGORIES_DATA[category];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Category Selection Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl mb-6 overflow-x-auto">
        {Object.entries(CATEGORIES_DATA).map(([catKey, catVal]) => (
          <button
            key={catKey}
            type="button"
            onClick={() => handleCategoryChange(catKey)}
            className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              category === catKey
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {catVal.name}
          </button>
        ))}
      </div>

      {/* Main Converter Card */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
        {/* From Box */}
        <div className="md:col-span-5 bg-slate-50 border border-slate-200/80 rounded-xl p-4">
          <label htmlFor="fromValueInput" className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            From
          </label>
          <div className="space-y-3">
            <input
              id="fromValueInput"
              type="number"
              step="any"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 tabular-nums font-mono"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            >
              {activeCatInfo.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="md:col-span-1 flex justify-center">
          <button
            type="button"
            onClick={handleSwap}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 border border-slate-200 flex items-center justify-center transition-colors shadow-xs"
            title="Swap Units"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* To Box */}
        <div className="md:col-span-5 bg-indigo-50/70 border border-indigo-100 rounded-xl p-4">
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="toUnitSelect" className="block text-[11px] font-semibold text-indigo-700 uppercase tracking-wider">
              To (Converted Result)
            </label>
            {convertedValue !== null && (
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            )}
          </div>
          <div className="space-y-3">
            <div className="w-full bg-white border border-indigo-200 rounded-lg px-3 py-2 text-base font-bold text-slate-900 tabular-nums font-mono min-h-[42px] flex items-center truncate">
              {convertedValue !== null
                ? convertedValue.toLocaleString(undefined, { maximumFractionDigits: 6 })
                : '—'}
            </div>
            <select
              id="toUnitSelect"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full bg-white border border-indigo-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            >
              {activeCatInfo.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Formula & Summary */}
      {convertedValue !== null && (
        <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200/70 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div>
            <span className="font-semibold text-slate-800">Equivalency: </span>
            <span className="font-mono tabular-nums">
              {inputValue} {activeCatInfo.units.find((u) => u.id === fromUnit)?.name} ={' '}
              <strong className="text-indigo-700">
                {convertedValue.toLocaleString(undefined, { maximumFractionDigits: 6 })}{' '}
                {activeCatInfo.units.find((u) => u.id === toUnit)?.name}
              </strong>
            </span>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset to 1</span>
          </button>
        </div>
      )}
    </div>
  );
};
