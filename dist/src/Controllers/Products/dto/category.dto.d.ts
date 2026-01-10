export declare class CreateCategoryDto {
    slug: string;
    name: string;
    description: string;
    icon?: string;
    parentId?: string;
}
export declare class UpdateCategoryDto {
    name?: string;
    description?: string;
    icon?: string;
    parentId?: string;
}
export declare class CategoryParamDto {
    id: string;
}
