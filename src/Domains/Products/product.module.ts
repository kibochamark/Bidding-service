import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { CategoryService } from './category.service';
import { ProductsController } from 'src/Controllers/Products/products.controller';
import { CategoriesController } from 'src/Controllers/Products/categories.controller';

@Module({
    controllers: [ProductsController, CategoriesController],
    providers: [ProductService, ProductRepository, CategoryService],
    exports: [ProductService, CategoryService],
})
export class ProductModule {}
