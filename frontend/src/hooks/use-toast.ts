type ToastProps = {
    title: string;
    description: string;
    variant?: 'default' | 'destructive';
};

export const toast = ({ title, description, variant }: ToastProps) => {
    const message = `${title}: ${description}`;
};