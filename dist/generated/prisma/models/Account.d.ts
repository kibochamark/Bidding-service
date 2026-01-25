import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AccountModel = runtime.Types.Result.DefaultSelection<Prisma.$AccountPayload>;
export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null;
    _min: AccountMinAggregateOutputType | null;
    _max: AccountMaxAggregateOutputType | null;
};
export type AccountMinAggregateOutputType = {
    id: string | null;
    kindeId: string | null;
    email: string | null;
    contact: string | null;
    fullName: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AccountMaxAggregateOutputType = {
    id: string | null;
    kindeId: string | null;
    email: string | null;
    contact: string | null;
    fullName: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AccountCountAggregateOutputType = {
    id: number;
    kindeId: number;
    email: number;
    contact: number;
    fullName: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type AccountMinAggregateInputType = {
    id?: true | runtime.Types.Skip;
    kindeId?: true | runtime.Types.Skip;
    email?: true | runtime.Types.Skip;
    contact?: true | runtime.Types.Skip;
    fullName?: true | runtime.Types.Skip;
    createdAt?: true | runtime.Types.Skip;
    updatedAt?: true | runtime.Types.Skip;
};
export type AccountMaxAggregateInputType = {
    id?: true | runtime.Types.Skip;
    kindeId?: true | runtime.Types.Skip;
    email?: true | runtime.Types.Skip;
    contact?: true | runtime.Types.Skip;
    fullName?: true | runtime.Types.Skip;
    createdAt?: true | runtime.Types.Skip;
    updatedAt?: true | runtime.Types.Skip;
};
export type AccountCountAggregateInputType = {
    id?: true | runtime.Types.Skip;
    kindeId?: true | runtime.Types.Skip;
    email?: true | runtime.Types.Skip;
    contact?: true | runtime.Types.Skip;
    fullName?: true | runtime.Types.Skip;
    createdAt?: true | runtime.Types.Skip;
    updatedAt?: true | runtime.Types.Skip;
    _all?: true | runtime.Types.Skip;
};
export type AccountAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AccountWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.AccountOrderByWithRelationInput | Prisma.AccountOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.AccountWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    _count?: true | AccountCountAggregateInputType;
    _min?: AccountMinAggregateInputType;
    _max?: AccountMaxAggregateInputType;
};
export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
    [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAccount[P]> : Prisma.GetScalarType<T[P], AggregateAccount[P]>;
};
export type AccountGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AccountWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.AccountOrderByWithAggregationInput | Prisma.AccountOrderByWithAggregationInput[] | runtime.Types.Skip;
    by: Prisma.AccountScalarFieldEnum[] | Prisma.AccountScalarFieldEnum;
    having?: Prisma.AccountScalarWhereWithAggregatesInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    _count?: AccountCountAggregateInputType | true;
    _min?: AccountMinAggregateInputType;
    _max?: AccountMaxAggregateInputType;
};
export type AccountGroupByOutputType = {
    id: string;
    kindeId: string;
    email: string | null;
    contact: string | null;
    fullName: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: AccountCountAggregateOutputType | null;
    _min: AccountMinAggregateOutputType | null;
    _max: AccountMaxAggregateOutputType | null;
};
type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AccountGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AccountGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AccountGroupByOutputType[P]>;
}>>;
export type AccountWhereInput = {
    AND?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[] | runtime.Types.Skip;
    OR?: Prisma.AccountWhereInput[] | runtime.Types.Skip;
    NOT?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[] | runtime.Types.Skip;
    id?: Prisma.StringFilter<"Account"> | string | runtime.Types.Skip;
    kindeId?: Prisma.StringFilter<"Account"> | string | runtime.Types.Skip;
    email?: Prisma.StringNullableFilter<"Account"> | string | null | runtime.Types.Skip;
    contact?: Prisma.StringNullableFilter<"Account"> | string | null | runtime.Types.Skip;
    fullName?: Prisma.StringNullableFilter<"Account"> | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFilter<"Account"> | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFilter<"Account"> | Date | string | runtime.Types.Skip;
    addresses?: Prisma.AddressListRelationFilter | runtime.Types.Skip;
    sellerProfile?: Prisma.XOR<Prisma.SellerDetailsNullableScalarRelationFilter, Prisma.SellerDetailsWhereInput> | null | runtime.Types.Skip;
};
export type AccountOrderByWithRelationInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    kindeId?: Prisma.SortOrder | runtime.Types.Skip;
    email?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    contact?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    fullName?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
    addresses?: Prisma.AddressOrderByRelationAggregateInput | runtime.Types.Skip;
    sellerProfile?: Prisma.SellerDetailsOrderByWithRelationInput | runtime.Types.Skip;
    _relevance?: Prisma.AccountOrderByRelevanceInput | runtime.Types.Skip;
};
export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string | runtime.Types.Skip;
    kindeId?: string | runtime.Types.Skip;
    email?: string | runtime.Types.Skip;
    AND?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[] | runtime.Types.Skip;
    OR?: Prisma.AccountWhereInput[] | runtime.Types.Skip;
    NOT?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[] | runtime.Types.Skip;
    contact?: Prisma.StringNullableFilter<"Account"> | string | null | runtime.Types.Skip;
    fullName?: Prisma.StringNullableFilter<"Account"> | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFilter<"Account"> | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFilter<"Account"> | Date | string | runtime.Types.Skip;
    addresses?: Prisma.AddressListRelationFilter | runtime.Types.Skip;
    sellerProfile?: Prisma.XOR<Prisma.SellerDetailsNullableScalarRelationFilter, Prisma.SellerDetailsWhereInput> | null | runtime.Types.Skip;
}, "id" | "kindeId" | "email">;
export type AccountOrderByWithAggregationInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    kindeId?: Prisma.SortOrder | runtime.Types.Skip;
    email?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    contact?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    fullName?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
    _count?: Prisma.AccountCountOrderByAggregateInput | runtime.Types.Skip;
    _max?: Prisma.AccountMaxOrderByAggregateInput | runtime.Types.Skip;
    _min?: Prisma.AccountMinOrderByAggregateInput | runtime.Types.Skip;
};
export type AccountScalarWhereWithAggregatesInput = {
    AND?: Prisma.AccountScalarWhereWithAggregatesInput | Prisma.AccountScalarWhereWithAggregatesInput[] | runtime.Types.Skip;
    OR?: Prisma.AccountScalarWhereWithAggregatesInput[] | runtime.Types.Skip;
    NOT?: Prisma.AccountScalarWhereWithAggregatesInput | Prisma.AccountScalarWhereWithAggregatesInput[] | runtime.Types.Skip;
    id?: Prisma.StringWithAggregatesFilter<"Account"> | string | runtime.Types.Skip;
    kindeId?: Prisma.StringWithAggregatesFilter<"Account"> | string | runtime.Types.Skip;
    email?: Prisma.StringNullableWithAggregatesFilter<"Account"> | string | null | runtime.Types.Skip;
    contact?: Prisma.StringNullableWithAggregatesFilter<"Account"> | string | null | runtime.Types.Skip;
    fullName?: Prisma.StringNullableWithAggregatesFilter<"Account"> | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Account"> | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Account"> | Date | string | runtime.Types.Skip;
};
export type AccountCreateInput = {
    id?: string | runtime.Types.Skip;
    kindeId: string;
    email?: string | null | runtime.Types.Skip;
    contact?: string | null | runtime.Types.Skip;
    fullName?: string | null | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
    addresses?: Prisma.AddressCreateNestedManyWithoutAccountInput | runtime.Types.Skip;
    sellerProfile?: Prisma.SellerDetailsCreateNestedOneWithoutAccountInput | runtime.Types.Skip;
};
export type AccountUncheckedCreateInput = {
    id?: string | runtime.Types.Skip;
    kindeId: string;
    email?: string | null | runtime.Types.Skip;
    contact?: string | null | runtime.Types.Skip;
    fullName?: string | null | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
    addresses?: Prisma.AddressUncheckedCreateNestedManyWithoutAccountInput | runtime.Types.Skip;
    sellerProfile?: Prisma.SellerDetailsUncheckedCreateNestedOneWithoutAccountInput | runtime.Types.Skip;
};
export type AccountUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    kindeId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    contact?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    fullName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    addresses?: Prisma.AddressUpdateManyWithoutAccountNestedInput | runtime.Types.Skip;
    sellerProfile?: Prisma.SellerDetailsUpdateOneWithoutAccountNestedInput | runtime.Types.Skip;
};
export type AccountUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    kindeId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    contact?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    fullName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    addresses?: Prisma.AddressUncheckedUpdateManyWithoutAccountNestedInput | runtime.Types.Skip;
    sellerProfile?: Prisma.SellerDetailsUncheckedUpdateOneWithoutAccountNestedInput | runtime.Types.Skip;
};
export type AccountCreateManyInput = {
    id?: string | runtime.Types.Skip;
    kindeId: string;
    email?: string | null | runtime.Types.Skip;
    contact?: string | null | runtime.Types.Skip;
    fullName?: string | null | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
};
export type AccountUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    kindeId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    contact?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    fullName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type AccountUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    kindeId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    contact?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    fullName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type AccountOrderByRelevanceInput = {
    fields: Prisma.AccountOrderByRelevanceFieldEnum | Prisma.AccountOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type AccountCountOrderByAggregateInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    kindeId?: Prisma.SortOrder | runtime.Types.Skip;
    email?: Prisma.SortOrder | runtime.Types.Skip;
    contact?: Prisma.SortOrder | runtime.Types.Skip;
    fullName?: Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
};
export type AccountMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    kindeId?: Prisma.SortOrder | runtime.Types.Skip;
    email?: Prisma.SortOrder | runtime.Types.Skip;
    contact?: Prisma.SortOrder | runtime.Types.Skip;
    fullName?: Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
};
export type AccountMinOrderByAggregateInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    kindeId?: Prisma.SortOrder | runtime.Types.Skip;
    email?: Prisma.SortOrder | runtime.Types.Skip;
    contact?: Prisma.SortOrder | runtime.Types.Skip;
    fullName?: Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
};
export type AccountScalarRelationFilter = {
    is?: Prisma.AccountWhereInput | runtime.Types.Skip;
    isNot?: Prisma.AccountWhereInput | runtime.Types.Skip;
};
export type StringFieldUpdateOperationsInput = {
    set?: string | runtime.Types.Skip;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null | runtime.Types.Skip;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string | runtime.Types.Skip;
};
export type AccountCreateNestedOneWithoutSellerProfileInput = {
    create?: Prisma.XOR<Prisma.AccountCreateWithoutSellerProfileInput, Prisma.AccountUncheckedCreateWithoutSellerProfileInput> | runtime.Types.Skip;
    connectOrCreate?: Prisma.AccountCreateOrConnectWithoutSellerProfileInput | runtime.Types.Skip;
    connect?: Prisma.AccountWhereUniqueInput | runtime.Types.Skip;
};
export type AccountUpdateOneRequiredWithoutSellerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.AccountCreateWithoutSellerProfileInput, Prisma.AccountUncheckedCreateWithoutSellerProfileInput> | runtime.Types.Skip;
    connectOrCreate?: Prisma.AccountCreateOrConnectWithoutSellerProfileInput | runtime.Types.Skip;
    upsert?: Prisma.AccountUpsertWithoutSellerProfileInput | runtime.Types.Skip;
    connect?: Prisma.AccountWhereUniqueInput | runtime.Types.Skip;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AccountUpdateToOneWithWhereWithoutSellerProfileInput, Prisma.AccountUpdateWithoutSellerProfileInput>, Prisma.AccountUncheckedUpdateWithoutSellerProfileInput> | runtime.Types.Skip;
};
export type AccountCreateNestedOneWithoutAddressesInput = {
    create?: Prisma.XOR<Prisma.AccountCreateWithoutAddressesInput, Prisma.AccountUncheckedCreateWithoutAddressesInput> | runtime.Types.Skip;
    connectOrCreate?: Prisma.AccountCreateOrConnectWithoutAddressesInput | runtime.Types.Skip;
    connect?: Prisma.AccountWhereUniqueInput | runtime.Types.Skip;
};
export type AccountUpdateOneRequiredWithoutAddressesNestedInput = {
    create?: Prisma.XOR<Prisma.AccountCreateWithoutAddressesInput, Prisma.AccountUncheckedCreateWithoutAddressesInput> | runtime.Types.Skip;
    connectOrCreate?: Prisma.AccountCreateOrConnectWithoutAddressesInput | runtime.Types.Skip;
    upsert?: Prisma.AccountUpsertWithoutAddressesInput | runtime.Types.Skip;
    connect?: Prisma.AccountWhereUniqueInput | runtime.Types.Skip;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AccountUpdateToOneWithWhereWithoutAddressesInput, Prisma.AccountUpdateWithoutAddressesInput>, Prisma.AccountUncheckedUpdateWithoutAddressesInput> | runtime.Types.Skip;
};
export type AccountCreateWithoutSellerProfileInput = {
    id?: string | runtime.Types.Skip;
    kindeId: string;
    email?: string | null | runtime.Types.Skip;
    contact?: string | null | runtime.Types.Skip;
    fullName?: string | null | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
    addresses?: Prisma.AddressCreateNestedManyWithoutAccountInput | runtime.Types.Skip;
};
export type AccountUncheckedCreateWithoutSellerProfileInput = {
    id?: string | runtime.Types.Skip;
    kindeId: string;
    email?: string | null | runtime.Types.Skip;
    contact?: string | null | runtime.Types.Skip;
    fullName?: string | null | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
    addresses?: Prisma.AddressUncheckedCreateNestedManyWithoutAccountInput | runtime.Types.Skip;
};
export type AccountCreateOrConnectWithoutSellerProfileInput = {
    where: Prisma.AccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.AccountCreateWithoutSellerProfileInput, Prisma.AccountUncheckedCreateWithoutSellerProfileInput>;
};
export type AccountUpsertWithoutSellerProfileInput = {
    update: Prisma.XOR<Prisma.AccountUpdateWithoutSellerProfileInput, Prisma.AccountUncheckedUpdateWithoutSellerProfileInput>;
    create: Prisma.XOR<Prisma.AccountCreateWithoutSellerProfileInput, Prisma.AccountUncheckedCreateWithoutSellerProfileInput>;
    where?: Prisma.AccountWhereInput | runtime.Types.Skip;
};
export type AccountUpdateToOneWithWhereWithoutSellerProfileInput = {
    where?: Prisma.AccountWhereInput | runtime.Types.Skip;
    data: Prisma.XOR<Prisma.AccountUpdateWithoutSellerProfileInput, Prisma.AccountUncheckedUpdateWithoutSellerProfileInput>;
};
export type AccountUpdateWithoutSellerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    kindeId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    contact?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    fullName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    addresses?: Prisma.AddressUpdateManyWithoutAccountNestedInput | runtime.Types.Skip;
};
export type AccountUncheckedUpdateWithoutSellerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    kindeId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    contact?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    fullName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    addresses?: Prisma.AddressUncheckedUpdateManyWithoutAccountNestedInput | runtime.Types.Skip;
};
export type AccountCreateWithoutAddressesInput = {
    id?: string | runtime.Types.Skip;
    kindeId: string;
    email?: string | null | runtime.Types.Skip;
    contact?: string | null | runtime.Types.Skip;
    fullName?: string | null | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
    sellerProfile?: Prisma.SellerDetailsCreateNestedOneWithoutAccountInput | runtime.Types.Skip;
};
export type AccountUncheckedCreateWithoutAddressesInput = {
    id?: string | runtime.Types.Skip;
    kindeId: string;
    email?: string | null | runtime.Types.Skip;
    contact?: string | null | runtime.Types.Skip;
    fullName?: string | null | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
    sellerProfile?: Prisma.SellerDetailsUncheckedCreateNestedOneWithoutAccountInput | runtime.Types.Skip;
};
export type AccountCreateOrConnectWithoutAddressesInput = {
    where: Prisma.AccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.AccountCreateWithoutAddressesInput, Prisma.AccountUncheckedCreateWithoutAddressesInput>;
};
export type AccountUpsertWithoutAddressesInput = {
    update: Prisma.XOR<Prisma.AccountUpdateWithoutAddressesInput, Prisma.AccountUncheckedUpdateWithoutAddressesInput>;
    create: Prisma.XOR<Prisma.AccountCreateWithoutAddressesInput, Prisma.AccountUncheckedCreateWithoutAddressesInput>;
    where?: Prisma.AccountWhereInput | runtime.Types.Skip;
};
export type AccountUpdateToOneWithWhereWithoutAddressesInput = {
    where?: Prisma.AccountWhereInput | runtime.Types.Skip;
    data: Prisma.XOR<Prisma.AccountUpdateWithoutAddressesInput, Prisma.AccountUncheckedUpdateWithoutAddressesInput>;
};
export type AccountUpdateWithoutAddressesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    kindeId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    contact?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    fullName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    sellerProfile?: Prisma.SellerDetailsUpdateOneWithoutAccountNestedInput | runtime.Types.Skip;
};
export type AccountUncheckedUpdateWithoutAddressesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    kindeId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    contact?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    fullName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    sellerProfile?: Prisma.SellerDetailsUncheckedUpdateOneWithoutAccountNestedInput | runtime.Types.Skip;
};
export type AccountCountOutputType = {
    addresses: number;
};
export type AccountCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    addresses?: boolean | AccountCountOutputTypeCountAddressesArgs;
};
export type AccountCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountCountOutputTypeSelect<ExtArgs> | null;
};
export type AccountCountOutputTypeCountAddressesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AddressWhereInput | runtime.Types.Skip;
};
export type AccountSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean | runtime.Types.Skip;
    kindeId?: boolean | runtime.Types.Skip;
    email?: boolean | runtime.Types.Skip;
    contact?: boolean | runtime.Types.Skip;
    fullName?: boolean | runtime.Types.Skip;
    createdAt?: boolean | runtime.Types.Skip;
    updatedAt?: boolean | runtime.Types.Skip;
    addresses?: boolean | Prisma.Account$addressesArgs<ExtArgs> | runtime.Types.Skip;
    sellerProfile?: boolean | Prisma.Account$sellerProfileArgs<ExtArgs> | runtime.Types.Skip;
    _count?: boolean | Prisma.AccountCountOutputTypeDefaultArgs<ExtArgs> | runtime.Types.Skip;
}, ExtArgs["result"]["account"]>;
export type AccountSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean | runtime.Types.Skip;
    kindeId?: boolean | runtime.Types.Skip;
    email?: boolean | runtime.Types.Skip;
    contact?: boolean | runtime.Types.Skip;
    fullName?: boolean | runtime.Types.Skip;
    createdAt?: boolean | runtime.Types.Skip;
    updatedAt?: boolean | runtime.Types.Skip;
}, ExtArgs["result"]["account"]>;
export type AccountSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean | runtime.Types.Skip;
    kindeId?: boolean | runtime.Types.Skip;
    email?: boolean | runtime.Types.Skip;
    contact?: boolean | runtime.Types.Skip;
    fullName?: boolean | runtime.Types.Skip;
    createdAt?: boolean | runtime.Types.Skip;
    updatedAt?: boolean | runtime.Types.Skip;
}, ExtArgs["result"]["account"]>;
export type AccountSelectScalar = {
    id?: boolean | runtime.Types.Skip;
    kindeId?: boolean | runtime.Types.Skip;
    email?: boolean | runtime.Types.Skip;
    contact?: boolean | runtime.Types.Skip;
    fullName?: boolean | runtime.Types.Skip;
    createdAt?: boolean | runtime.Types.Skip;
    updatedAt?: boolean | runtime.Types.Skip;
};
export type AccountOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "kindeId" | "email" | "contact" | "fullName" | "createdAt" | "updatedAt", ExtArgs["result"]["account"], runtime.Types.Skip>;
export type AccountInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    addresses?: boolean | Prisma.Account$addressesArgs<ExtArgs> | runtime.Types.Skip;
    sellerProfile?: boolean | Prisma.Account$sellerProfileArgs<ExtArgs> | runtime.Types.Skip;
    _count?: boolean | Prisma.AccountCountOutputTypeDefaultArgs<ExtArgs> | runtime.Types.Skip;
};
export type AccountIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type AccountIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $AccountPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Account";
    objects: {
        addresses: Prisma.$AddressPayload<ExtArgs>[];
        sellerProfile: Prisma.$SellerDetailsPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        kindeId: string;
        email: string | null;
        contact: string | null;
        fullName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["account"]>;
    composites: {};
};
export type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AccountPayload, S>;
export type AccountCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
    select?: AccountCountAggregateInputType | true;
};
export interface AccountDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Account'];
        meta: {
            name: 'Account';
        };
    };
    findUnique<T extends AccountFindUniqueArgs>(args: Prisma.SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AccountFindFirstArgs>(args?: Prisma.SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AccountFindManyArgs>(args?: Prisma.SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AccountCreateArgs>(args: Prisma.SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AccountCreateManyArgs>(args?: Prisma.SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AccountDeleteArgs>(args: Prisma.SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AccountUpdateArgs>(args: Prisma.SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AccountDeleteManyArgs>(args?: Prisma.SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AccountUpdateManyArgs>(args: Prisma.SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AccountUpsertArgs>(args: Prisma.SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AccountCountArgs>(args?: Prisma.Subset<T, AccountCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AccountCountAggregateOutputType> : number>;
    aggregate<T extends AccountAggregateArgs>(args: Prisma.Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>;
    groupBy<T extends AccountGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AccountGroupByArgs['orderBy'];
    } : {
        orderBy?: AccountGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AccountFieldRefs;
}
export interface Prisma__AccountClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    addresses<T extends Prisma.Account$addressesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Account$addressesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    sellerProfile<T extends Prisma.Account$sellerProfileArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Account$sellerProfileArgs<ExtArgs>>): Prisma.Prisma__SellerDetailsClient<runtime.Types.Result.GetResult<Prisma.$SellerDetailsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AccountFieldRefs {
    readonly id: Prisma.FieldRef<"Account", 'String'>;
    readonly kindeId: Prisma.FieldRef<"Account", 'String'>;
    readonly email: Prisma.FieldRef<"Account", 'String'>;
    readonly contact: Prisma.FieldRef<"Account", 'String'>;
    readonly fullName: Prisma.FieldRef<"Account", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Account", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Account", 'DateTime'>;
}
export type AccountFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where: Prisma.AccountWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AccountFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where: Prisma.AccountWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AccountFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where?: Prisma.AccountWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.AccountOrderByWithRelationInput | Prisma.AccountOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.AccountWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.AccountScalarFieldEnum | Prisma.AccountScalarFieldEnum[] | runtime.Types.Skip;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AccountFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where?: Prisma.AccountWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.AccountOrderByWithRelationInput | Prisma.AccountOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.AccountWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.AccountScalarFieldEnum | Prisma.AccountScalarFieldEnum[] | runtime.Types.Skip;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AccountFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where?: Prisma.AccountWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.AccountOrderByWithRelationInput | Prisma.AccountOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.AccountWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.AccountScalarFieldEnum | Prisma.AccountScalarFieldEnum[] | runtime.Types.Skip;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AccountCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AccountCreateInput, Prisma.AccountUncheckedCreateInput>;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AccountCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AccountCreateManyInput | Prisma.AccountCreateManyInput[];
    skipDuplicates?: boolean | runtime.Types.Skip;
};
export type AccountCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    data: Prisma.AccountCreateManyInput | Prisma.AccountCreateManyInput[];
    skipDuplicates?: boolean | runtime.Types.Skip;
};
export type AccountUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AccountUpdateInput, Prisma.AccountUncheckedUpdateInput>;
    where: Prisma.AccountWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AccountUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AccountUpdateManyMutationInput, Prisma.AccountUncheckedUpdateManyInput>;
    where?: Prisma.AccountWhereInput | runtime.Types.Skip;
    limit?: number | runtime.Types.Skip;
};
export type AccountUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AccountUpdateManyMutationInput, Prisma.AccountUncheckedUpdateManyInput>;
    where?: Prisma.AccountWhereInput | runtime.Types.Skip;
    limit?: number | runtime.Types.Skip;
};
export type AccountUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where: Prisma.AccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.AccountCreateInput, Prisma.AccountUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AccountUpdateInput, Prisma.AccountUncheckedUpdateInput>;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AccountDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where: Prisma.AccountWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AccountDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AccountWhereInput | runtime.Types.Skip;
    limit?: number | runtime.Types.Skip;
};
export type Account$addressesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AddressSelect<ExtArgs> | null;
    omit?: Prisma.AddressOmit<ExtArgs> | null;
    include?: Prisma.AddressInclude<ExtArgs> | null;
    where?: Prisma.AddressWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.AddressOrderByWithRelationInput | Prisma.AddressOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.AddressWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.AddressScalarFieldEnum | Prisma.AddressScalarFieldEnum[] | runtime.Types.Skip;
};
export type Account$sellerProfileArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SellerDetailsSelect<ExtArgs> | null;
    omit?: Prisma.SellerDetailsOmit<ExtArgs> | null;
    include?: Prisma.SellerDetailsInclude<ExtArgs> | null;
    where?: Prisma.SellerDetailsWhereInput | runtime.Types.Skip;
};
export type AccountDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
};
export {};
