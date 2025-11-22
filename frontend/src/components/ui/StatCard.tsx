import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
}

export const StatCard = ({ title, value, icon: Icon }: StatCardProps) => {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">{title}</p>
                        <p className="text-2xl font-bold">{value}</p>
                    </div>
                    <Icon className="h-8 w-8 text-blue-500" />
                </div>
            </CardContent>
        </Card>
    );
};