import { CategoryService } from '../../../src/Domains/Products/category.service';
import { CategoryParamDto, CategorySlugDto, CreateCategoryDto, UpdateCategoryDto } from './dto';
export declare class CategoriesController {
    private categoryService;
    constructor(categoryService: CategoryService);
    createCategory(dto: CreateCategoryDto): Promise<{
        parent: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            name: string;
            description: string | null;
            icon: string | null;
            parentId: string | null;
        } | null;
        children: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            name: string;
            description: string | null;
            icon: string | null;
            parentId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        name: string;
        description: string | null;
        icon: string | null;
        parentId: string | null;
    }>;
    getAllCategories(): Promise<({
        _count: {
            products: number;
        };
        parent: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            name: string;
            description: string | null;
            icon: string | null;
            parentId: string | null;
        } | null;
        children: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            name: string;
            description: string | null;
            icon: string | null;
            parentId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        name: string;
        description: string | null;
        icon: string | null;
        parentId: string | null;
    })[]>;
    getRootCategories(): Promise<({
        _count: {
            products: number;
        };
        children: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            name: string;
            description: string | null;
            icon: string | null;
            parentId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        name: string;
        description: string | null;
        icon: string | null;
        parentId: string | null;
    })[]>;
    getCategoryBySlug(params: CategorySlugDto): Promise<{
        _count: {
            products: number;
        };
        parent: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            name: string;
            description: string | null;
            icon: string | null;
            parentId: string | null;
        } | null;
        children: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            name: string;
            description: string | null;
            icon: string | null;
            parentId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        name: string;
        description: string | null;
        icon: string | null;
        parentId: string | null;
    }>;
    getCategoryById(params: CategoryParamDto): Promise<{
        _count: {
            products: number;
        };
        parent: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            name: string;
            description: string | null;
            icon: string | null;
            parentId: string | null;
        } | null;
        children: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            name: string;
            description: string | null;
            icon: string | null;
            parentId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        name: string;
        description: string | null;
        icon: string | null;
        parentId: string | null;
    }>;
    updateCategory(params: CategoryParamDto, dto: UpdateCategoryDto): Promise<{
        parent: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            name: string;
            description: string | null;
            icon: string | null;
            parentId: string | null;
        } | null;
        children: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            name: string;
            description: string | null;
            icon: string | null;
            parentId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        name: string;
        description: string | null;
        icon: string | null;
        parentId: string | null;
    }>;
    deleteCategory(params: CategoryParamDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        name: string;
        description: string | null;
        icon: string | null;
        parentId: string | null;
    }>;
}
