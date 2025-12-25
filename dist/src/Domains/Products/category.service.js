"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CategoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../src/prisma/prisma.service");
let CategoryService = CategoryService_1 = class CategoryService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(CategoryService_1.name);
    }
    async createCategory(data) {
        this.logger.log(`Creating category: ${data.name}`);
        return await this.prisma.category.create({
            data: {
                slug: data.slug,
                name: data.name,
                description: data.description,
                icon: data.icon,
                parentId: data.parentId,
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
    async getCategoryById(id) {
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
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }
    async getCategoryBySlug(slug) {
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
            throw new common_1.NotFoundException(`Category with slug ${slug} not found`);
        }
        return category;
    }
    async updateCategory(id, data) {
        await this.getCategoryById(id);
        this.logger.log(`Updating category: ${id}`);
        return await this.prisma.category.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                icon: data.icon,
                parentId: data.parentId,
            },
            include: {
                parent: true,
                children: true,
            },
        });
    }
    async deleteCategory(id) {
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
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = CategoryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
//# sourceMappingURL=category.service.js.map