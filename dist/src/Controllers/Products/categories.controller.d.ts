import { CategoryService } from '../../../src/Domains/Products/category.service';
import { CategoryParamDto, CategorySlugDto, CreateCategoryDto, UpdateCategoryDto } from './dto';
import { S3moduleService } from 'src/Domains/s3module/s3module.service';
export declare class CategoriesController {
    private categoryService;
    private s3Service;
    private logger;
    constructor(categoryService: CategoryService, s3Service: S3moduleService);
    createCategory(file: Express.Multer.File, dto: CreateCategoryDto): Promise<{
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
    updateCategory(file: Express.Multer.File, params: CategoryParamDto, dto: UpdateCategoryDto): Promise<{
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
