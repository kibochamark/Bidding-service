import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../../../src/Controllers/Products/dto';

@Injectable()
export class CategoryService {
    private readonly logger = new Logger(CategoryService.name);

    constructor(private prisma: PrismaService) {}

    async createCategory(data: CreateCategoryDto) {
        this.logger.log(`Creating category: ${data.name}`);

        let query_data ={
            ...data
        }

        if(data.parentId){
            query_data["parentId"]=data.parentId
        }

        return await this.prisma.category.create({
            data: {
                ...query_data
            },
            include: {
                parent: true,
                children: true,
            },
        });
    }

    async getAllCategories() {
        return await this.prisma.category.findMany({
            include: {
                parent: true,
                children: true,
                _count: {
                    select: {
                        products: true,
                    },
                },
            },
            orderBy: {
                name: 'asc',
            },
        });
    }

    async getCategoryById(id: string) {
        const category = await this.prisma.category.findUnique({
            where: { id },
            include: {
                parent: true,
                children: true,
                _count: {
                    select: {
                        products: true,
                    },
                },
            },
        });

        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        return category;
    }

    async getCategoryBySlug(slug: string) {
        const category = await this.prisma.category.findUnique({
            where: { slug },
            include: {
                parent: true,
                children: true,
                _count: {
                    select: {
                        products: true,
                    },
                },
            },
        });

        if (!category) {
            throw new NotFoundException(`Category with slug ${slug} not found`);
        }

        return category;
    }

    async updateCategory(id: string, data: Partial<UpdateCategoryDto>) {
        await this.getCategoryById(id);

        this.logger.log(`Updating category: ${id}`);

        return await this.prisma.category.update({
            where: { id },
            data,
            include: {
                parent: true,
                children: true,
            },
        });
    }

    async deleteCategory(id: string) {
        await this.getCategoryById(id);

        this.logger.log(`Deleting category: ${id}`);

        return await this.prisma.category.delete({
            where: { id },
        });
    }

    async getRootCategories() {
        return await this.prisma.category.findMany({
            where: {
                parentId: null,
            },
            include: {
                children: true,
                _count: {
                    select: {
                        products: true,
                    },
                },
            },
            orderBy: {
                name: 'asc',
            },
        });
    }
}
