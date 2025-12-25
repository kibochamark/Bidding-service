import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SellerDetailsModel = runtime.Types.Result.DefaultSelection<Prisma.$SellerDetailsPayload>;
export type AggregateSellerDetails = {
    _count: SellerDetailsCountAggregateOutputType | null;
    _avg: SellerDetailsAvgAggregateOutputType | null;
    _sum: SellerDetailsSumAggregateOutputType | null;
    _min: SellerDetailsMinAggregateOutputType | null;
    _max: SellerDetailsMaxAggregateOutputType | null;
};
export type SellerDetailsAvgAggregateOutputType = {
    rating: runtime.Decimal | null;
    totalSales: number | null;
    responseRate: runtime.Decimal | null;
};
export type SellerDetailsSumAggregateOutputType = {
    rating: runtime.Decimal | null;
    totalSales: number | null;
    responseRate: runtime.Decimal | null;
};
export type SellerDetailsMinAggregateOutputType = {
    id: string | null;
    companyName: string | null;
    taxId: string | null;
    rating: runtime.Decimal | null;
    totalSales: number | null;
    accountId: string | null;
    responseRate: runtime.Decimal | null;
};
export type SellerDetailsMaxAggregateOutputType = {
    id: string | null;
    companyName: string | null;
    taxId: string | null;
    rating: runtime.Decimal | null;
    totalSales: number | null;
    accountId: string | null;
    responseRate: runtime.Decimal | null;
};
export type SellerDetailsCountAggregateOutputType = {
    id: number;
    companyName: number;
    taxId: number;
    rating: number;
    totalSales: number;
    accountId: number;
    responseRate: number;
    _all: number;
};
export type SellerDetailsAvgAggregateInputType = {
    rating?: true | runtime.Types.Skip;
    totalSales?: true | runtime.Types.Skip;
    responseRate?: true | runtime.Types.Skip;
};
export type SellerDetailsSumAggregateInputType = {
    rating?: true | runtime.Types.Skip;
    totalSales?: true | runtime.Types.Skip;
    responseRate?: true | runtime.Types.Skip;
};
export type SellerDetailsMinAggregateInputType = {
    id?: true | runtime.Types.Skip;
    companyName?: true | runtime.Types.Skip;
    taxId?: true | runtime.Types.Skip;
    rating?: true | runtime.Types.Skip;
    totalSales?: true | runtime.Types.Skip;
    accountId?: true | runtime.Types.Skip;
    responseRate?: true | runtime.Types.Skip;
};
export type SellerDetailsMaxAggregateInputType = {
    id?: true | runtime.Types.Skip;
    companyName?: true | runtime.Types.Skip;
    taxId?: true | runtime.Types.Skip;
    rating?: true | runtime.Types.Skip;
    totalSales?: true | runtime.Types.Skip;
    accountId?: true | runtime.Types.Skip;
    responseRate?: true | runtime.Types.Skip;
};
export type SellerDetailsCountAggregateInputType = {
    id?: true | runtime.Types.Skip;
    companyName?: true | runtime.Types.Skip;
    taxId?: true | runtime.Types.Skip;
    rating?: true | runtime.Types.Skip;
    totalSales?: true | runtime.Types.Skip;
    accountId?: true | runtime.Types.Skip;
    responseRate?: true | runtime.Types.Skip;
    _all?: true | runtime.Types.Skip;
};
export type SellerDetailsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SellerDetailsWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.SellerDetailsOrderByWithRelationInput | Prisma.SellerDetailsOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.SellerDetailsWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    _count?: true | SellerDetailsCountAggregateInputType;
    _avg?: SellerDetailsAvgAggregateInputType;
    _sum?: SellerDetailsSumAggregateInputType;
    _min?: SellerDetailsMinAggregateInputType;
    _max?: SellerDetailsMaxAggregateInputType;
};
export type GetSellerDetailsAggregateType<T extends SellerDetailsAggregateArgs> = {
    [P in keyof T & keyof AggregateSellerDetails]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSellerDetails[P]> : Prisma.GetScalarType<T[P], AggregateSellerDetails[P]>;
};
export type SellerDetailsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SellerDetailsWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.SellerDetailsOrderByWithAggregationInput | Prisma.SellerDetailsOrderByWithAggregationInput[] | runtime.Types.Skip;
    by: Prisma.SellerDetailsScalarFieldEnum[] | Prisma.SellerDetailsScalarFieldEnum;
    having?: Prisma.SellerDetailsScalarWhereWithAggregatesInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    _count?: SellerDetailsCountAggregateInputType | true;
    _avg?: SellerDetailsAvgAggregateInputType;
    _sum?: SellerDetailsSumAggregateInputType;
    _min?: SellerDetailsMinAggregateInputType;
    _max?: SellerDetailsMaxAggregateInputType;
};
export type SellerDetailsGroupByOutputType = {
    id: string;
    companyName: string;
    taxId: string | null;
    rating: runtime.Decimal;
    totalSales: number;
    accountId: string;
    responseRate: runtime.Decimal | null;
    _count: SellerDetailsCountAggregateOutputType | null;
    _avg: SellerDetailsAvgAggregateOutputType | null;
    _sum: SellerDetailsSumAggregateOutputType | null;
    _min: SellerDetailsMinAggregateOutputType | null;
    _max: SellerDetailsMaxAggregateOutputType | null;
};
type GetSellerDetailsGroupByPayload<T extends SellerDetailsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SellerDetailsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SellerDetailsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SellerDetailsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SellerDetailsGroupByOutputType[P]>;
}>>;
export type SellerDetailsWhereInput = {
    AND?: Prisma.SellerDetailsWhereInput | Prisma.SellerDetailsWhereInput[] | runtime.Types.Skip;
    OR?: Prisma.SellerDetailsWhereInput[] | runtime.Types.Skip;
    NOT?: Prisma.SellerDetailsWhereInput | Prisma.SellerDetailsWhereInput[] | runtime.Types.Skip;
    id?: Prisma.StringFilter<"SellerDetails"> | string | runtime.Types.Skip;
    companyName?: Prisma.StringFilter<"SellerDetails"> | string | runtime.Types.Skip;
    taxId?: Prisma.StringNullableFilter<"SellerDetails"> | string | null | runtime.Types.Skip;
    rating?: Prisma.DecimalFilter<"SellerDetails"> | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    totalSales?: Prisma.IntFilter<"SellerDetails"> | number | runtime.Types.Skip;
    accountId?: Prisma.StringFilter<"SellerDetails"> | string | runtime.Types.Skip;
    responseRate?: Prisma.DecimalNullableFilter<"SellerDetails"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput> | runtime.Types.Skip;
};
export type SellerDetailsOrderByWithRelationInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    companyName?: Prisma.SortOrder | runtime.Types.Skip;
    taxId?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    rating?: Prisma.SortOrder | runtime.Types.Skip;
    totalSales?: Prisma.SortOrder | runtime.Types.Skip;
    accountId?: Prisma.SortOrder | runtime.Types.Skip;
    responseRate?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    account?: Prisma.AccountOrderByWithRelationInput | runtime.Types.Skip;
    _relevance?: Prisma.SellerDetailsOrderByRelevanceInput | runtime.Types.Skip;
};
export type SellerDetailsWhereUniqueInput = Prisma.AtLeast<{
    id?: string | runtime.Types.Skip;
    accountId?: string | runtime.Types.Skip;
    AND?: Prisma.SellerDetailsWhereInput | Prisma.SellerDetailsWhereInput[] | runtime.Types.Skip;
    OR?: Prisma.SellerDetailsWhereInput[] | runtime.Types.Skip;
    NOT?: Prisma.SellerDetailsWhereInput | Prisma.SellerDetailsWhereInput[] | runtime.Types.Skip;
    companyName?: Prisma.StringFilter<"SellerDetails"> | string | runtime.Types.Skip;
    taxId?: Prisma.StringNullableFilter<"SellerDetails"> | string | null | runtime.Types.Skip;
    rating?: Prisma.DecimalFilter<"SellerDetails"> | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    totalSales?: Prisma.IntFilter<"SellerDetails"> | number | runtime.Types.Skip;
    responseRate?: Prisma.DecimalNullableFilter<"SellerDetails"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput> | runtime.Types.Skip;
}, "id" | "accountId">;
export type SellerDetailsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    companyName?: Prisma.SortOrder | runtime.Types.Skip;
    taxId?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    rating?: Prisma.SortOrder | runtime.Types.Skip;
    totalSales?: Prisma.SortOrder | runtime.Types.Skip;
    accountId?: Prisma.SortOrder | runtime.Types.Skip;
    responseRate?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    _count?: Prisma.SellerDetailsCountOrderByAggregateInput | runtime.Types.Skip;
    _avg?: Prisma.SellerDetailsAvgOrderByAggregateInput | runtime.Types.Skip;
    _max?: Prisma.SellerDetailsMaxOrderByAggregateInput | runtime.Types.Skip;
    _min?: Prisma.SellerDetailsMinOrderByAggregateInput | runtime.Types.Skip;
    _sum?: Prisma.SellerDetailsSumOrderByAggregateInput | runtime.Types.Skip;
};
export type SellerDetailsScalarWhereWithAggregatesInput = {
    AND?: Prisma.SellerDetailsScalarWhereWithAggregatesInput | Prisma.SellerDetailsScalarWhereWithAggregatesInput[] | runtime.Types.Skip;
    OR?: Prisma.SellerDetailsScalarWhereWithAggregatesInput[] | runtime.Types.Skip;
    NOT?: Prisma.SellerDetailsScalarWhereWithAggregatesInput | Prisma.SellerDetailsScalarWhereWithAggregatesInput[] | runtime.Types.Skip;
    id?: Prisma.StringWithAggregatesFilter<"SellerDetails"> | string | runtime.Types.Skip;
    companyName?: Prisma.StringWithAggregatesFilter<"SellerDetails"> | string | runtime.Types.Skip;
    taxId?: Prisma.StringNullableWithAggregatesFilter<"SellerDetails"> | string | null | runtime.Types.Skip;
    rating?: Prisma.DecimalWithAggregatesFilter<"SellerDetails"> | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    totalSales?: Prisma.IntWithAggregatesFilter<"SellerDetails"> | number | runtime.Types.Skip;
    accountId?: Prisma.StringWithAggregatesFilter<"SellerDetails"> | string | runtime.Types.Skip;
    responseRate?: Prisma.DecimalNullableWithAggregatesFilter<"SellerDetails"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
};
export type SellerDetailsCreateInput = {
    id?: string | runtime.Types.Skip;
    companyName: string;
    taxId?: string | null | runtime.Types.Skip;
    rating?: runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    totalSales?: number | runtime.Types.Skip;
    responseRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    account: Prisma.AccountCreateNestedOneWithoutSellerProfileInput;
};
export type SellerDetailsUncheckedCreateInput = {
    id?: string | runtime.Types.Skip;
    companyName: string;
    taxId?: string | null | runtime.Types.Skip;
    rating?: runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    totalSales?: number | runtime.Types.Skip;
    accountId: string;
    responseRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
};
export type SellerDetailsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    taxId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    totalSales?: Prisma.IntFieldUpdateOperationsInput | number | runtime.Types.Skip;
    responseRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    account?: Prisma.AccountUpdateOneRequiredWithoutSellerProfileNestedInput | runtime.Types.Skip;
};
export type SellerDetailsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    taxId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    totalSales?: Prisma.IntFieldUpdateOperationsInput | number | runtime.Types.Skip;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    responseRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
};
export type SellerDetailsCreateManyInput = {
    id?: string | runtime.Types.Skip;
    companyName: string;
    taxId?: string | null | runtime.Types.Skip;
    rating?: runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    totalSales?: number | runtime.Types.Skip;
    accountId: string;
    responseRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
};
export type SellerDetailsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    taxId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    totalSales?: Prisma.IntFieldUpdateOperationsInput | number | runtime.Types.Skip;
    responseRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
};
export type SellerDetailsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    taxId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    totalSales?: Prisma.IntFieldUpdateOperationsInput | number | runtime.Types.Skip;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    responseRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
};
export type SellerDetailsNullableScalarRelationFilter = {
    is?: Prisma.SellerDetailsWhereInput | null | runtime.Types.Skip;
    isNot?: Prisma.SellerDetailsWhereInput | null | runtime.Types.Skip;
};
export type SellerDetailsOrderByRelevanceInput = {
    fields: Prisma.SellerDetailsOrderByRelevanceFieldEnum | Prisma.SellerDetailsOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type SellerDetailsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    companyName?: Prisma.SortOrder | runtime.Types.Skip;
    taxId?: Prisma.SortOrder | runtime.Types.Skip;
    rating?: Prisma.SortOrder | runtime.Types.Skip;
    totalSales?: Prisma.SortOrder | runtime.Types.Skip;
    accountId?: Prisma.SortOrder | runtime.Types.Skip;
    responseRate?: Prisma.SortOrder | runtime.Types.Skip;
};
export type SellerDetailsAvgOrderByAggregateInput = {
    rating?: Prisma.SortOrder | runtime.Types.Skip;
    totalSales?: Prisma.SortOrder | runtime.Types.Skip;
    responseRate?: Prisma.SortOrder | runtime.Types.Skip;
};
export type SellerDetailsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    companyName?: Prisma.SortOrder | runtime.Types.Skip;
    taxId?: Prisma.SortOrder | runtime.Types.Skip;
    rating?: Prisma.SortOrder | runtime.Types.Skip;
    totalSales?: Prisma.SortOrder | runtime.Types.Skip;
    accountId?: Prisma.SortOrder | runtime.Types.Skip;
    responseRate?: Prisma.SortOrder | runtime.Types.Skip;
};
export type SellerDetailsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    companyName?: Prisma.SortOrder | runtime.Types.Skip;
    taxId?: Prisma.SortOrder | runtime.Types.Skip;
    rating?: Prisma.SortOrder | runtime.Types.Skip;
    totalSales?: Prisma.SortOrder | runtime.Types.Skip;
    accountId?: Prisma.SortOrder | runtime.Types.Skip;
    responseRate?: Prisma.SortOrder | runtime.Types.Skip;
};
export type SellerDetailsSumOrderByAggregateInput = {
    rating?: Prisma.SortOrder | runtime.Types.Skip;
    totalSales?: Prisma.SortOrder | runtime.Types.Skip;
    responseRate?: Prisma.SortOrder | runtime.Types.Skip;
};
export type SellerDetailsCreateNestedOneWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.SellerDetailsCreateWithoutAccountInput, Prisma.SellerDetailsUncheckedCreateWithoutAccountInput> | runtime.Types.Skip;
    connectOrCreate?: Prisma.SellerDetailsCreateOrConnectWithoutAccountInput | runtime.Types.Skip;
    connect?: Prisma.SellerDetailsWhereUniqueInput | runtime.Types.Skip;
};
export type SellerDetailsUncheckedCreateNestedOneWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.SellerDetailsCreateWithoutAccountInput, Prisma.SellerDetailsUncheckedCreateWithoutAccountInput> | runtime.Types.Skip;
    connectOrCreate?: Prisma.SellerDetailsCreateOrConnectWithoutAccountInput | runtime.Types.Skip;
    connect?: Prisma.SellerDetailsWhereUniqueInput | runtime.Types.Skip;
};
export type SellerDetailsUpdateOneWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.SellerDetailsCreateWithoutAccountInput, Prisma.SellerDetailsUncheckedCreateWithoutAccountInput> | runtime.Types.Skip;
    connectOrCreate?: Prisma.SellerDetailsCreateOrConnectWithoutAccountInput | runtime.Types.Skip;
    upsert?: Prisma.SellerDetailsUpsertWithoutAccountInput | runtime.Types.Skip;
    disconnect?: Prisma.SellerDetailsWhereInput | boolean | runtime.Types.Skip;
    delete?: Prisma.SellerDetailsWhereInput | boolean | runtime.Types.Skip;
    connect?: Prisma.SellerDetailsWhereUniqueInput | runtime.Types.Skip;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SellerDetailsUpdateToOneWithWhereWithoutAccountInput, Prisma.SellerDetailsUpdateWithoutAccountInput>, Prisma.SellerDetailsUncheckedUpdateWithoutAccountInput> | runtime.Types.Skip;
};
export type SellerDetailsUncheckedUpdateOneWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.SellerDetailsCreateWithoutAccountInput, Prisma.SellerDetailsUncheckedCreateWithoutAccountInput> | runtime.Types.Skip;
    connectOrCreate?: Prisma.SellerDetailsCreateOrConnectWithoutAccountInput | runtime.Types.Skip;
    upsert?: Prisma.SellerDetailsUpsertWithoutAccountInput | runtime.Types.Skip;
    disconnect?: Prisma.SellerDetailsWhereInput | boolean | runtime.Types.Skip;
    delete?: Prisma.SellerDetailsWhereInput | boolean | runtime.Types.Skip;
    connect?: Prisma.SellerDetailsWhereUniqueInput | runtime.Types.Skip;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SellerDetailsUpdateToOneWithWhereWithoutAccountInput, Prisma.SellerDetailsUpdateWithoutAccountInput>, Prisma.SellerDetailsUncheckedUpdateWithoutAccountInput> | runtime.Types.Skip;
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
};
export type IntFieldUpdateOperationsInput = {
    set?: number | runtime.Types.Skip;
    increment?: number | runtime.Types.Skip;
    decrement?: number | runtime.Types.Skip;
    multiply?: number | runtime.Types.Skip;
    divide?: number | runtime.Types.Skip;
};
export type NullableDecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
};
export type SellerDetailsCreateWithoutAccountInput = {
    id?: string | runtime.Types.Skip;
    companyName: string;
    taxId?: string | null | runtime.Types.Skip;
    rating?: runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    totalSales?: number | runtime.Types.Skip;
    responseRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
};
export type SellerDetailsUncheckedCreateWithoutAccountInput = {
    id?: string | runtime.Types.Skip;
    companyName: string;
    taxId?: string | null | runtime.Types.Skip;
    rating?: runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    totalSales?: number | runtime.Types.Skip;
    responseRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
};
export type SellerDetailsCreateOrConnectWithoutAccountInput = {
    where: Prisma.SellerDetailsWhereUniqueInput;
    create: Prisma.XOR<Prisma.SellerDetailsCreateWithoutAccountInput, Prisma.SellerDetailsUncheckedCreateWithoutAccountInput>;
};
export type SellerDetailsUpsertWithoutAccountInput = {
    update: Prisma.XOR<Prisma.SellerDetailsUpdateWithoutAccountInput, Prisma.SellerDetailsUncheckedUpdateWithoutAccountInput>;
    create: Prisma.XOR<Prisma.SellerDetailsCreateWithoutAccountInput, Prisma.SellerDetailsUncheckedCreateWithoutAccountInput>;
    where?: Prisma.SellerDetailsWhereInput | runtime.Types.Skip;
};
export type SellerDetailsUpdateToOneWithWhereWithoutAccountInput = {
    where?: Prisma.SellerDetailsWhereInput | runtime.Types.Skip;
    data: Prisma.XOR<Prisma.SellerDetailsUpdateWithoutAccountInput, Prisma.SellerDetailsUncheckedUpdateWithoutAccountInput>;
};
export type SellerDetailsUpdateWithoutAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    taxId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    totalSales?: Prisma.IntFieldUpdateOperationsInput | number | runtime.Types.Skip;
    responseRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
};
export type SellerDetailsUncheckedUpdateWithoutAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    taxId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    rating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    totalSales?: Prisma.IntFieldUpdateOperationsInput | number | runtime.Types.Skip;
    responseRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
};
export type SellerDetailsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean | runtime.Types.Skip;
    companyName?: boolean | runtime.Types.Skip;
    taxId?: boolean | runtime.Types.Skip;
    rating?: boolean | runtime.Types.Skip;
    totalSales?: boolean | runtime.Types.Skip;
    accountId?: boolean | runtime.Types.Skip;
    responseRate?: boolean | runtime.Types.Skip;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs> | runtime.Types.Skip;
}, ExtArgs["result"]["sellerDetails"]>;
export type SellerDetailsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean | runtime.Types.Skip;
    companyName?: boolean | runtime.Types.Skip;
    taxId?: boolean | runtime.Types.Skip;
    rating?: boolean | runtime.Types.Skip;
    totalSales?: boolean | runtime.Types.Skip;
    accountId?: boolean | runtime.Types.Skip;
    responseRate?: boolean | runtime.Types.Skip;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs> | runtime.Types.Skip;
}, ExtArgs["result"]["sellerDetails"]>;
export type SellerDetailsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean | runtime.Types.Skip;
    companyName?: boolean | runtime.Types.Skip;
    taxId?: boolean | runtime.Types.Skip;
    rating?: boolean | runtime.Types.Skip;
    totalSales?: boolean | runtime.Types.Skip;
    accountId?: boolean | runtime.Types.Skip;
    responseRate?: boolean | runtime.Types.Skip;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs> | runtime.Types.Skip;
}, ExtArgs["result"]["sellerDetails"]>;
export type SellerDetailsSelectScalar = {
    id?: boolean | runtime.Types.Skip;
    companyName?: boolean | runtime.Types.Skip;
    taxId?: boolean | runtime.Types.Skip;
    rating?: boolean | runtime.Types.Skip;
    totalSales?: boolean | runtime.Types.Skip;
    accountId?: boolean | runtime.Types.Skip;
    responseRate?: boolean | runtime.Types.Skip;
};
export type SellerDetailsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "companyName" | "taxId" | "rating" | "totalSales" | "accountId" | "responseRate", ExtArgs["result"]["sellerDetails"], runtime.Types.Skip>;
export type SellerDetailsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs> | runtime.Types.Skip;
};
export type SellerDetailsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs> | runtime.Types.Skip;
};
export type SellerDetailsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs> | runtime.Types.Skip;
};
export type $SellerDetailsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SellerDetails";
    objects: {
        account: Prisma.$AccountPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        companyName: string;
        taxId: string | null;
        rating: runtime.Decimal;
        totalSales: number;
        accountId: string;
        responseRate: runtime.Decimal | null;
    }, ExtArgs["result"]["sellerDetails"]>;
    composites: {};
};
export type SellerDetailsGetPayload<S extends boolean | null | undefined | SellerDetailsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SellerDetailsPayload, S>;
export type SellerDetailsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SellerDetailsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
    select?: SellerDetailsCountAggregateInputType | true;
};
export interface SellerDetailsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SellerDetails'];
        meta: {
            name: 'SellerDetails';
        };
    };
    findUnique<T extends SellerDetailsFindUniqueArgs>(args: Prisma.SelectSubset<T, SellerDetailsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SellerDetailsClient<runtime.Types.Result.GetResult<Prisma.$SellerDetailsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SellerDetailsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SellerDetailsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SellerDetailsClient<runtime.Types.Result.GetResult<Prisma.$SellerDetailsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SellerDetailsFindFirstArgs>(args?: Prisma.SelectSubset<T, SellerDetailsFindFirstArgs<ExtArgs>>): Prisma.Prisma__SellerDetailsClient<runtime.Types.Result.GetResult<Prisma.$SellerDetailsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SellerDetailsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SellerDetailsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SellerDetailsClient<runtime.Types.Result.GetResult<Prisma.$SellerDetailsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SellerDetailsFindManyArgs>(args?: Prisma.SelectSubset<T, SellerDetailsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SellerDetailsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SellerDetailsCreateArgs>(args: Prisma.SelectSubset<T, SellerDetailsCreateArgs<ExtArgs>>): Prisma.Prisma__SellerDetailsClient<runtime.Types.Result.GetResult<Prisma.$SellerDetailsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SellerDetailsCreateManyArgs>(args?: Prisma.SelectSubset<T, SellerDetailsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SellerDetailsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SellerDetailsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SellerDetailsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SellerDetailsDeleteArgs>(args: Prisma.SelectSubset<T, SellerDetailsDeleteArgs<ExtArgs>>): Prisma.Prisma__SellerDetailsClient<runtime.Types.Result.GetResult<Prisma.$SellerDetailsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SellerDetailsUpdateArgs>(args: Prisma.SelectSubset<T, SellerDetailsUpdateArgs<ExtArgs>>): Prisma.Prisma__SellerDetailsClient<runtime.Types.Result.GetResult<Prisma.$SellerDetailsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SellerDetailsDeleteManyArgs>(args?: Prisma.SelectSubset<T, SellerDetailsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SellerDetailsUpdateManyArgs>(args: Prisma.SelectSubset<T, SellerDetailsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SellerDetailsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SellerDetailsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SellerDetailsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SellerDetailsUpsertArgs>(args: Prisma.SelectSubset<T, SellerDetailsUpsertArgs<ExtArgs>>): Prisma.Prisma__SellerDetailsClient<runtime.Types.Result.GetResult<Prisma.$SellerDetailsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SellerDetailsCountArgs>(args?: Prisma.Subset<T, SellerDetailsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SellerDetailsCountAggregateOutputType> : number>;
    aggregate<T extends SellerDetailsAggregateArgs>(args: Prisma.Subset<T, SellerDetailsAggregateArgs>): Prisma.PrismaPromise<GetSellerDetailsAggregateType<T>>;
    groupBy<T extends SellerDetailsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SellerDetailsGroupByArgs['orderBy'];
    } : {
        orderBy?: SellerDetailsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SellerDetailsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSellerDetailsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SellerDetailsFieldRefs;
}
export interface Prisma__SellerDetailsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    account<T extends Prisma.AccountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AccountDefaultArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SellerDetailsFieldRefs {
    readonly id: Prisma.FieldRef<"SellerDetails", 'String'>;
    readonly companyName: Prisma.FieldRef<"SellerDetails", 'String'>;
    readonly taxId: Prisma.FieldRef<"SellerDetails", 'String'>;
    readonly rating: Prisma.FieldRef<"SellerDetails", 'Decimal'>;
    readonly totalSales: Prisma.FieldRef<"SellerDetails", 'Int'>;
    readonly accountId: Prisma.FieldRef<"SellerDetails", 'String'>;
    readonly responseRate: Prisma.FieldRef<"SellerDetails", 'Decimal'>;
}
export type SellerDetailsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SellerDetailsSelect<ExtArgs> | null;
    omit?: Prisma.SellerDetailsOmit<ExtArgs> | null;
    include?: Prisma.SellerDetailsInclude<ExtArgs> | null;
    where: Prisma.SellerDetailsWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type SellerDetailsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SellerDetailsSelect<ExtArgs> | null;
    omit?: Prisma.SellerDetailsOmit<ExtArgs> | null;
    include?: Prisma.SellerDetailsInclude<ExtArgs> | null;
    where: Prisma.SellerDetailsWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type SellerDetailsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SellerDetailsSelect<ExtArgs> | null;
    omit?: Prisma.SellerDetailsOmit<ExtArgs> | null;
    include?: Prisma.SellerDetailsInclude<ExtArgs> | null;
    where?: Prisma.SellerDetailsWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.SellerDetailsOrderByWithRelationInput | Prisma.SellerDetailsOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.SellerDetailsWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.SellerDetailsScalarFieldEnum | Prisma.SellerDetailsScalarFieldEnum[] | runtime.Types.Skip;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type SellerDetailsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SellerDetailsSelect<ExtArgs> | null;
    omit?: Prisma.SellerDetailsOmit<ExtArgs> | null;
    include?: Prisma.SellerDetailsInclude<ExtArgs> | null;
    where?: Prisma.SellerDetailsWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.SellerDetailsOrderByWithRelationInput | Prisma.SellerDetailsOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.SellerDetailsWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.SellerDetailsScalarFieldEnum | Prisma.SellerDetailsScalarFieldEnum[] | runtime.Types.Skip;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type SellerDetailsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SellerDetailsSelect<ExtArgs> | null;
    omit?: Prisma.SellerDetailsOmit<ExtArgs> | null;
    include?: Prisma.SellerDetailsInclude<ExtArgs> | null;
    where?: Prisma.SellerDetailsWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.SellerDetailsOrderByWithRelationInput | Prisma.SellerDetailsOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.SellerDetailsWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.SellerDetailsScalarFieldEnum | Prisma.SellerDetailsScalarFieldEnum[] | runtime.Types.Skip;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type SellerDetailsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SellerDetailsSelect<ExtArgs> | null;
    omit?: Prisma.SellerDetailsOmit<ExtArgs> | null;
    include?: Prisma.SellerDetailsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SellerDetailsCreateInput, Prisma.SellerDetailsUncheckedCreateInput>;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type SellerDetailsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SellerDetailsCreateManyInput | Prisma.SellerDetailsCreateManyInput[];
    skipDuplicates?: boolean | runtime.Types.Skip;
};
export type SellerDetailsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SellerDetailsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SellerDetailsOmit<ExtArgs> | null;
    data: Prisma.SellerDetailsCreateManyInput | Prisma.SellerDetailsCreateManyInput[];
    skipDuplicates?: boolean | runtime.Types.Skip;
    include?: Prisma.SellerDetailsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SellerDetailsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SellerDetailsSelect<ExtArgs> | null;
    omit?: Prisma.SellerDetailsOmit<ExtArgs> | null;
    include?: Prisma.SellerDetailsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SellerDetailsUpdateInput, Prisma.SellerDetailsUncheckedUpdateInput>;
    where: Prisma.SellerDetailsWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type SellerDetailsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SellerDetailsUpdateManyMutationInput, Prisma.SellerDetailsUncheckedUpdateManyInput>;
    where?: Prisma.SellerDetailsWhereInput | runtime.Types.Skip;
    limit?: number | runtime.Types.Skip;
};
export type SellerDetailsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SellerDetailsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SellerDetailsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SellerDetailsUpdateManyMutationInput, Prisma.SellerDetailsUncheckedUpdateManyInput>;
    where?: Prisma.SellerDetailsWhereInput | runtime.Types.Skip;
    limit?: number | runtime.Types.Skip;
    include?: Prisma.SellerDetailsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SellerDetailsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SellerDetailsSelect<ExtArgs> | null;
    omit?: Prisma.SellerDetailsOmit<ExtArgs> | null;
    include?: Prisma.SellerDetailsInclude<ExtArgs> | null;
    where: Prisma.SellerDetailsWhereUniqueInput;
    create: Prisma.XOR<Prisma.SellerDetailsCreateInput, Prisma.SellerDetailsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SellerDetailsUpdateInput, Prisma.SellerDetailsUncheckedUpdateInput>;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type SellerDetailsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SellerDetailsSelect<ExtArgs> | null;
    omit?: Prisma.SellerDetailsOmit<ExtArgs> | null;
    include?: Prisma.SellerDetailsInclude<ExtArgs> | null;
    where: Prisma.SellerDetailsWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type SellerDetailsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SellerDetailsWhereInput | runtime.Types.Skip;
    limit?: number | runtime.Types.Skip;
};
export type SellerDetailsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SellerDetailsSelect<ExtArgs> | null;
    omit?: Prisma.SellerDetailsOmit<ExtArgs> | null;
    include?: Prisma.SellerDetailsInclude<ExtArgs> | null;
};
export {};
