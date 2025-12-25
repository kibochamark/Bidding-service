import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CategoryModel = runtime.Types.Result.DefaultSelection<Prisma.$CategoryPayload>;
export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null;
    _min: CategoryMinAggregateOutputType | null;
    _max: CategoryMaxAggregateOutputType | null;
};
export type CategoryMinAggregateOutputType = {
    id: string | null;
    slug: string | null;
    name: string | null;
    description: string | null;
    icon: string | null;
    parentId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CategoryMaxAggregateOutputType = {
    id: string | null;
    slug: string | null;
    name: string | null;
    description: string | null;
    icon: string | null;
    parentId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CategoryCountAggregateOutputType = {
    id: number;
    slug: number;
    name: number;
    description: number;
    icon: number;
    parentId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CategoryMinAggregateInputType = {
    id?: true | runtime.Types.Skip;
    slug?: true | runtime.Types.Skip;
    name?: true | runtime.Types.Skip;
    description?: true | runtime.Types.Skip;
    icon?: true | runtime.Types.Skip;
    parentId?: true | runtime.Types.Skip;
    createdAt?: true | runtime.Types.Skip;
    updatedAt?: true | runtime.Types.Skip;
};
export type CategoryMaxAggregateInputType = {
    id?: true | runtime.Types.Skip;
    slug?: true | runtime.Types.Skip;
    name?: true | runtime.Types.Skip;
    description?: true | runtime.Types.Skip;
    icon?: true | runtime.Types.Skip;
    parentId?: true | runtime.Types.Skip;
    createdAt?: true | runtime.Types.Skip;
    updatedAt?: true | runtime.Types.Skip;
};
export type CategoryCountAggregateInputType = {
    id?: true | runtime.Types.Skip;
    slug?: true | runtime.Types.Skip;
    name?: true | runtime.Types.Skip;
    description?: true | runtime.Types.Skip;
    icon?: true | runtime.Types.Skip;
    parentId?: true | runtime.Types.Skip;
    createdAt?: true | runtime.Types.Skip;
    updatedAt?: true | runtime.Types.Skip;
    _all?: true | runtime.Types.Skip;
};
export type CategoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CategoryWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.CategoryOrderByWithRelationInput | Prisma.CategoryOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.CategoryWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    _count?: true | CategoryCountAggregateInputType;
    _min?: CategoryMinAggregateInputType;
    _max?: CategoryMaxAggregateInputType;
};
export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCategory[P]> : Prisma.GetScalarType<T[P], AggregateCategory[P]>;
};
export type CategoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CategoryWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.CategoryOrderByWithAggregationInput | Prisma.CategoryOrderByWithAggregationInput[] | runtime.Types.Skip;
    by: Prisma.CategoryScalarFieldEnum[] | Prisma.CategoryScalarFieldEnum;
    having?: Prisma.CategoryScalarWhereWithAggregatesInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    _count?: CategoryCountAggregateInputType | true;
    _min?: CategoryMinAggregateInputType;
    _max?: CategoryMaxAggregateInputType;
};
export type CategoryGroupByOutputType = {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    icon: string | null;
    parentId: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: CategoryCountAggregateOutputType | null;
    _min: CategoryMinAggregateOutputType | null;
    _max: CategoryMaxAggregateOutputType | null;
};
type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CategoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CategoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CategoryGroupByOutputType[P]>;
}>>;
export type CategoryWhereInput = {
    AND?: Prisma.CategoryWhereInput | Prisma.CategoryWhereInput[] | runtime.Types.Skip;
    OR?: Prisma.CategoryWhereInput[] | runtime.Types.Skip;
    NOT?: Prisma.CategoryWhereInput | Prisma.CategoryWhereInput[] | runtime.Types.Skip;
    id?: Prisma.StringFilter<"Category"> | string | runtime.Types.Skip;
    slug?: Prisma.StringFilter<"Category"> | string | runtime.Types.Skip;
    name?: Prisma.StringFilter<"Category"> | string | runtime.Types.Skip;
    description?: Prisma.StringNullableFilter<"Category"> | string | null | runtime.Types.Skip;
    icon?: Prisma.StringNullableFilter<"Category"> | string | null | runtime.Types.Skip;
    parentId?: Prisma.StringNullableFilter<"Category"> | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFilter<"Category"> | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFilter<"Category"> | Date | string | runtime.Types.Skip;
    parent?: Prisma.XOR<Prisma.CategoryNullableScalarRelationFilter, Prisma.CategoryWhereInput> | null | runtime.Types.Skip;
    children?: Prisma.CategoryListRelationFilter | runtime.Types.Skip;
    products?: Prisma.ProductListRelationFilter | runtime.Types.Skip;
};
export type CategoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    slug?: Prisma.SortOrder | runtime.Types.Skip;
    name?: Prisma.SortOrder | runtime.Types.Skip;
    description?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    icon?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    parentId?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
    parent?: Prisma.CategoryOrderByWithRelationInput | runtime.Types.Skip;
    children?: Prisma.CategoryOrderByRelationAggregateInput | runtime.Types.Skip;
    products?: Prisma.ProductOrderByRelationAggregateInput | runtime.Types.Skip;
    _relevance?: Prisma.CategoryOrderByRelevanceInput | runtime.Types.Skip;
};
export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string | runtime.Types.Skip;
    slug?: string | runtime.Types.Skip;
    AND?: Prisma.CategoryWhereInput | Prisma.CategoryWhereInput[] | runtime.Types.Skip;
    OR?: Prisma.CategoryWhereInput[] | runtime.Types.Skip;
    NOT?: Prisma.CategoryWhereInput | Prisma.CategoryWhereInput[] | runtime.Types.Skip;
    name?: Prisma.StringFilter<"Category"> | string | runtime.Types.Skip;
    description?: Prisma.StringNullableFilter<"Category"> | string | null | runtime.Types.Skip;
    icon?: Prisma.StringNullableFilter<"Category"> | string | null | runtime.Types.Skip;
    parentId?: Prisma.StringNullableFilter<"Category"> | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFilter<"Category"> | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFilter<"Category"> | Date | string | runtime.Types.Skip;
    parent?: Prisma.XOR<Prisma.CategoryNullableScalarRelationFilter, Prisma.CategoryWhereInput> | null | runtime.Types.Skip;
    children?: Prisma.CategoryListRelationFilter | runtime.Types.Skip;
    products?: Prisma.ProductListRelationFilter | runtime.Types.Skip;
}, "id" | "slug">;
export type CategoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    slug?: Prisma.SortOrder | runtime.Types.Skip;
    name?: Prisma.SortOrder | runtime.Types.Skip;
    description?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    icon?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    parentId?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
    _count?: Prisma.CategoryCountOrderByAggregateInput | runtime.Types.Skip;
    _max?: Prisma.CategoryMaxOrderByAggregateInput | runtime.Types.Skip;
    _min?: Prisma.CategoryMinOrderByAggregateInput | runtime.Types.Skip;
};
export type CategoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.CategoryScalarWhereWithAggregatesInput | Prisma.CategoryScalarWhereWithAggregatesInput[] | runtime.Types.Skip;
    OR?: Prisma.CategoryScalarWhereWithAggregatesInput[] | runtime.Types.Skip;
    NOT?: Prisma.CategoryScalarWhereWithAggregatesInput | Prisma.CategoryScalarWhereWithAggregatesInput[] | runtime.Types.Skip;
    id?: Prisma.StringWithAggregatesFilter<"Category"> | string | runtime.Types.Skip;
    slug?: Prisma.StringWithAggregatesFilter<"Category"> | string | runtime.Types.Skip;
    name?: Prisma.StringWithAggregatesFilter<"Category"> | string | runtime.Types.Skip;
    description?: Prisma.StringNullableWithAggregatesFilter<"Category"> | string | null | runtime.Types.Skip;
    icon?: Prisma.StringNullableWithAggregatesFilter<"Category"> | string | null | runtime.Types.Skip;
    parentId?: Prisma.StringNullableWithAggregatesFilter<"Category"> | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Category"> | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Category"> | Date | string | runtime.Types.Skip;
};
export type CategoryCreateInput = {
    id?: string | runtime.Types.Skip;
    slug: string;
    name: string;
    description?: string | null | runtime.Types.Skip;
    icon?: string | null | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
    parent?: Prisma.CategoryCreateNestedOneWithoutChildrenInput | runtime.Types.Skip;
    children?: Prisma.CategoryCreateNestedManyWithoutParentInput | runtime.Types.Skip;
    products?: Prisma.ProductCreateNestedManyWithoutCategoryInput | runtime.Types.Skip;
};
export type CategoryUncheckedCreateInput = {
    id?: string | runtime.Types.Skip;
    slug: string;
    name: string;
    description?: string | null | runtime.Types.Skip;
    icon?: string | null | runtime.Types.Skip;
    parentId?: string | null | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
    children?: Prisma.CategoryUncheckedCreateNestedManyWithoutParentInput | runtime.Types.Skip;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutCategoryInput | runtime.Types.Skip;
};
export type CategoryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    slug?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    name?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    parent?: Prisma.CategoryUpdateOneWithoutChildrenNestedInput | runtime.Types.Skip;
    children?: Prisma.CategoryUpdateManyWithoutParentNestedInput | runtime.Types.Skip;
    products?: Prisma.ProductUpdateManyWithoutCategoryNestedInput | runtime.Types.Skip;
};
export type CategoryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    slug?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    name?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    children?: Prisma.CategoryUncheckedUpdateManyWithoutParentNestedInput | runtime.Types.Skip;
    products?: Prisma.ProductUncheckedUpdateManyWithoutCategoryNestedInput | runtime.Types.Skip;
};
export type CategoryCreateManyInput = {
    id?: string | runtime.Types.Skip;
    slug: string;
    name: string;
    description?: string | null | runtime.Types.Skip;
    icon?: string | null | runtime.Types.Skip;
    parentId?: string | null | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
};
export type CategoryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    slug?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    name?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type CategoryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    slug?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    name?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type CategoryNullableScalarRelationFilter = {
    is?: Prisma.CategoryWhereInput | null | runtime.Types.Skip;
    isNot?: Prisma.CategoryWhereInput | null | runtime.Types.Skip;
};
export type CategoryListRelationFilter = {
    every?: Prisma.CategoryWhereInput | runtime.Types.Skip;
    some?: Prisma.CategoryWhereInput | runtime.Types.Skip;
    none?: Prisma.CategoryWhereInput | runtime.Types.Skip;
};
export type CategoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder | runtime.Types.Skip;
};
export type CategoryOrderByRelevanceInput = {
    fields: Prisma.CategoryOrderByRelevanceFieldEnum | Prisma.CategoryOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type CategoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    slug?: Prisma.SortOrder | runtime.Types.Skip;
    name?: Prisma.SortOrder | runtime.Types.Skip;
    description?: Prisma.SortOrder | runtime.Types.Skip;
    icon?: Prisma.SortOrder | runtime.Types.Skip;
    parentId?: Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
};
export type CategoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    slug?: Prisma.SortOrder | runtime.Types.Skip;
    name?: Prisma.SortOrder | runtime.Types.Skip;
    description?: Prisma.SortOrder | runtime.Types.Skip;
    icon?: Prisma.SortOrder | runtime.Types.Skip;
    parentId?: Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
};
export type CategoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    slug?: Prisma.SortOrder | runtime.Types.Skip;
    name?: Prisma.SortOrder | runtime.Types.Skip;
    description?: Prisma.SortOrder | runtime.Types.Skip;
    icon?: Prisma.SortOrder | runtime.Types.Skip;
    parentId?: Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
};
export type CategoryScalarRelationFilter = {
    is?: Prisma.CategoryWhereInput | runtime.Types.Skip;
    isNot?: Prisma.CategoryWhereInput | runtime.Types.Skip;
};
export type CategoryCreateNestedOneWithoutChildrenInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutChildrenInput, Prisma.CategoryUncheckedCreateWithoutChildrenInput> | runtime.Types.Skip;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutChildrenInput | runtime.Types.Skip;
    connect?: Prisma.CategoryWhereUniqueInput | runtime.Types.Skip;
};
export type CategoryCreateNestedManyWithoutParentInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutParentInput, Prisma.CategoryUncheckedCreateWithoutParentInput> | Prisma.CategoryCreateWithoutParentInput[] | Prisma.CategoryUncheckedCreateWithoutParentInput[] | runtime.Types.Skip;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutParentInput | Prisma.CategoryCreateOrConnectWithoutParentInput[] | runtime.Types.Skip;
    createMany?: Prisma.CategoryCreateManyParentInputEnvelope | runtime.Types.Skip;
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[] | runtime.Types.Skip;
};
export type CategoryUncheckedCreateNestedManyWithoutParentInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutParentInput, Prisma.CategoryUncheckedCreateWithoutParentInput> | Prisma.CategoryCreateWithoutParentInput[] | Prisma.CategoryUncheckedCreateWithoutParentInput[] | runtime.Types.Skip;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutParentInput | Prisma.CategoryCreateOrConnectWithoutParentInput[] | runtime.Types.Skip;
    createMany?: Prisma.CategoryCreateManyParentInputEnvelope | runtime.Types.Skip;
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[] | runtime.Types.Skip;
};
export type CategoryUpdateOneWithoutChildrenNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutChildrenInput, Prisma.CategoryUncheckedCreateWithoutChildrenInput> | runtime.Types.Skip;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutChildrenInput | runtime.Types.Skip;
    upsert?: Prisma.CategoryUpsertWithoutChildrenInput | runtime.Types.Skip;
    disconnect?: Prisma.CategoryWhereInput | boolean | runtime.Types.Skip;
    delete?: Prisma.CategoryWhereInput | boolean | runtime.Types.Skip;
    connect?: Prisma.CategoryWhereUniqueInput | runtime.Types.Skip;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CategoryUpdateToOneWithWhereWithoutChildrenInput, Prisma.CategoryUpdateWithoutChildrenInput>, Prisma.CategoryUncheckedUpdateWithoutChildrenInput> | runtime.Types.Skip;
};
export type CategoryUpdateManyWithoutParentNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutParentInput, Prisma.CategoryUncheckedCreateWithoutParentInput> | Prisma.CategoryCreateWithoutParentInput[] | Prisma.CategoryUncheckedCreateWithoutParentInput[] | runtime.Types.Skip;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutParentInput | Prisma.CategoryCreateOrConnectWithoutParentInput[] | runtime.Types.Skip;
    upsert?: Prisma.CategoryUpsertWithWhereUniqueWithoutParentInput | Prisma.CategoryUpsertWithWhereUniqueWithoutParentInput[] | runtime.Types.Skip;
    createMany?: Prisma.CategoryCreateManyParentInputEnvelope | runtime.Types.Skip;
    set?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[] | runtime.Types.Skip;
    disconnect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[] | runtime.Types.Skip;
    delete?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[] | runtime.Types.Skip;
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[] | runtime.Types.Skip;
    update?: Prisma.CategoryUpdateWithWhereUniqueWithoutParentInput | Prisma.CategoryUpdateWithWhereUniqueWithoutParentInput[] | runtime.Types.Skip;
    updateMany?: Prisma.CategoryUpdateManyWithWhereWithoutParentInput | Prisma.CategoryUpdateManyWithWhereWithoutParentInput[] | runtime.Types.Skip;
    deleteMany?: Prisma.CategoryScalarWhereInput | Prisma.CategoryScalarWhereInput[] | runtime.Types.Skip;
};
export type CategoryUncheckedUpdateManyWithoutParentNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutParentInput, Prisma.CategoryUncheckedCreateWithoutParentInput> | Prisma.CategoryCreateWithoutParentInput[] | Prisma.CategoryUncheckedCreateWithoutParentInput[] | runtime.Types.Skip;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutParentInput | Prisma.CategoryCreateOrConnectWithoutParentInput[] | runtime.Types.Skip;
    upsert?: Prisma.CategoryUpsertWithWhereUniqueWithoutParentInput | Prisma.CategoryUpsertWithWhereUniqueWithoutParentInput[] | runtime.Types.Skip;
    createMany?: Prisma.CategoryCreateManyParentInputEnvelope | runtime.Types.Skip;
    set?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[] | runtime.Types.Skip;
    disconnect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[] | runtime.Types.Skip;
    delete?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[] | runtime.Types.Skip;
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[] | runtime.Types.Skip;
    update?: Prisma.CategoryUpdateWithWhereUniqueWithoutParentInput | Prisma.CategoryUpdateWithWhereUniqueWithoutParentInput[] | runtime.Types.Skip;
    updateMany?: Prisma.CategoryUpdateManyWithWhereWithoutParentInput | Prisma.CategoryUpdateManyWithWhereWithoutParentInput[] | runtime.Types.Skip;
    deleteMany?: Prisma.CategoryScalarWhereInput | Prisma.CategoryScalarWhereInput[] | runtime.Types.Skip;
};
export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutProductsInput, Prisma.CategoryUncheckedCreateWithoutProductsInput> | runtime.Types.Skip;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutProductsInput | runtime.Types.Skip;
    connect?: Prisma.CategoryWhereUniqueInput | runtime.Types.Skip;
};
export type CategoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutProductsInput, Prisma.CategoryUncheckedCreateWithoutProductsInput> | runtime.Types.Skip;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutProductsInput | runtime.Types.Skip;
    upsert?: Prisma.CategoryUpsertWithoutProductsInput | runtime.Types.Skip;
    connect?: Prisma.CategoryWhereUniqueInput | runtime.Types.Skip;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CategoryUpdateToOneWithWhereWithoutProductsInput, Prisma.CategoryUpdateWithoutProductsInput>, Prisma.CategoryUncheckedUpdateWithoutProductsInput> | runtime.Types.Skip;
};
export type CategoryCreateWithoutChildrenInput = {
    id?: string | runtime.Types.Skip;
    slug: string;
    name: string;
    description?: string | null | runtime.Types.Skip;
    icon?: string | null | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
    parent?: Prisma.CategoryCreateNestedOneWithoutChildrenInput | runtime.Types.Skip;
    products?: Prisma.ProductCreateNestedManyWithoutCategoryInput | runtime.Types.Skip;
};
export type CategoryUncheckedCreateWithoutChildrenInput = {
    id?: string | runtime.Types.Skip;
    slug: string;
    name: string;
    description?: string | null | runtime.Types.Skip;
    icon?: string | null | runtime.Types.Skip;
    parentId?: string | null | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutCategoryInput | runtime.Types.Skip;
};
export type CategoryCreateOrConnectWithoutChildrenInput = {
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutChildrenInput, Prisma.CategoryUncheckedCreateWithoutChildrenInput>;
};
export type CategoryCreateWithoutParentInput = {
    id?: string | runtime.Types.Skip;
    slug: string;
    name: string;
    description?: string | null | runtime.Types.Skip;
    icon?: string | null | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
    children?: Prisma.CategoryCreateNestedManyWithoutParentInput | runtime.Types.Skip;
    products?: Prisma.ProductCreateNestedManyWithoutCategoryInput | runtime.Types.Skip;
};
export type CategoryUncheckedCreateWithoutParentInput = {
    id?: string | runtime.Types.Skip;
    slug: string;
    name: string;
    description?: string | null | runtime.Types.Skip;
    icon?: string | null | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
    children?: Prisma.CategoryUncheckedCreateNestedManyWithoutParentInput | runtime.Types.Skip;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutCategoryInput | runtime.Types.Skip;
};
export type CategoryCreateOrConnectWithoutParentInput = {
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutParentInput, Prisma.CategoryUncheckedCreateWithoutParentInput>;
};
export type CategoryCreateManyParentInputEnvelope = {
    data: Prisma.CategoryCreateManyParentInput | Prisma.CategoryCreateManyParentInput[];
    skipDuplicates?: boolean | runtime.Types.Skip;
};
export type CategoryUpsertWithoutChildrenInput = {
    update: Prisma.XOR<Prisma.CategoryUpdateWithoutChildrenInput, Prisma.CategoryUncheckedUpdateWithoutChildrenInput>;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutChildrenInput, Prisma.CategoryUncheckedCreateWithoutChildrenInput>;
    where?: Prisma.CategoryWhereInput | runtime.Types.Skip;
};
export type CategoryUpdateToOneWithWhereWithoutChildrenInput = {
    where?: Prisma.CategoryWhereInput | runtime.Types.Skip;
    data: Prisma.XOR<Prisma.CategoryUpdateWithoutChildrenInput, Prisma.CategoryUncheckedUpdateWithoutChildrenInput>;
};
export type CategoryUpdateWithoutChildrenInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    slug?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    name?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    parent?: Prisma.CategoryUpdateOneWithoutChildrenNestedInput | runtime.Types.Skip;
    products?: Prisma.ProductUpdateManyWithoutCategoryNestedInput | runtime.Types.Skip;
};
export type CategoryUncheckedUpdateWithoutChildrenInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    slug?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    name?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    products?: Prisma.ProductUncheckedUpdateManyWithoutCategoryNestedInput | runtime.Types.Skip;
};
export type CategoryUpsertWithWhereUniqueWithoutParentInput = {
    where: Prisma.CategoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.CategoryUpdateWithoutParentInput, Prisma.CategoryUncheckedUpdateWithoutParentInput>;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutParentInput, Prisma.CategoryUncheckedCreateWithoutParentInput>;
};
export type CategoryUpdateWithWhereUniqueWithoutParentInput = {
    where: Prisma.CategoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.CategoryUpdateWithoutParentInput, Prisma.CategoryUncheckedUpdateWithoutParentInput>;
};
export type CategoryUpdateManyWithWhereWithoutParentInput = {
    where: Prisma.CategoryScalarWhereInput;
    data: Prisma.XOR<Prisma.CategoryUpdateManyMutationInput, Prisma.CategoryUncheckedUpdateManyWithoutParentInput>;
};
export type CategoryScalarWhereInput = {
    AND?: Prisma.CategoryScalarWhereInput | Prisma.CategoryScalarWhereInput[] | runtime.Types.Skip;
    OR?: Prisma.CategoryScalarWhereInput[] | runtime.Types.Skip;
    NOT?: Prisma.CategoryScalarWhereInput | Prisma.CategoryScalarWhereInput[] | runtime.Types.Skip;
    id?: Prisma.StringFilter<"Category"> | string | runtime.Types.Skip;
    slug?: Prisma.StringFilter<"Category"> | string | runtime.Types.Skip;
    name?: Prisma.StringFilter<"Category"> | string | runtime.Types.Skip;
    description?: Prisma.StringNullableFilter<"Category"> | string | null | runtime.Types.Skip;
    icon?: Prisma.StringNullableFilter<"Category"> | string | null | runtime.Types.Skip;
    parentId?: Prisma.StringNullableFilter<"Category"> | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFilter<"Category"> | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFilter<"Category"> | Date | string | runtime.Types.Skip;
};
export type CategoryCreateWithoutProductsInput = {
    id?: string | runtime.Types.Skip;
    slug: string;
    name: string;
    description?: string | null | runtime.Types.Skip;
    icon?: string | null | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
    parent?: Prisma.CategoryCreateNestedOneWithoutChildrenInput | runtime.Types.Skip;
    children?: Prisma.CategoryCreateNestedManyWithoutParentInput | runtime.Types.Skip;
};
export type CategoryUncheckedCreateWithoutProductsInput = {
    id?: string | runtime.Types.Skip;
    slug: string;
    name: string;
    description?: string | null | runtime.Types.Skip;
    icon?: string | null | runtime.Types.Skip;
    parentId?: string | null | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
    children?: Prisma.CategoryUncheckedCreateNestedManyWithoutParentInput | runtime.Types.Skip;
};
export type CategoryCreateOrConnectWithoutProductsInput = {
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutProductsInput, Prisma.CategoryUncheckedCreateWithoutProductsInput>;
};
export type CategoryUpsertWithoutProductsInput = {
    update: Prisma.XOR<Prisma.CategoryUpdateWithoutProductsInput, Prisma.CategoryUncheckedUpdateWithoutProductsInput>;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutProductsInput, Prisma.CategoryUncheckedCreateWithoutProductsInput>;
    where?: Prisma.CategoryWhereInput | runtime.Types.Skip;
};
export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: Prisma.CategoryWhereInput | runtime.Types.Skip;
    data: Prisma.XOR<Prisma.CategoryUpdateWithoutProductsInput, Prisma.CategoryUncheckedUpdateWithoutProductsInput>;
};
export type CategoryUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    slug?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    name?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    parent?: Prisma.CategoryUpdateOneWithoutChildrenNestedInput | runtime.Types.Skip;
    children?: Prisma.CategoryUpdateManyWithoutParentNestedInput | runtime.Types.Skip;
};
export type CategoryUncheckedUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    slug?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    name?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    children?: Prisma.CategoryUncheckedUpdateManyWithoutParentNestedInput | runtime.Types.Skip;
};
export type CategoryCreateManyParentInput = {
    id?: string | runtime.Types.Skip;
    slug: string;
    name: string;
    description?: string | null | runtime.Types.Skip;
    icon?: string | null | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
};
export type CategoryUpdateWithoutParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    slug?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    name?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    children?: Prisma.CategoryUpdateManyWithoutParentNestedInput | runtime.Types.Skip;
    products?: Prisma.ProductUpdateManyWithoutCategoryNestedInput | runtime.Types.Skip;
};
export type CategoryUncheckedUpdateWithoutParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    slug?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    name?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    children?: Prisma.CategoryUncheckedUpdateManyWithoutParentNestedInput | runtime.Types.Skip;
    products?: Prisma.ProductUncheckedUpdateManyWithoutCategoryNestedInput | runtime.Types.Skip;
};
export type CategoryUncheckedUpdateManyWithoutParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    slug?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    name?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type CategoryCountOutputType = {
    children: number;
    products: number;
};
export type CategoryCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    children?: boolean | CategoryCountOutputTypeCountChildrenArgs;
    products?: boolean | CategoryCountOutputTypeCountProductsArgs;
};
export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategoryCountOutputTypeSelect<ExtArgs> | null;
};
export type CategoryCountOutputTypeCountChildrenArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CategoryWhereInput | runtime.Types.Skip;
};
export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductWhereInput | runtime.Types.Skip;
};
export type CategorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean | runtime.Types.Skip;
    slug?: boolean | runtime.Types.Skip;
    name?: boolean | runtime.Types.Skip;
    description?: boolean | runtime.Types.Skip;
    icon?: boolean | runtime.Types.Skip;
    parentId?: boolean | runtime.Types.Skip;
    createdAt?: boolean | runtime.Types.Skip;
    updatedAt?: boolean | runtime.Types.Skip;
    parent?: boolean | Prisma.Category$parentArgs<ExtArgs> | runtime.Types.Skip;
    children?: boolean | Prisma.Category$childrenArgs<ExtArgs> | runtime.Types.Skip;
    products?: boolean | Prisma.Category$productsArgs<ExtArgs> | runtime.Types.Skip;
    _count?: boolean | Prisma.CategoryCountOutputTypeDefaultArgs<ExtArgs> | runtime.Types.Skip;
}, ExtArgs["result"]["category"]>;
export type CategorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean | runtime.Types.Skip;
    slug?: boolean | runtime.Types.Skip;
    name?: boolean | runtime.Types.Skip;
    description?: boolean | runtime.Types.Skip;
    icon?: boolean | runtime.Types.Skip;
    parentId?: boolean | runtime.Types.Skip;
    createdAt?: boolean | runtime.Types.Skip;
    updatedAt?: boolean | runtime.Types.Skip;
    parent?: boolean | Prisma.Category$parentArgs<ExtArgs> | runtime.Types.Skip;
}, ExtArgs["result"]["category"]>;
export type CategorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean | runtime.Types.Skip;
    slug?: boolean | runtime.Types.Skip;
    name?: boolean | runtime.Types.Skip;
    description?: boolean | runtime.Types.Skip;
    icon?: boolean | runtime.Types.Skip;
    parentId?: boolean | runtime.Types.Skip;
    createdAt?: boolean | runtime.Types.Skip;
    updatedAt?: boolean | runtime.Types.Skip;
    parent?: boolean | Prisma.Category$parentArgs<ExtArgs> | runtime.Types.Skip;
}, ExtArgs["result"]["category"]>;
export type CategorySelectScalar = {
    id?: boolean | runtime.Types.Skip;
    slug?: boolean | runtime.Types.Skip;
    name?: boolean | runtime.Types.Skip;
    description?: boolean | runtime.Types.Skip;
    icon?: boolean | runtime.Types.Skip;
    parentId?: boolean | runtime.Types.Skip;
    createdAt?: boolean | runtime.Types.Skip;
    updatedAt?: boolean | runtime.Types.Skip;
};
export type CategoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "slug" | "name" | "description" | "icon" | "parentId" | "createdAt" | "updatedAt", ExtArgs["result"]["category"], runtime.Types.Skip>;
export type CategoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    parent?: boolean | Prisma.Category$parentArgs<ExtArgs> | runtime.Types.Skip;
    children?: boolean | Prisma.Category$childrenArgs<ExtArgs> | runtime.Types.Skip;
    products?: boolean | Prisma.Category$productsArgs<ExtArgs> | runtime.Types.Skip;
    _count?: boolean | Prisma.CategoryCountOutputTypeDefaultArgs<ExtArgs> | runtime.Types.Skip;
};
export type CategoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    parent?: boolean | Prisma.Category$parentArgs<ExtArgs> | runtime.Types.Skip;
};
export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    parent?: boolean | Prisma.Category$parentArgs<ExtArgs> | runtime.Types.Skip;
};
export type $CategoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Category";
    objects: {
        parent: Prisma.$CategoryPayload<ExtArgs> | null;
        children: Prisma.$CategoryPayload<ExtArgs>[];
        products: Prisma.$ProductPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        slug: string;
        name: string;
        description: string | null;
        icon: string | null;
        parentId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["category"]>;
    composites: {};
};
export type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CategoryPayload, S>;
export type CategoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
    select?: CategoryCountAggregateInputType | true;
};
export interface CategoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Category'];
        meta: {
            name: 'Category';
        };
    };
    findUnique<T extends CategoryFindUniqueArgs>(args: Prisma.SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CategoryFindFirstArgs>(args?: Prisma.SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CategoryFindManyArgs>(args?: Prisma.SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CategoryCreateArgs>(args: Prisma.SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CategoryCreateManyArgs>(args?: Prisma.SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CategoryDeleteArgs>(args: Prisma.SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CategoryUpdateArgs>(args: Prisma.SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CategoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CategoryUpdateManyArgs>(args: Prisma.SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CategoryUpsertArgs>(args: Prisma.SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CategoryCountArgs>(args?: Prisma.Subset<T, CategoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CategoryCountAggregateOutputType> : number>;
    aggregate<T extends CategoryAggregateArgs>(args: Prisma.Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>;
    groupBy<T extends CategoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CategoryGroupByArgs['orderBy'];
    } : {
        orderBy?: CategoryGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CategoryFieldRefs;
}
export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    parent<T extends Prisma.Category$parentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Category$parentArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    children<T extends Prisma.Category$childrenArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Category$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    products<T extends Prisma.Category$productsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CategoryFieldRefs {
    readonly id: Prisma.FieldRef<"Category", 'String'>;
    readonly slug: Prisma.FieldRef<"Category", 'String'>;
    readonly name: Prisma.FieldRef<"Category", 'String'>;
    readonly description: Prisma.FieldRef<"Category", 'String'>;
    readonly icon: Prisma.FieldRef<"Category", 'String'>;
    readonly parentId: Prisma.FieldRef<"Category", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Category", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Category", 'DateTime'>;
}
export type CategoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where: Prisma.CategoryWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type CategoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where: Prisma.CategoryWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type CategoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where?: Prisma.CategoryWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.CategoryOrderByWithRelationInput | Prisma.CategoryOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.CategoryWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.CategoryScalarFieldEnum | Prisma.CategoryScalarFieldEnum[] | runtime.Types.Skip;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type CategoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where?: Prisma.CategoryWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.CategoryOrderByWithRelationInput | Prisma.CategoryOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.CategoryWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.CategoryScalarFieldEnum | Prisma.CategoryScalarFieldEnum[] | runtime.Types.Skip;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type CategoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where?: Prisma.CategoryWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.CategoryOrderByWithRelationInput | Prisma.CategoryOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.CategoryWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.CategoryScalarFieldEnum | Prisma.CategoryScalarFieldEnum[] | runtime.Types.Skip;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type CategoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CategoryCreateInput, Prisma.CategoryUncheckedCreateInput>;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type CategoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CategoryCreateManyInput | Prisma.CategoryCreateManyInput[];
    skipDuplicates?: boolean | runtime.Types.Skip;
};
export type CategoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    data: Prisma.CategoryCreateManyInput | Prisma.CategoryCreateManyInput[];
    skipDuplicates?: boolean | runtime.Types.Skip;
    include?: Prisma.CategoryIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CategoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CategoryUpdateInput, Prisma.CategoryUncheckedUpdateInput>;
    where: Prisma.CategoryWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type CategoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CategoryUpdateManyMutationInput, Prisma.CategoryUncheckedUpdateManyInput>;
    where?: Prisma.CategoryWhereInput | runtime.Types.Skip;
    limit?: number | runtime.Types.Skip;
};
export type CategoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CategoryUpdateManyMutationInput, Prisma.CategoryUncheckedUpdateManyInput>;
    where?: Prisma.CategoryWhereInput | runtime.Types.Skip;
    limit?: number | runtime.Types.Skip;
    include?: Prisma.CategoryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CategoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateInput, Prisma.CategoryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CategoryUpdateInput, Prisma.CategoryUncheckedUpdateInput>;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type CategoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where: Prisma.CategoryWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type CategoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CategoryWhereInput | runtime.Types.Skip;
    limit?: number | runtime.Types.Skip;
};
export type Category$parentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where?: Prisma.CategoryWhereInput | runtime.Types.Skip;
};
export type Category$childrenArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where?: Prisma.CategoryWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.CategoryOrderByWithRelationInput | Prisma.CategoryOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.CategoryWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.CategoryScalarFieldEnum | Prisma.CategoryScalarFieldEnum[] | runtime.Types.Skip;
};
export type Category$productsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where?: Prisma.ProductWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.ProductWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.ProductScalarFieldEnum | Prisma.ProductScalarFieldEnum[] | runtime.Types.Skip;
};
export type CategoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
};
export {};
