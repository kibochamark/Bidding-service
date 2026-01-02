import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AddressModel = runtime.Types.Result.DefaultSelection<Prisma.$AddressPayload>;
export type AggregateAddress = {
    _count: AddressCountAggregateOutputType | null;
    _min: AddressMinAggregateOutputType | null;
    _max: AddressMaxAggregateOutputType | null;
};
export type AddressMinAggregateOutputType = {
    id: string | null;
    recipientname: string | null;
    phone: string | null;
    label: string | null;
    street: string | null;
    city: string | null;
    state: string | null;
    zipCode: string | null;
    country: string | null;
    accountId: string | null;
    isPrimary: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AddressMaxAggregateOutputType = {
    id: string | null;
    recipientname: string | null;
    phone: string | null;
    label: string | null;
    street: string | null;
    city: string | null;
    state: string | null;
    zipCode: string | null;
    country: string | null;
    accountId: string | null;
    isPrimary: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AddressCountAggregateOutputType = {
    id: number;
    recipientname: number;
    phone: number;
    label: number;
    street: number;
    city: number;
    state: number;
    zipCode: number;
    country: number;
    accountId: number;
    isPrimary: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type AddressMinAggregateInputType = {
    id?: true | runtime.Types.Skip;
    recipientname?: true | runtime.Types.Skip;
    phone?: true | runtime.Types.Skip;
    label?: true | runtime.Types.Skip;
    street?: true | runtime.Types.Skip;
    city?: true | runtime.Types.Skip;
    state?: true | runtime.Types.Skip;
    zipCode?: true | runtime.Types.Skip;
    country?: true | runtime.Types.Skip;
    accountId?: true | runtime.Types.Skip;
    isPrimary?: true | runtime.Types.Skip;
    createdAt?: true | runtime.Types.Skip;
    updatedAt?: true | runtime.Types.Skip;
};
export type AddressMaxAggregateInputType = {
    id?: true | runtime.Types.Skip;
    recipientname?: true | runtime.Types.Skip;
    phone?: true | runtime.Types.Skip;
    label?: true | runtime.Types.Skip;
    street?: true | runtime.Types.Skip;
    city?: true | runtime.Types.Skip;
    state?: true | runtime.Types.Skip;
    zipCode?: true | runtime.Types.Skip;
    country?: true | runtime.Types.Skip;
    accountId?: true | runtime.Types.Skip;
    isPrimary?: true | runtime.Types.Skip;
    createdAt?: true | runtime.Types.Skip;
    updatedAt?: true | runtime.Types.Skip;
};
export type AddressCountAggregateInputType = {
    id?: true | runtime.Types.Skip;
    recipientname?: true | runtime.Types.Skip;
    phone?: true | runtime.Types.Skip;
    label?: true | runtime.Types.Skip;
    street?: true | runtime.Types.Skip;
    city?: true | runtime.Types.Skip;
    state?: true | runtime.Types.Skip;
    zipCode?: true | runtime.Types.Skip;
    country?: true | runtime.Types.Skip;
    accountId?: true | runtime.Types.Skip;
    isPrimary?: true | runtime.Types.Skip;
    createdAt?: true | runtime.Types.Skip;
    updatedAt?: true | runtime.Types.Skip;
    _all?: true | runtime.Types.Skip;
};
export type AddressAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AddressWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.AddressOrderByWithRelationInput | Prisma.AddressOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.AddressWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    _count?: true | AddressCountAggregateInputType;
    _min?: AddressMinAggregateInputType;
    _max?: AddressMaxAggregateInputType;
};
export type GetAddressAggregateType<T extends AddressAggregateArgs> = {
    [P in keyof T & keyof AggregateAddress]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAddress[P]> : Prisma.GetScalarType<T[P], AggregateAddress[P]>;
};
export type AddressGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AddressWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.AddressOrderByWithAggregationInput | Prisma.AddressOrderByWithAggregationInput[] | runtime.Types.Skip;
    by: Prisma.AddressScalarFieldEnum[] | Prisma.AddressScalarFieldEnum;
    having?: Prisma.AddressScalarWhereWithAggregatesInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    _count?: AddressCountAggregateInputType | true;
    _min?: AddressMinAggregateInputType;
    _max?: AddressMaxAggregateInputType;
};
export type AddressGroupByOutputType = {
    id: string;
    recipientname: string;
    phone: string;
    label: string | null;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    accountId: string;
    isPrimary: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: AddressCountAggregateOutputType | null;
    _min: AddressMinAggregateOutputType | null;
    _max: AddressMaxAggregateOutputType | null;
};
type GetAddressGroupByPayload<T extends AddressGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AddressGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AddressGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AddressGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AddressGroupByOutputType[P]>;
}>>;
export type AddressWhereInput = {
    AND?: Prisma.AddressWhereInput | Prisma.AddressWhereInput[] | runtime.Types.Skip;
    OR?: Prisma.AddressWhereInput[] | runtime.Types.Skip;
    NOT?: Prisma.AddressWhereInput | Prisma.AddressWhereInput[] | runtime.Types.Skip;
    id?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    recipientname?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    phone?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    label?: Prisma.StringNullableFilter<"Address"> | string | null | runtime.Types.Skip;
    street?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    city?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    state?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    zipCode?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    country?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    accountId?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    isPrimary?: Prisma.BoolFilter<"Address"> | boolean | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFilter<"Address"> | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFilter<"Address"> | Date | string | runtime.Types.Skip;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput> | runtime.Types.Skip;
};
export type AddressOrderByWithRelationInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    recipientname?: Prisma.SortOrder | runtime.Types.Skip;
    phone?: Prisma.SortOrder | runtime.Types.Skip;
    label?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    street?: Prisma.SortOrder | runtime.Types.Skip;
    city?: Prisma.SortOrder | runtime.Types.Skip;
    state?: Prisma.SortOrder | runtime.Types.Skip;
    zipCode?: Prisma.SortOrder | runtime.Types.Skip;
    country?: Prisma.SortOrder | runtime.Types.Skip;
    accountId?: Prisma.SortOrder | runtime.Types.Skip;
    isPrimary?: Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
    account?: Prisma.AccountOrderByWithRelationInput | runtime.Types.Skip;
    _relevance?: Prisma.AddressOrderByRelevanceInput | runtime.Types.Skip;
};
export type AddressWhereUniqueInput = Prisma.AtLeast<{
    id?: string | runtime.Types.Skip;
    AND?: Prisma.AddressWhereInput | Prisma.AddressWhereInput[] | runtime.Types.Skip;
    OR?: Prisma.AddressWhereInput[] | runtime.Types.Skip;
    NOT?: Prisma.AddressWhereInput | Prisma.AddressWhereInput[] | runtime.Types.Skip;
    recipientname?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    phone?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    label?: Prisma.StringNullableFilter<"Address"> | string | null | runtime.Types.Skip;
    street?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    city?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    state?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    zipCode?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    country?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    accountId?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    isPrimary?: Prisma.BoolFilter<"Address"> | boolean | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFilter<"Address"> | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFilter<"Address"> | Date | string | runtime.Types.Skip;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput> | runtime.Types.Skip;
}, "id">;
export type AddressOrderByWithAggregationInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    recipientname?: Prisma.SortOrder | runtime.Types.Skip;
    phone?: Prisma.SortOrder | runtime.Types.Skip;
    label?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    street?: Prisma.SortOrder | runtime.Types.Skip;
    city?: Prisma.SortOrder | runtime.Types.Skip;
    state?: Prisma.SortOrder | runtime.Types.Skip;
    zipCode?: Prisma.SortOrder | runtime.Types.Skip;
    country?: Prisma.SortOrder | runtime.Types.Skip;
    accountId?: Prisma.SortOrder | runtime.Types.Skip;
    isPrimary?: Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
    _count?: Prisma.AddressCountOrderByAggregateInput | runtime.Types.Skip;
    _max?: Prisma.AddressMaxOrderByAggregateInput | runtime.Types.Skip;
    _min?: Prisma.AddressMinOrderByAggregateInput | runtime.Types.Skip;
};
export type AddressScalarWhereWithAggregatesInput = {
    AND?: Prisma.AddressScalarWhereWithAggregatesInput | Prisma.AddressScalarWhereWithAggregatesInput[] | runtime.Types.Skip;
    OR?: Prisma.AddressScalarWhereWithAggregatesInput[] | runtime.Types.Skip;
    NOT?: Prisma.AddressScalarWhereWithAggregatesInput | Prisma.AddressScalarWhereWithAggregatesInput[] | runtime.Types.Skip;
    id?: Prisma.StringWithAggregatesFilter<"Address"> | string | runtime.Types.Skip;
    recipientname?: Prisma.StringWithAggregatesFilter<"Address"> | string | runtime.Types.Skip;
    phone?: Prisma.StringWithAggregatesFilter<"Address"> | string | runtime.Types.Skip;
    label?: Prisma.StringNullableWithAggregatesFilter<"Address"> | string | null | runtime.Types.Skip;
    street?: Prisma.StringWithAggregatesFilter<"Address"> | string | runtime.Types.Skip;
    city?: Prisma.StringWithAggregatesFilter<"Address"> | string | runtime.Types.Skip;
    state?: Prisma.StringWithAggregatesFilter<"Address"> | string | runtime.Types.Skip;
    zipCode?: Prisma.StringWithAggregatesFilter<"Address"> | string | runtime.Types.Skip;
    country?: Prisma.StringWithAggregatesFilter<"Address"> | string | runtime.Types.Skip;
    accountId?: Prisma.StringWithAggregatesFilter<"Address"> | string | runtime.Types.Skip;
    isPrimary?: Prisma.BoolWithAggregatesFilter<"Address"> | boolean | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Address"> | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Address"> | Date | string | runtime.Types.Skip;
};
export type AddressCreateInput = {
    id?: string | runtime.Types.Skip;
    recipientname: string;
    phone: string;
    label?: string | null | runtime.Types.Skip;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isPrimary?: boolean | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
    account: Prisma.AccountCreateNestedOneWithoutAddressesInput;
};
export type AddressUncheckedCreateInput = {
    id?: string | runtime.Types.Skip;
    recipientname: string;
    phone: string;
    label?: string | null | runtime.Types.Skip;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    accountId: string;
    isPrimary?: boolean | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
};
export type AddressUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    recipientname?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    phone?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    label?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    street?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    city?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    state?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    country?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    account?: Prisma.AccountUpdateOneRequiredWithoutAddressesNestedInput | runtime.Types.Skip;
};
export type AddressUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    recipientname?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    phone?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    label?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    street?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    city?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    state?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    country?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type AddressCreateManyInput = {
    id?: string | runtime.Types.Skip;
    recipientname: string;
    phone: string;
    label?: string | null | runtime.Types.Skip;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    accountId: string;
    isPrimary?: boolean | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
};
export type AddressUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    recipientname?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    phone?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    label?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    street?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    city?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    state?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    country?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type AddressUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    recipientname?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    phone?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    label?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    street?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    city?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    state?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    country?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type AddressListRelationFilter = {
    every?: Prisma.AddressWhereInput | runtime.Types.Skip;
    some?: Prisma.AddressWhereInput | runtime.Types.Skip;
    none?: Prisma.AddressWhereInput | runtime.Types.Skip;
};
export type AddressOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder | runtime.Types.Skip;
};
export type AddressOrderByRelevanceInput = {
    fields: Prisma.AddressOrderByRelevanceFieldEnum | Prisma.AddressOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type AddressCountOrderByAggregateInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    recipientname?: Prisma.SortOrder | runtime.Types.Skip;
    phone?: Prisma.SortOrder | runtime.Types.Skip;
    label?: Prisma.SortOrder | runtime.Types.Skip;
    street?: Prisma.SortOrder | runtime.Types.Skip;
    city?: Prisma.SortOrder | runtime.Types.Skip;
    state?: Prisma.SortOrder | runtime.Types.Skip;
    zipCode?: Prisma.SortOrder | runtime.Types.Skip;
    country?: Prisma.SortOrder | runtime.Types.Skip;
    accountId?: Prisma.SortOrder | runtime.Types.Skip;
    isPrimary?: Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
};
export type AddressMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    recipientname?: Prisma.SortOrder | runtime.Types.Skip;
    phone?: Prisma.SortOrder | runtime.Types.Skip;
    label?: Prisma.SortOrder | runtime.Types.Skip;
    street?: Prisma.SortOrder | runtime.Types.Skip;
    city?: Prisma.SortOrder | runtime.Types.Skip;
    state?: Prisma.SortOrder | runtime.Types.Skip;
    zipCode?: Prisma.SortOrder | runtime.Types.Skip;
    country?: Prisma.SortOrder | runtime.Types.Skip;
    accountId?: Prisma.SortOrder | runtime.Types.Skip;
    isPrimary?: Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
};
export type AddressMinOrderByAggregateInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    recipientname?: Prisma.SortOrder | runtime.Types.Skip;
    phone?: Prisma.SortOrder | runtime.Types.Skip;
    label?: Prisma.SortOrder | runtime.Types.Skip;
    street?: Prisma.SortOrder | runtime.Types.Skip;
    city?: Prisma.SortOrder | runtime.Types.Skip;
    state?: Prisma.SortOrder | runtime.Types.Skip;
    zipCode?: Prisma.SortOrder | runtime.Types.Skip;
    country?: Prisma.SortOrder | runtime.Types.Skip;
    accountId?: Prisma.SortOrder | runtime.Types.Skip;
    isPrimary?: Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
};
export type AddressCreateNestedManyWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.AddressCreateWithoutAccountInput, Prisma.AddressUncheckedCreateWithoutAccountInput> | Prisma.AddressCreateWithoutAccountInput[] | Prisma.AddressUncheckedCreateWithoutAccountInput[] | runtime.Types.Skip;
    connectOrCreate?: Prisma.AddressCreateOrConnectWithoutAccountInput | Prisma.AddressCreateOrConnectWithoutAccountInput[] | runtime.Types.Skip;
    createMany?: Prisma.AddressCreateManyAccountInputEnvelope | runtime.Types.Skip;
    connect?: Prisma.AddressWhereUniqueInput | Prisma.AddressWhereUniqueInput[] | runtime.Types.Skip;
};
export type AddressUncheckedCreateNestedManyWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.AddressCreateWithoutAccountInput, Prisma.AddressUncheckedCreateWithoutAccountInput> | Prisma.AddressCreateWithoutAccountInput[] | Prisma.AddressUncheckedCreateWithoutAccountInput[] | runtime.Types.Skip;
    connectOrCreate?: Prisma.AddressCreateOrConnectWithoutAccountInput | Prisma.AddressCreateOrConnectWithoutAccountInput[] | runtime.Types.Skip;
    createMany?: Prisma.AddressCreateManyAccountInputEnvelope | runtime.Types.Skip;
    connect?: Prisma.AddressWhereUniqueInput | Prisma.AddressWhereUniqueInput[] | runtime.Types.Skip;
};
export type AddressUpdateManyWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.AddressCreateWithoutAccountInput, Prisma.AddressUncheckedCreateWithoutAccountInput> | Prisma.AddressCreateWithoutAccountInput[] | Prisma.AddressUncheckedCreateWithoutAccountInput[] | runtime.Types.Skip;
    connectOrCreate?: Prisma.AddressCreateOrConnectWithoutAccountInput | Prisma.AddressCreateOrConnectWithoutAccountInput[] | runtime.Types.Skip;
    upsert?: Prisma.AddressUpsertWithWhereUniqueWithoutAccountInput | Prisma.AddressUpsertWithWhereUniqueWithoutAccountInput[] | runtime.Types.Skip;
    createMany?: Prisma.AddressCreateManyAccountInputEnvelope | runtime.Types.Skip;
    set?: Prisma.AddressWhereUniqueInput | Prisma.AddressWhereUniqueInput[] | runtime.Types.Skip;
    disconnect?: Prisma.AddressWhereUniqueInput | Prisma.AddressWhereUniqueInput[] | runtime.Types.Skip;
    delete?: Prisma.AddressWhereUniqueInput | Prisma.AddressWhereUniqueInput[] | runtime.Types.Skip;
    connect?: Prisma.AddressWhereUniqueInput | Prisma.AddressWhereUniqueInput[] | runtime.Types.Skip;
    update?: Prisma.AddressUpdateWithWhereUniqueWithoutAccountInput | Prisma.AddressUpdateWithWhereUniqueWithoutAccountInput[] | runtime.Types.Skip;
    updateMany?: Prisma.AddressUpdateManyWithWhereWithoutAccountInput | Prisma.AddressUpdateManyWithWhereWithoutAccountInput[] | runtime.Types.Skip;
    deleteMany?: Prisma.AddressScalarWhereInput | Prisma.AddressScalarWhereInput[] | runtime.Types.Skip;
};
export type AddressUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.AddressCreateWithoutAccountInput, Prisma.AddressUncheckedCreateWithoutAccountInput> | Prisma.AddressCreateWithoutAccountInput[] | Prisma.AddressUncheckedCreateWithoutAccountInput[] | runtime.Types.Skip;
    connectOrCreate?: Prisma.AddressCreateOrConnectWithoutAccountInput | Prisma.AddressCreateOrConnectWithoutAccountInput[] | runtime.Types.Skip;
    upsert?: Prisma.AddressUpsertWithWhereUniqueWithoutAccountInput | Prisma.AddressUpsertWithWhereUniqueWithoutAccountInput[] | runtime.Types.Skip;
    createMany?: Prisma.AddressCreateManyAccountInputEnvelope | runtime.Types.Skip;
    set?: Prisma.AddressWhereUniqueInput | Prisma.AddressWhereUniqueInput[] | runtime.Types.Skip;
    disconnect?: Prisma.AddressWhereUniqueInput | Prisma.AddressWhereUniqueInput[] | runtime.Types.Skip;
    delete?: Prisma.AddressWhereUniqueInput | Prisma.AddressWhereUniqueInput[] | runtime.Types.Skip;
    connect?: Prisma.AddressWhereUniqueInput | Prisma.AddressWhereUniqueInput[] | runtime.Types.Skip;
    update?: Prisma.AddressUpdateWithWhereUniqueWithoutAccountInput | Prisma.AddressUpdateWithWhereUniqueWithoutAccountInput[] | runtime.Types.Skip;
    updateMany?: Prisma.AddressUpdateManyWithWhereWithoutAccountInput | Prisma.AddressUpdateManyWithWhereWithoutAccountInput[] | runtime.Types.Skip;
    deleteMany?: Prisma.AddressScalarWhereInput | Prisma.AddressScalarWhereInput[] | runtime.Types.Skip;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean | runtime.Types.Skip;
};
export type AddressCreateWithoutAccountInput = {
    id?: string | runtime.Types.Skip;
    recipientname: string;
    phone: string;
    label?: string | null | runtime.Types.Skip;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isPrimary?: boolean | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
};
export type AddressUncheckedCreateWithoutAccountInput = {
    id?: string | runtime.Types.Skip;
    recipientname: string;
    phone: string;
    label?: string | null | runtime.Types.Skip;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isPrimary?: boolean | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
};
export type AddressCreateOrConnectWithoutAccountInput = {
    where: Prisma.AddressWhereUniqueInput;
    create: Prisma.XOR<Prisma.AddressCreateWithoutAccountInput, Prisma.AddressUncheckedCreateWithoutAccountInput>;
};
export type AddressCreateManyAccountInputEnvelope = {
    data: Prisma.AddressCreateManyAccountInput | Prisma.AddressCreateManyAccountInput[];
    skipDuplicates?: boolean | runtime.Types.Skip;
};
export type AddressUpsertWithWhereUniqueWithoutAccountInput = {
    where: Prisma.AddressWhereUniqueInput;
    update: Prisma.XOR<Prisma.AddressUpdateWithoutAccountInput, Prisma.AddressUncheckedUpdateWithoutAccountInput>;
    create: Prisma.XOR<Prisma.AddressCreateWithoutAccountInput, Prisma.AddressUncheckedCreateWithoutAccountInput>;
};
export type AddressUpdateWithWhereUniqueWithoutAccountInput = {
    where: Prisma.AddressWhereUniqueInput;
    data: Prisma.XOR<Prisma.AddressUpdateWithoutAccountInput, Prisma.AddressUncheckedUpdateWithoutAccountInput>;
};
export type AddressUpdateManyWithWhereWithoutAccountInput = {
    where: Prisma.AddressScalarWhereInput;
    data: Prisma.XOR<Prisma.AddressUpdateManyMutationInput, Prisma.AddressUncheckedUpdateManyWithoutAccountInput>;
};
export type AddressScalarWhereInput = {
    AND?: Prisma.AddressScalarWhereInput | Prisma.AddressScalarWhereInput[] | runtime.Types.Skip;
    OR?: Prisma.AddressScalarWhereInput[] | runtime.Types.Skip;
    NOT?: Prisma.AddressScalarWhereInput | Prisma.AddressScalarWhereInput[] | runtime.Types.Skip;
    id?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    recipientname?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    phone?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    label?: Prisma.StringNullableFilter<"Address"> | string | null | runtime.Types.Skip;
    street?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    city?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    state?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    zipCode?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    country?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    accountId?: Prisma.StringFilter<"Address"> | string | runtime.Types.Skip;
    isPrimary?: Prisma.BoolFilter<"Address"> | boolean | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFilter<"Address"> | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFilter<"Address"> | Date | string | runtime.Types.Skip;
};
export type AddressCreateManyAccountInput = {
    id?: string | runtime.Types.Skip;
    recipientname: string;
    phone: string;
    label?: string | null | runtime.Types.Skip;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isPrimary?: boolean | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
};
export type AddressUpdateWithoutAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    recipientname?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    phone?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    label?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    street?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    city?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    state?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    country?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type AddressUncheckedUpdateWithoutAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    recipientname?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    phone?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    label?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    street?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    city?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    state?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    country?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type AddressUncheckedUpdateManyWithoutAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    recipientname?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    phone?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    label?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    street?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    city?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    state?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    country?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type AddressSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean | runtime.Types.Skip;
    recipientname?: boolean | runtime.Types.Skip;
    phone?: boolean | runtime.Types.Skip;
    label?: boolean | runtime.Types.Skip;
    street?: boolean | runtime.Types.Skip;
    city?: boolean | runtime.Types.Skip;
    state?: boolean | runtime.Types.Skip;
    zipCode?: boolean | runtime.Types.Skip;
    country?: boolean | runtime.Types.Skip;
    accountId?: boolean | runtime.Types.Skip;
    isPrimary?: boolean | runtime.Types.Skip;
    createdAt?: boolean | runtime.Types.Skip;
    updatedAt?: boolean | runtime.Types.Skip;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs> | runtime.Types.Skip;
}, ExtArgs["result"]["address"]>;
export type AddressSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean | runtime.Types.Skip;
    recipientname?: boolean | runtime.Types.Skip;
    phone?: boolean | runtime.Types.Skip;
    label?: boolean | runtime.Types.Skip;
    street?: boolean | runtime.Types.Skip;
    city?: boolean | runtime.Types.Skip;
    state?: boolean | runtime.Types.Skip;
    zipCode?: boolean | runtime.Types.Skip;
    country?: boolean | runtime.Types.Skip;
    accountId?: boolean | runtime.Types.Skip;
    isPrimary?: boolean | runtime.Types.Skip;
    createdAt?: boolean | runtime.Types.Skip;
    updatedAt?: boolean | runtime.Types.Skip;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs> | runtime.Types.Skip;
}, ExtArgs["result"]["address"]>;
export type AddressSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean | runtime.Types.Skip;
    recipientname?: boolean | runtime.Types.Skip;
    phone?: boolean | runtime.Types.Skip;
    label?: boolean | runtime.Types.Skip;
    street?: boolean | runtime.Types.Skip;
    city?: boolean | runtime.Types.Skip;
    state?: boolean | runtime.Types.Skip;
    zipCode?: boolean | runtime.Types.Skip;
    country?: boolean | runtime.Types.Skip;
    accountId?: boolean | runtime.Types.Skip;
    isPrimary?: boolean | runtime.Types.Skip;
    createdAt?: boolean | runtime.Types.Skip;
    updatedAt?: boolean | runtime.Types.Skip;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs> | runtime.Types.Skip;
}, ExtArgs["result"]["address"]>;
export type AddressSelectScalar = {
    id?: boolean | runtime.Types.Skip;
    recipientname?: boolean | runtime.Types.Skip;
    phone?: boolean | runtime.Types.Skip;
    label?: boolean | runtime.Types.Skip;
    street?: boolean | runtime.Types.Skip;
    city?: boolean | runtime.Types.Skip;
    state?: boolean | runtime.Types.Skip;
    zipCode?: boolean | runtime.Types.Skip;
    country?: boolean | runtime.Types.Skip;
    accountId?: boolean | runtime.Types.Skip;
    isPrimary?: boolean | runtime.Types.Skip;
    createdAt?: boolean | runtime.Types.Skip;
    updatedAt?: boolean | runtime.Types.Skip;
};
export type AddressOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "recipientname" | "phone" | "label" | "street" | "city" | "state" | "zipCode" | "country" | "accountId" | "isPrimary" | "createdAt" | "updatedAt", ExtArgs["result"]["address"], runtime.Types.Skip>;
export type AddressInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs> | runtime.Types.Skip;
};
export type AddressIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs> | runtime.Types.Skip;
};
export type AddressIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs> | runtime.Types.Skip;
};
export type $AddressPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Address";
    objects: {
        account: Prisma.$AccountPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        recipientname: string;
        phone: string;
        label: string | null;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        accountId: string;
        isPrimary: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["address"]>;
    composites: {};
};
export type AddressGetPayload<S extends boolean | null | undefined | AddressDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AddressPayload, S>;
export type AddressCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AddressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
    select?: AddressCountAggregateInputType | true;
};
export interface AddressDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Address'];
        meta: {
            name: 'Address';
        };
    };
    findUnique<T extends AddressFindUniqueArgs>(args: Prisma.SelectSubset<T, AddressFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AddressClient<runtime.Types.Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AddressFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AddressFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AddressClient<runtime.Types.Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AddressFindFirstArgs>(args?: Prisma.SelectSubset<T, AddressFindFirstArgs<ExtArgs>>): Prisma.Prisma__AddressClient<runtime.Types.Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AddressFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AddressFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AddressClient<runtime.Types.Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AddressFindManyArgs>(args?: Prisma.SelectSubset<T, AddressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AddressCreateArgs>(args: Prisma.SelectSubset<T, AddressCreateArgs<ExtArgs>>): Prisma.Prisma__AddressClient<runtime.Types.Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AddressCreateManyArgs>(args?: Prisma.SelectSubset<T, AddressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AddressCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AddressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AddressDeleteArgs>(args: Prisma.SelectSubset<T, AddressDeleteArgs<ExtArgs>>): Prisma.Prisma__AddressClient<runtime.Types.Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AddressUpdateArgs>(args: Prisma.SelectSubset<T, AddressUpdateArgs<ExtArgs>>): Prisma.Prisma__AddressClient<runtime.Types.Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AddressDeleteManyArgs>(args?: Prisma.SelectSubset<T, AddressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AddressUpdateManyArgs>(args: Prisma.SelectSubset<T, AddressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AddressUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AddressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AddressUpsertArgs>(args: Prisma.SelectSubset<T, AddressUpsertArgs<ExtArgs>>): Prisma.Prisma__AddressClient<runtime.Types.Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AddressCountArgs>(args?: Prisma.Subset<T, AddressCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AddressCountAggregateOutputType> : number>;
    aggregate<T extends AddressAggregateArgs>(args: Prisma.Subset<T, AddressAggregateArgs>): Prisma.PrismaPromise<GetAddressAggregateType<T>>;
    groupBy<T extends AddressGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AddressGroupByArgs['orderBy'];
    } : {
        orderBy?: AddressGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AddressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAddressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AddressFieldRefs;
}
export interface Prisma__AddressClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    account<T extends Prisma.AccountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AccountDefaultArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AddressFieldRefs {
    readonly id: Prisma.FieldRef<"Address", 'String'>;
    readonly recipientname: Prisma.FieldRef<"Address", 'String'>;
    readonly phone: Prisma.FieldRef<"Address", 'String'>;
    readonly label: Prisma.FieldRef<"Address", 'String'>;
    readonly street: Prisma.FieldRef<"Address", 'String'>;
    readonly city: Prisma.FieldRef<"Address", 'String'>;
    readonly state: Prisma.FieldRef<"Address", 'String'>;
    readonly zipCode: Prisma.FieldRef<"Address", 'String'>;
    readonly country: Prisma.FieldRef<"Address", 'String'>;
    readonly accountId: Prisma.FieldRef<"Address", 'String'>;
    readonly isPrimary: Prisma.FieldRef<"Address", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Address", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Address", 'DateTime'>;
}
export type AddressFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AddressSelect<ExtArgs> | null;
    omit?: Prisma.AddressOmit<ExtArgs> | null;
    include?: Prisma.AddressInclude<ExtArgs> | null;
    where: Prisma.AddressWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AddressFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AddressSelect<ExtArgs> | null;
    omit?: Prisma.AddressOmit<ExtArgs> | null;
    include?: Prisma.AddressInclude<ExtArgs> | null;
    where: Prisma.AddressWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AddressFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AddressSelect<ExtArgs> | null;
    omit?: Prisma.AddressOmit<ExtArgs> | null;
    include?: Prisma.AddressInclude<ExtArgs> | null;
    where?: Prisma.AddressWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.AddressOrderByWithRelationInput | Prisma.AddressOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.AddressWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.AddressScalarFieldEnum | Prisma.AddressScalarFieldEnum[] | runtime.Types.Skip;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AddressFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AddressSelect<ExtArgs> | null;
    omit?: Prisma.AddressOmit<ExtArgs> | null;
    include?: Prisma.AddressInclude<ExtArgs> | null;
    where?: Prisma.AddressWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.AddressOrderByWithRelationInput | Prisma.AddressOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.AddressWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.AddressScalarFieldEnum | Prisma.AddressScalarFieldEnum[] | runtime.Types.Skip;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AddressFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AddressSelect<ExtArgs> | null;
    omit?: Prisma.AddressOmit<ExtArgs> | null;
    include?: Prisma.AddressInclude<ExtArgs> | null;
    where?: Prisma.AddressWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.AddressOrderByWithRelationInput | Prisma.AddressOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.AddressWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.AddressScalarFieldEnum | Prisma.AddressScalarFieldEnum[] | runtime.Types.Skip;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AddressCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AddressSelect<ExtArgs> | null;
    omit?: Prisma.AddressOmit<ExtArgs> | null;
    include?: Prisma.AddressInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AddressCreateInput, Prisma.AddressUncheckedCreateInput>;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AddressCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AddressCreateManyInput | Prisma.AddressCreateManyInput[];
    skipDuplicates?: boolean | runtime.Types.Skip;
};
export type AddressCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AddressSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AddressOmit<ExtArgs> | null;
    data: Prisma.AddressCreateManyInput | Prisma.AddressCreateManyInput[];
    skipDuplicates?: boolean | runtime.Types.Skip;
    include?: Prisma.AddressIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AddressUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AddressSelect<ExtArgs> | null;
    omit?: Prisma.AddressOmit<ExtArgs> | null;
    include?: Prisma.AddressInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AddressUpdateInput, Prisma.AddressUncheckedUpdateInput>;
    where: Prisma.AddressWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AddressUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AddressUpdateManyMutationInput, Prisma.AddressUncheckedUpdateManyInput>;
    where?: Prisma.AddressWhereInput | runtime.Types.Skip;
    limit?: number | runtime.Types.Skip;
};
export type AddressUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AddressSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AddressOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AddressUpdateManyMutationInput, Prisma.AddressUncheckedUpdateManyInput>;
    where?: Prisma.AddressWhereInput | runtime.Types.Skip;
    limit?: number | runtime.Types.Skip;
    include?: Prisma.AddressIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AddressUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AddressSelect<ExtArgs> | null;
    omit?: Prisma.AddressOmit<ExtArgs> | null;
    include?: Prisma.AddressInclude<ExtArgs> | null;
    where: Prisma.AddressWhereUniqueInput;
    create: Prisma.XOR<Prisma.AddressCreateInput, Prisma.AddressUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AddressUpdateInput, Prisma.AddressUncheckedUpdateInput>;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AddressDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AddressSelect<ExtArgs> | null;
    omit?: Prisma.AddressOmit<ExtArgs> | null;
    include?: Prisma.AddressInclude<ExtArgs> | null;
    where: Prisma.AddressWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AddressDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AddressWhereInput | runtime.Types.Skip;
    limit?: number | runtime.Types.Skip;
};
export type AddressDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AddressSelect<ExtArgs> | null;
    omit?: Prisma.AddressOmit<ExtArgs> | null;
    include?: Prisma.AddressInclude<ExtArgs> | null;
};
export {};
