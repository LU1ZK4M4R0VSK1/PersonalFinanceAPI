import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'destructive';
}

export const StatCard = ({ title, value, icon: Icon, variant = 'default' }: StatCardProps) => {
  const variantStyles = {
    default: 'bg-blue-50 text-blue-900 border-blue-200',
    success: 'bg-green-50 text-green-900 border-green-200', 
    destructive: 'bg-red-50 text-red-900 border-red-200'
  };

  return (
    <div className={cn(
      "border rounded-lg p-6",
      variantStyles[variant]
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <Icon className="h-8 w-8 opacity-70" />
      </div>
    </div>
  );
};