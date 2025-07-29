import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import type { AttendanceOption as AttendanceOptionType } from '../types/rsvp';

interface AttendanceOptionProps extends AttendanceOptionType {
  isSelected: boolean;
  onClick: () => void;
}

const AttendanceOption = React.memo<AttendanceOptionProps>(({ 
  label, 
  description, 
  variant, 
  isSelected, 
  onClick 
}) => {
  const Icon = variant === 'error' ? XCircle : CheckCircle;
  const colorClasses = variant === 'error' 
    ? 'border-coral-500 bg-coral-50 text-coral-700'
    : 'border-sage-500 bg-sage-50 text-sage-700';

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "p-4 border-2 rounded-lg text-left transition-all duration-200",
        isSelected
          ? colorClasses
          : "border-stone-200 hover:border-stone-300"
      )}>
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium text-stone-800">
            {label}
          </div>
          <div className="text-sm text-stone-600 mt-1">
            {description}
          </div>
        </div>
        {isSelected && (
          <Icon className={`w-5 h-5 ${variant === 'error' ? 'text-coral-600' : 'text-sage-600'}`} />
        )}
      </div>
    </button>
  );
});

AttendanceOption.displayName = 'AttendanceOption';

export default AttendanceOption;