import { PrismaService } from '../../../src/prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../../../src/Controllers/Products/dto';
export declare class CategoryService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    createCategory(data: CreateCategoryDto): Promise<{
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
    getCategoryById(id: string): Promise<{
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
    getCategoryBySlug(slug: string): Promise<{
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
    updateCategory(id: string, data: UpdateCategoryDto): Promise<{
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
    deleteCategory(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        name: string;
        description: string | null;
        icon: string | null;
        parentId: string | null;
    }>;
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
}
