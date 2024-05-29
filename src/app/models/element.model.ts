export interface element {
    id: number;
    description: string;
}

export interface orderType extends element {
    isActive: boolean;
} 