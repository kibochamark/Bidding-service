import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

/**
 * DTO for creating a category
 */
export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    slug: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    icon?: string;

    @IsOptional()
    @IsUUID()
    parentId?: string;
}

/**
 * DTO for updating a category
 */
export class UpdateCategoryDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    icon?: string;

    @IsOptional()
    @IsUUID()
    parentId?: string;
}

/**
 * DTO for category ID parameter
 */
export class CategoryParamDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;
}
