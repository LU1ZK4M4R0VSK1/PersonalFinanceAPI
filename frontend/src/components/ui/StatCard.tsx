import type { LucideIcon } from 'lucide-react'; 
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'destructive';
}

export const StatCard = ({ title, value, icon: Icon, variant = 'default' }: StatCardProps) => {
  const iconColors = {
    default: 'text-primary',
    success: 'text-success',
    destructive: 'text-destructive',
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <Icon className={`h-8 w-8 ${iconColors[variant]}`} />
        </div>
      </CardContent>
    </Card>
  );
};