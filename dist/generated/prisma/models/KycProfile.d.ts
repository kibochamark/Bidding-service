import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type KycProfileModel = runtime.Types.Result.DefaultSelection<Prisma.$KycProfilePayload>;
export type AggregateKycProfile = {
    _count: KycProfileCountAggregateOutputType | null;
    _min: KycProfileMinAggregateOutputType | null;
    _max: KycProfileMaxAggregateOutputType | null;
};
export type KycProfileMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    status: $Enums.KycStatus | null;
    fullName: string | null;
    dateOfBirth: Date | null;
    alienIdNumber: string | null;
    idDocumentUrl: string | null;
    selfieUrl: string | null;
    rejectionReason: string | null;
    reviewedBy: string | null;
    verifiedAt: Date | null;
    accountId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type KycProfileMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    status: $Enums.KycStatus | null;
    fullName: string | null;
    dateOfBirth: Date | null;
    alienIdNumber: string | null;
    idDocumentUrl: string | null;
    selfieUrl: string | null;
    rejectionReason: string | null;
    reviewedBy: string | null;
    verifiedAt: Date | null;
    accountId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type KycProfileCountAggregateOutputType = {
    id: number;
    userId: number;
    status: number;
    fullName: number;
    dateOfBirth: number;
    alienIdNumber: number;
    idDocumentUrl: number;
    selfieUrl: number;
    rejectionReason: number;
    reviewedBy: number;
    verifiedAt: number;
    accountId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type KycProfileMinAggregateInputType = {
    id?: true | runtime.Types.Skip;
    userId?: true | runtime.Types.Skip;
    status?: true | runtime.Types.Skip;
    fullName?: true | runtime.Types.Skip;
    dateOfBirth?: true | runtime.Types.Skip;
    alienIdNumber?: true | runtime.Types.Skip;
    idDocumentUrl?: true | runtime.Types.Skip;
    selfieUrl?: true | runtime.Types.Skip;
    rejectionReason?: true | runtime.Types.Skip;
    reviewedBy?: true | runtime.Types.Skip;
    verifiedAt?: true | runtime.Types.Skip;
    accountId?: true | runtime.Types.Skip;
    createdAt?: true | runtime.Types.Skip;
    updatedAt?: true | runtime.Types.Skip;
};
export type KycProfileMaxAggregateInputType = {
    id?: true | runtime.Types.Skip;
    userId?: true | runtime.Types.Skip;
    status?: true | runtime.Types.Skip;
    fullName?: true | runtime.Types.Skip;
    dateOfBirth?: true | runtime.Types.Skip;
    alienIdNumber?: true | runtime.Types.Skip;
    idDocumentUrl?: true | runtime.Types.Skip;
    selfieUrl?: true | runtime.Types.Skip;
    rejectionReason?: true | runtime.Types.Skip;
    reviewedBy?: true | runtime.Types.Skip;
    verifiedAt?: true | runtime.Types.Skip;
    accountId?: true | runtime.Types.Skip;
    createdAt?: true | runtime.Types.Skip;
    updatedAt?: true | runtime.Types.Skip;
};
export type KycProfileCountAggregateInputType = {
    id?: true | runtime.Types.Skip;
    userId?: true | runtime.Types.Skip;
    status?: true | runtime.Types.Skip;
    fullName?: true | runtime.Types.Skip;
    dateOfBirth?: true | runtime.Types.Skip;
    alienIdNumber?: true | runtime.Types.Skip;
    idDocumentUrl?: true | runtime.Types.Skip;
    selfieUrl?: true | runtime.Types.Skip;
    rejectionReason?: true | runtime.Types.Skip;
    reviewedBy?: true | runtime.Types.Skip;
    verifiedAt?: true | runtime.Types.Skip;
    accountId?: true | runtime.Types.Skip;
    createdAt?: true | runtime.Types.Skip;
    updatedAt?: true | runtime.Types.Skip;
    _all?: true | runtime.Types.Skip;
};
export type KycProfileAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KycProfileWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.KycProfileOrderByWithRelationInput | Prisma.KycProfileOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.KycProfileWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    _count?: true | KycProfileCountAggregateInputType;
    _min?: KycProfileMinAggregateInputType;
    _max?: KycProfileMaxAggregateInputType;
};
export type GetKycProfileAggregateType<T extends KycProfileAggregateArgs> = {
    [P in keyof T & keyof AggregateKycProfile]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateKycProfile[P]> : Prisma.GetScalarType<T[P], AggregateKycProfile[P]>;
};
export type KycProfileGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KycProfileWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.KycProfileOrderByWithAggregationInput | Prisma.KycProfileOrderByWithAggregationInput[] | runtime.Types.Skip;
    by: Prisma.KycProfileScalarFieldEnum[] | Prisma.KycProfileScalarFieldEnum;
    having?: Prisma.KycProfileScalarWhereWithAggregatesInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    _count?: KycProfileCountAggregateInputType | true;
    _min?: KycProfileMinAggregateInputType;
    _max?: KycProfileMaxAggregateInputType;
};
export type KycProfileGroupByOutputType = {
    id: string;
    userId: string;
    status: $Enums.KycStatus;
    fullName: string;
    dateOfBirth: Date;
    alienIdNumber: string | null;
    idDocumentUrl: string;
    selfieUrl: string | null;
    rejectionReason: string | null;
    reviewedBy: string | null;
    verifiedAt: Date | null;
    accountId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: KycProfileCountAggregateOutputType | null;
    _min: KycProfileMinAggregateOutputType | null;
    _max: KycProfileMaxAggregateOutputType | null;
};
type GetKycProfileGroupByPayload<T extends KycProfileGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<KycProfileGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof KycProfileGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], KycProfileGroupByOutputType[P]> : Prisma.GetScalarType<T[P], KycProfileGroupByOutputType[P]>;
}>>;
export type KycProfileWhereInput = {
    AND?: Prisma.KycProfileWhereInput | Prisma.KycProfileWhereInput[] | runtime.Types.Skip;
    OR?: Prisma.KycProfileWhereInput[] | runtime.Types.Skip;
    NOT?: Prisma.KycProfileWhereInput | Prisma.KycProfileWhereInput[] | runtime.Types.Skip;
    id?: Prisma.StringFilter<"KycProfile"> | string | runtime.Types.Skip;
    userId?: Prisma.StringFilter<"KycProfile"> | string | runtime.Types.Skip;
    status?: Prisma.EnumKycStatusFilter<"KycProfile"> | $Enums.KycStatus | runtime.Types.Skip;
    fullName?: Prisma.StringFilter<"KycProfile"> | string | runtime.Types.Skip;
    dateOfBirth?: Prisma.DateTimeFilter<"KycProfile"> | Date | string | runtime.Types.Skip;
    alienIdNumber?: Prisma.StringNullableFilter<"KycProfile"> | string | null | runtime.Types.Skip;
    idDocumentUrl?: Prisma.StringFilter<"KycProfile"> | string | runtime.Types.Skip;
    selfieUrl?: Prisma.StringNullableFilter<"KycProfile"> | string | null | runtime.Types.Skip;
    rejectionReason?: Prisma.StringNullableFilter<"KycProfile"> | string | null | runtime.Types.Skip;
    reviewedBy?: Prisma.StringNullableFilter<"KycProfile"> | string | null | runtime.Types.Skip;
    verifiedAt?: Prisma.DateTimeNullableFilter<"KycProfile"> | Date | string | null | runtime.Types.Skip;
    accountId?: Prisma.StringFilter<"KycProfile"> | string | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFilter<"KycProfile"> | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFilter<"KycProfile"> | Date | string | runtime.Types.Skip;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput> | runtime.Types.Skip;
};
export type KycProfileOrderByWithRelationInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    userId?: Prisma.SortOrder | runtime.Types.Skip;
    status?: Prisma.SortOrder | runtime.Types.Skip;
    fullName?: Prisma.SortOrder | runtime.Types.Skip;
    dateOfBirth?: Prisma.SortOrder | runtime.Types.Skip;
    alienIdNumber?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    idDocumentUrl?: Prisma.SortOrder | runtime.Types.Skip;
    selfieUrl?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    rejectionReason?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    reviewedBy?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    verifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    accountId?: Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
    account?: Prisma.AccountOrderByWithRelationInput | runtime.Types.Skip;
    _relevance?: Prisma.KycProfileOrderByRelevanceInput | runtime.Types.Skip;
};
export type KycProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string | runtime.Types.Skip;
    userId?: string | runtime.Types.Skip;
    accountId?: string | runtime.Types.Skip;
    AND?: Prisma.KycProfileWhereInput | Prisma.KycProfileWhereInput[] | runtime.Types.Skip;
    OR?: Prisma.KycProfileWhereInput[] | runtime.Types.Skip;
    NOT?: Prisma.KycProfileWhereInput | Prisma.KycProfileWhereInput[] | runtime.Types.Skip;
    status?: Prisma.EnumKycStatusFilter<"KycProfile"> | $Enums.KycStatus | runtime.Types.Skip;
    fullName?: Prisma.StringFilter<"KycProfile"> | string | runtime.Types.Skip;
    dateOfBirth?: Prisma.DateTimeFilter<"KycProfile"> | Date | string | runtime.Types.Skip;
    alienIdNumber?: Prisma.StringNullableFilter<"KycProfile"> | string | null | runtime.Types.Skip;
    idDocumentUrl?: Prisma.StringFilter<"KycProfile"> | string | runtime.Types.Skip;
    selfieUrl?: Prisma.StringNullableFilter<"KycProfile"> | string | null | runtime.Types.Skip;
    rejectionReason?: Prisma.StringNullableFilter<"KycProfile"> | string | null | runtime.Types.Skip;
    reviewedBy?: Prisma.StringNullableFilter<"KycProfile"> | string | null | runtime.Types.Skip;
    verifiedAt?: Prisma.DateTimeNullableFilter<"KycProfile"> | Date | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFilter<"KycProfile"> | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFilter<"KycProfile"> | Date | string | runtime.Types.Skip;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput> | runtime.Types.Skip;
}, "id" | "userId" | "accountId">;
export type KycProfileOrderByWithAggregationInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    userId?: Prisma.SortOrder | runtime.Types.Skip;
    status?: Prisma.SortOrder | runtime.Types.Skip;
    fullName?: Prisma.SortOrder | runtime.Types.Skip;
    dateOfBirth?: Prisma.SortOrder | runtime.Types.Skip;
    alienIdNumber?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    idDocumentUrl?: Prisma.SortOrder | runtime.Types.Skip;
    selfieUrl?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    rejectionReason?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    reviewedBy?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    verifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    accountId?: Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
    _count?: Prisma.KycProfileCountOrderByAggregateInput | runtime.Types.Skip;
    _max?: Prisma.KycProfileMaxOrderByAggregateInput | runtime.Types.Skip;
    _min?: Prisma.KycProfileMinOrderByAggregateInput | runtime.Types.Skip;
};
export type KycProfileScalarWhereWithAggregatesInput = {
    AND?: Prisma.KycProfileScalarWhereWithAggregatesInput | Prisma.KycProfileScalarWhereWithAggregatesInput[] | runtime.Types.Skip;
    OR?: Prisma.KycProfileScalarWhereWithAggregatesInput[] | runtime.Types.Skip;
    NOT?: Prisma.KycProfileScalarWhereWithAggregatesInput | Prisma.KycProfileScalarWhereWithAggregatesInput[] | runtime.Types.Skip;
    id?: Prisma.StringWithAggregatesFilter<"KycProfile"> | string | runtime.Types.Skip;
    userId?: Prisma.StringWithAggregatesFilter<"KycProfile"> | string | runtime.Types.Skip;
    status?: Prisma.EnumKycStatusWithAggregatesFilter<"KycProfile"> | $Enums.KycStatus | runtime.Types.Skip;
    fullName?: Prisma.StringWithAggregatesFilter<"KycProfile"> | string | runtime.Types.Skip;
    dateOfBirth?: Prisma.DateTimeWithAggregatesFilter<"KycProfile"> | Date | string | runtime.Types.Skip;
    alienIdNumber?: Prisma.StringNullableWithAggregatesFilter<"KycProfile"> | string | null | runtime.Types.Skip;
    idDocumentUrl?: Prisma.StringWithAggregatesFilter<"KycProfile"> | string | runtime.Types.Skip;
    selfieUrl?: Prisma.StringNullableWithAggregatesFilter<"KycProfile"> | string | null | runtime.Types.Skip;
    rejectionReason?: Prisma.StringNullableWithAggregatesFilter<"KycProfile"> | string | null | runtime.Types.Skip;
    reviewedBy?: Prisma.StringNullableWithAggregatesFilter<"KycProfile"> | string | null | runtime.Types.Skip;
    verifiedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"KycProfile"> | Date | string | null | runtime.Types.Skip;
    accountId?: Prisma.StringWithAggregatesFilter<"KycProfile"> | string | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"KycProfile"> | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"KycProfile"> | Date | string | runtime.Types.Skip;
};
export type KycProfileCreateInput = {
    id?: string | runtime.Types.Skip;
    userId: string;
    status?: $Enums.KycStatus | runtime.Types.Skip;
    fullName: string;
    dateOfBirth: Date | string;
    alienIdNumber?: string | null | runtime.Types.Skip;
    idDocumentUrl: string;
    selfieUrl?: string | null | runtime.Types.Skip;
    rejectionReason?: string | null | runtime.Types.Skip;
    reviewedBy?: string | null | runtime.Types.Skip;
    verifiedAt?: Date | string | null | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
    account: Prisma.AccountCreateNestedOneWithoutKycInput;
};
export type KycProfileUncheckedCreateInput = {
    id?: string | runtime.Types.Skip;
    userId: string;
    status?: $Enums.KycStatus | runtime.Types.Skip;
    fullName: string;
    dateOfBirth: Date | string;
    alienIdNumber?: string | null | runtime.Types.Skip;
    idDocumentUrl: string;
    selfieUrl?: string | null | runtime.Types.Skip;
    rejectionReason?: string | null | runtime.Types.Skip;
    reviewedBy?: string | null | runtime.Types.Skip;
    verifiedAt?: Date | string | null | runtime.Types.Skip;
    accountId: string;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
};
export type KycProfileUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    userId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    status?: Prisma.EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus | runtime.Types.Skip;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    dateOfBirth?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    alienIdNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    idDocumentUrl?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    selfieUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    account?: Prisma.AccountUpdateOneRequiredWithoutKycNestedInput | runtime.Types.Skip;
};
export type KycProfileUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    userId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    status?: Prisma.EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus | runtime.Types.Skip;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    dateOfBirth?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    alienIdNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    idDocumentUrl?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    selfieUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null | runtime.Types.Skip;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type KycProfileCreateManyInput = {
    id?: string | runtime.Types.Skip;
    userId: string;
    status?: $Enums.KycStatus | runtime.Types.Skip;
    fullName: string;
    dateOfBirth: Date | string;
    alienIdNumber?: string | null | runtime.Types.Skip;
    idDocumentUrl: string;
    selfieUrl?: string | null | runtime.Types.Skip;
    rejectionReason?: string | null | runtime.Types.Skip;
    reviewedBy?: string | null | runtime.Types.Skip;
    verifiedAt?: Date | string | null | runtime.Types.Skip;
    accountId: string;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
};
export type KycProfileUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    userId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    status?: Prisma.EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus | runtime.Types.Skip;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    dateOfBirth?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    alienIdNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    idDocumentUrl?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    selfieUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type KycProfileUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    userId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    status?: Prisma.EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus | runtime.Types.Skip;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    dateOfBirth?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    alienIdNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    idDocumentUrl?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    selfieUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null | runtime.Types.Skip;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type KycProfileNullableScalarRelationFilter = {
    is?: Prisma.KycProfileWhereInput | null | runtime.Types.Skip;
    isNot?: Prisma.KycProfileWhereInput | null | runtime.Types.Skip;
};
export type KycProfileOrderByRelevanceInput = {
    fields: Prisma.KycProfileOrderByRelevanceFieldEnum | Prisma.KycProfileOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type KycProfileCountOrderByAggregateInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    userId?: Prisma.SortOrder | runtime.Types.Skip;
    status?: Prisma.SortOrder | runtime.Types.Skip;
    fullName?: Prisma.SortOrder | runtime.Types.Skip;
    dateOfBirth?: Prisma.SortOrder | runtime.Types.Skip;
    alienIdNumber?: Prisma.SortOrder | runtime.Types.Skip;
    idDocumentUrl?: Prisma.SortOrder | runtime.Types.Skip;
    selfieUrl?: Prisma.SortOrder | runtime.Types.Skip;
    rejectionReason?: Prisma.SortOrder | runtime.Types.Skip;
    reviewedBy?: Prisma.SortOrder | runtime.Types.Skip;
    verifiedAt?: Prisma.SortOrder | runtime.Types.Skip;
    accountId?: Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
};
export type KycProfileMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    userId?: Prisma.SortOrder | runtime.Types.Skip;
    status?: Prisma.SortOrder | runtime.Types.Skip;
    fullName?: Prisma.SortOrder | runtime.Types.Skip;
    dateOfBirth?: Prisma.SortOrder | runtime.Types.Skip;
    alienIdNumber?: Prisma.SortOrder | runtime.Types.Skip;
    idDocumentUrl?: Prisma.SortOrder | runtime.Types.Skip;
    selfieUrl?: Prisma.SortOrder | runtime.Types.Skip;
    rejectionReason?: Prisma.SortOrder | runtime.Types.Skip;
    reviewedBy?: Prisma.SortOrder | runtime.Types.Skip;
    verifiedAt?: Prisma.SortOrder | runtime.Types.Skip;
    accountId?: Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
};
export type KycProfileMinOrderByAggregateInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    userId?: Prisma.SortOrder | runtime.Types.Skip;
    status?: Prisma.SortOrder | runtime.Types.Skip;
    fullName?: Prisma.SortOrder | runtime.Types.Skip;
    dateOfBirth?: Prisma.SortOrder | runtime.Types.Skip;
    alienIdNumber?: Prisma.SortOrder | runtime.Types.Skip;
    idDocumentUrl?: Prisma.SortOrder | runtime.Types.Skip;
    selfieUrl?: Prisma.SortOrder | runtime.Types.Skip;
    rejectionReason?: Prisma.SortOrder | runtime.Types.Skip;
    reviewedBy?: Prisma.SortOrder | runtime.Types.Skip;
    verifiedAt?: Prisma.SortOrder | runtime.Types.Skip;
    accountId?: Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
};
export type KycProfileCreateNestedOneWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.KycProfileCreateWithoutAccountInput, Prisma.KycProfileUncheckedCreateWithoutAccountInput> | runtime.Types.Skip;
    connectOrCreate?: Prisma.KycProfileCreateOrConnectWithoutAccountInput | runtime.Types.Skip;
    connect?: Prisma.KycProfileWhereUniqueInput | runtime.Types.Skip;
};
export type KycProfileUncheckedCreateNestedOneWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.KycProfileCreateWithoutAccountInput, Prisma.KycProfileUncheckedCreateWithoutAccountInput> | runtime.Types.Skip;
    connectOrCreate?: Prisma.KycProfileCreateOrConnectWithoutAccountInput | runtime.Types.Skip;
    connect?: Prisma.KycProfileWhereUniqueInput | runtime.Types.Skip;
};
export type KycProfileUpdateOneWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.KycProfileCreateWithoutAccountInput, Prisma.KycProfileUncheckedCreateWithoutAccountInput> | runtime.Types.Skip;
    connectOrCreate?: Prisma.KycProfileCreateOrConnectWithoutAccountInput | runtime.Types.Skip;
    upsert?: Prisma.KycProfileUpsertWithoutAccountInput | runtime.Types.Skip;
    disconnect?: Prisma.KycProfileWhereInput | boolean | runtime.Types.Skip;
    delete?: Prisma.KycProfileWhereInput | boolean | runtime.Types.Skip;
    connect?: Prisma.KycProfileWhereUniqueInput | runtime.Types.Skip;
    update?: Prisma.XOR<Prisma.XOR<Prisma.KycProfileUpdateToOneWithWhereWithoutAccountInput, Prisma.KycProfileUpdateWithoutAccountInput>, Prisma.KycProfileUncheckedUpdateWithoutAccountInput> | runtime.Types.Skip;
};
export type KycProfileUncheckedUpdateOneWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.KycProfileCreateWithoutAccountInput, Prisma.KycProfileUncheckedCreateWithoutAccountInput> | runtime.Types.Skip;
    connectOrCreate?: Prisma.KycProfileCreateOrConnectWithoutAccountInput | runtime.Types.Skip;
    upsert?: Prisma.KycProfileUpsertWithoutAccountInput | runtime.Types.Skip;
    disconnect?: Prisma.KycProfileWhereInput | boolean | runtime.Types.Skip;
    delete?: Prisma.KycProfileWhereInput | boolean | runtime.Types.Skip;
    connect?: Prisma.KycProfileWhereUniqueInput | runtime.Types.Skip;
    update?: Prisma.XOR<Prisma.XOR<Prisma.KycProfileUpdateToOneWithWhereWithoutAccountInput, Prisma.KycProfileUpdateWithoutAccountInput>, Prisma.KycProfileUncheckedUpdateWithoutAccountInput> | runtime.Types.Skip;
};
export type EnumKycStatusFieldUpdateOperationsInput = {
    set?: $Enums.KycStatus | runtime.Types.Skip;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null | runtime.Types.Skip;
};
export type KycProfileCreateWithoutAccountInput = {
    id?: string | runtime.Types.Skip;
    userId: string;
    status?: $Enums.KycStatus | runtime.Types.Skip;
    fullName: string;
    dateOfBirth: Date | string;
    alienIdNumber?: string | null | runtime.Types.Skip;
    idDocumentUrl: string;
    selfieUrl?: string | null | runtime.Types.Skip;
    rejectionReason?: string | null | runtime.Types.Skip;
    reviewedBy?: string | null | runtime.Types.Skip;
    verifiedAt?: Date | string | null | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
};
export type KycProfileUncheckedCreateWithoutAccountInput = {
    id?: string | runtime.Types.Skip;
    userId: string;
    status?: $Enums.KycStatus | runtime.Types.Skip;
    fullName: string;
    dateOfBirth: Date | string;
    alienIdNumber?: string | null | runtime.Types.Skip;
    idDocumentUrl: string;
    selfieUrl?: string | null | runtime.Types.Skip;
    rejectionReason?: string | null | runtime.Types.Skip;
    reviewedBy?: string | null | runtime.Types.Skip;
    verifiedAt?: Date | string | null | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
};
export type KycProfileCreateOrConnectWithoutAccountInput = {
    where: Prisma.KycProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.KycProfileCreateWithoutAccountInput, Prisma.KycProfileUncheckedCreateWithoutAccountInput>;
};
export type KycProfileUpsertWithoutAccountInput = {
    update: Prisma.XOR<Prisma.KycProfileUpdateWithoutAccountInput, Prisma.KycProfileUncheckedUpdateWithoutAccountInput>;
    create: Prisma.XOR<Prisma.KycProfileCreateWithoutAccountInput, Prisma.KycProfileUncheckedCreateWithoutAccountInput>;
    where?: Prisma.KycProfileWhereInput | runtime.Types.Skip;
};
export type KycProfileUpdateToOneWithWhereWithoutAccountInput = {
    where?: Prisma.KycProfileWhereInput | runtime.Types.Skip;
    data: Prisma.XOR<Prisma.KycProfileUpdateWithoutAccountInput, Prisma.KycProfileUncheckedUpdateWithoutAccountInput>;
};
export type KycProfileUpdateWithoutAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    userId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    status?: Prisma.EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus | runtime.Types.Skip;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    dateOfBirth?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    alienIdNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    idDocumentUrl?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    selfieUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type KycProfileUncheckedUpdateWithoutAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    userId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    status?: Prisma.EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus | runtime.Types.Skip;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    dateOfBirth?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    alienIdNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    idDocumentUrl?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    selfieUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type KycProfileSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean | runtime.Types.Skip;
    userId?: boolean | runtime.Types.Skip;
    status?: boolean | runtime.Types.Skip;
    fullName?: boolean | runtime.Types.Skip;
    dateOfBirth?: boolean | runtime.Types.Skip;
    alienIdNumber?: boolean | runtime.Types.Skip;
    idDocumentUrl?: boolean | runtime.Types.Skip;
    selfieUrl?: boolean | runtime.Types.Skip;
    rejectionReason?: boolean | runtime.Types.Skip;
    reviewedBy?: boolean | runtime.Types.Skip;
    verifiedAt?: boolean | runtime.Types.Skip;
    accountId?: boolean | runtime.Types.Skip;
    createdAt?: boolean | runtime.Types.Skip;
    updatedAt?: boolean | runtime.Types.Skip;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs> | runtime.Types.Skip;
}, ExtArgs["result"]["kycProfile"]>;
export type KycProfileSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean | runtime.Types.Skip;
    userId?: boolean | runtime.Types.Skip;
    status?: boolean | runtime.Types.Skip;
    fullName?: boolean | runtime.Types.Skip;
    dateOfBirth?: boolean | runtime.Types.Skip;
    alienIdNumber?: boolean | runtime.Types.Skip;
    idDocumentUrl?: boolean | runtime.Types.Skip;
    selfieUrl?: boolean | runtime.Types.Skip;
    rejectionReason?: boolean | runtime.Types.Skip;
    reviewedBy?: boolean | runtime.Types.Skip;
    verifiedAt?: boolean | runtime.Types.Skip;
    accountId?: boolean | runtime.Types.Skip;
    createdAt?: boolean | runtime.Types.Skip;
    updatedAt?: boolean | runtime.Types.Skip;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs> | runtime.Types.Skip;
}, ExtArgs["result"]["kycProfile"]>;
export type KycProfileSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean | runtime.Types.Skip;
    userId?: boolean | runtime.Types.Skip;
    status?: boolean | runtime.Types.Skip;
    fullName?: boolean | runtime.Types.Skip;
    dateOfBirth?: boolean | runtime.Types.Skip;
    alienIdNumber?: boolean | runtime.Types.Skip;
    idDocumentUrl?: boolean | runtime.Types.Skip;
    selfieUrl?: boolean | runtime.Types.Skip;
    rejectionReason?: boolean | runtime.Types.Skip;
    reviewedBy?: boolean | runtime.Types.Skip;
    verifiedAt?: boolean | runtime.Types.Skip;
    accountId?: boolean | runtime.Types.Skip;
    createdAt?: boolean | runtime.Types.Skip;
    updatedAt?: boolean | runtime.Types.Skip;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs> | runtime.Types.Skip;
}, ExtArgs["result"]["kycProfile"]>;
export type KycProfileSelectScalar = {
    id?: boolean | runtime.Types.Skip;
    userId?: boolean | runtime.Types.Skip;
    status?: boolean | runtime.Types.Skip;
    fullName?: boolean | runtime.Types.Skip;
    dateOfBirth?: boolean | runtime.Types.Skip;
    alienIdNumber?: boolean | runtime.Types.Skip;
    idDocumentUrl?: boolean | runtime.Types.Skip;
    selfieUrl?: boolean | runtime.Types.Skip;
    rejectionReason?: boolean | runtime.Types.Skip;
    reviewedBy?: boolean | runtime.Types.Skip;
    verifiedAt?: boolean | runtime.Types.Skip;
    accountId?: boolean | runtime.Types.Skip;
    createdAt?: boolean | runtime.Types.Skip;
    updatedAt?: boolean | runtime.Types.Skip;
};
export type KycProfileOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "status" | "fullName" | "dateOfBirth" | "alienIdNumber" | "idDocumentUrl" | "selfieUrl" | "rejectionReason" | "reviewedBy" | "verifiedAt" | "accountId" | "createdAt" | "updatedAt", ExtArgs["result"]["kycProfile"], runtime.Types.Skip>;
export type KycProfileInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs> | runtime.Types.Skip;
};
export type KycProfileIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs> | runtime.Types.Skip;
};
export type KycProfileIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs> | runtime.Types.Skip;
};
export type $KycProfilePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "KycProfile";
    objects: {
        account: Prisma.$AccountPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        status: $Enums.KycStatus;
        fullName: string;
        dateOfBirth: Date;
        alienIdNumber: string | null;
        idDocumentUrl: string;
        selfieUrl: string | null;
        rejectionReason: string | null;
        reviewedBy: string | null;
        verifiedAt: Date | null;
        accountId: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["kycProfile"]>;
    composites: {};
};
export type KycProfileGetPayload<S extends boolean | null | undefined | KycProfileDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$KycProfilePayload, S>;
export type KycProfileCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<KycProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
    select?: KycProfileCountAggregateInputType | true;
};
export interface KycProfileDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['KycProfile'];
        meta: {
            name: 'KycProfile';
        };
    };
    findUnique<T extends KycProfileFindUniqueArgs>(args: Prisma.SelectSubset<T, KycProfileFindUniqueArgs<ExtArgs>>): Prisma.Prisma__KycProfileClient<runtime.Types.Result.GetResult<Prisma.$KycProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends KycProfileFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, KycProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__KycProfileClient<runtime.Types.Result.GetResult<Prisma.$KycProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends KycProfileFindFirstArgs>(args?: Prisma.SelectSubset<T, KycProfileFindFirstArgs<ExtArgs>>): Prisma.Prisma__KycProfileClient<runtime.Types.Result.GetResult<Prisma.$KycProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends KycProfileFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, KycProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__KycProfileClient<runtime.Types.Result.GetResult<Prisma.$KycProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends KycProfileFindManyArgs>(args?: Prisma.SelectSubset<T, KycProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KycProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends KycProfileCreateArgs>(args: Prisma.SelectSubset<T, KycProfileCreateArgs<ExtArgs>>): Prisma.Prisma__KycProfileClient<runtime.Types.Result.GetResult<Prisma.$KycProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends KycProfileCreateManyArgs>(args?: Prisma.SelectSubset<T, KycProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends KycProfileCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, KycProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KycProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends KycProfileDeleteArgs>(args: Prisma.SelectSubset<T, KycProfileDeleteArgs<ExtArgs>>): Prisma.Prisma__KycProfileClient<runtime.Types.Result.GetResult<Prisma.$KycProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends KycProfileUpdateArgs>(args: Prisma.SelectSubset<T, KycProfileUpdateArgs<ExtArgs>>): Prisma.Prisma__KycProfileClient<runtime.Types.Result.GetResult<Prisma.$KycProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends KycProfileDeleteManyArgs>(args?: Prisma.SelectSubset<T, KycProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends KycProfileUpdateManyArgs>(args: Prisma.SelectSubset<T, KycProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends KycProfileUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, KycProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KycProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends KycProfileUpsertArgs>(args: Prisma.SelectSubset<T, KycProfileUpsertArgs<ExtArgs>>): Prisma.Prisma__KycProfileClient<runtime.Types.Result.GetResult<Prisma.$KycProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends KycProfileCountArgs>(args?: Prisma.Subset<T, KycProfileCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], KycProfileCountAggregateOutputType> : number>;
    aggregate<T extends KycProfileAggregateArgs>(args: Prisma.Subset<T, KycProfileAggregateArgs>): Prisma.PrismaPromise<GetKycProfileAggregateType<T>>;
    groupBy<T extends KycProfileGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: KycProfileGroupByArgs['orderBy'];
    } : {
        orderBy?: KycProfileGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, KycProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKycProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: KycProfileFieldRefs;
}
export interface Prisma__KycProfileClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    account<T extends Prisma.AccountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AccountDefaultArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface KycProfileFieldRefs {
    readonly id: Prisma.FieldRef<"KycProfile", 'String'>;
    readonly userId: Prisma.FieldRef<"KycProfile", 'String'>;
    readonly status: Prisma.FieldRef<"KycProfile", 'KycStatus'>;
    readonly fullName: Prisma.FieldRef<"KycProfile", 'String'>;
    readonly dateOfBirth: Prisma.FieldRef<"KycProfile", 'DateTime'>;
    readonly alienIdNumber: Prisma.FieldRef<"KycProfile", 'String'>;
    readonly idDocumentUrl: Prisma.FieldRef<"KycProfile", 'String'>;
    readonly selfieUrl: Prisma.FieldRef<"KycProfile", 'String'>;
    readonly rejectionReason: Prisma.FieldRef<"KycProfile", 'String'>;
    readonly reviewedBy: Prisma.FieldRef<"KycProfile", 'String'>;
    readonly verifiedAt: Prisma.FieldRef<"KycProfile", 'DateTime'>;
    readonly accountId: Prisma.FieldRef<"KycProfile", 'String'>;
    readonly createdAt: Prisma.FieldRef<"KycProfile", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"KycProfile", 'DateTime'>;
}
export type KycProfileFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycProfileSelect<ExtArgs> | null;
    omit?: Prisma.KycProfileOmit<ExtArgs> | null;
    include?: Prisma.KycProfileInclude<ExtArgs> | null;
    where: Prisma.KycProfileWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type KycProfileFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycProfileSelect<ExtArgs> | null;
    omit?: Prisma.KycProfileOmit<ExtArgs> | null;
    include?: Prisma.KycProfileInclude<ExtArgs> | null;
    where: Prisma.KycProfileWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type KycProfileFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycProfileSelect<ExtArgs> | null;
    omit?: Prisma.KycProfileOmit<ExtArgs> | null;
    include?: Prisma.KycProfileInclude<ExtArgs> | null;
    where?: Prisma.KycProfileWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.KycProfileOrderByWithRelationInput | Prisma.KycProfileOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.KycProfileWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.KycProfileScalarFieldEnum | Prisma.KycProfileScalarFieldEnum[] | runtime.Types.Skip;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type KycProfileFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycProfileSelect<ExtArgs> | null;
    omit?: Prisma.KycProfileOmit<ExtArgs> | null;
    include?: Prisma.KycProfileInclude<ExtArgs> | null;
    where?: Prisma.KycProfileWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.KycProfileOrderByWithRelationInput | Prisma.KycProfileOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.KycProfileWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.KycProfileScalarFieldEnum | Prisma.KycProfileScalarFieldEnum[] | runtime.Types.Skip;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type KycProfileFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycProfileSelect<ExtArgs> | null;
    omit?: Prisma.KycProfileOmit<ExtArgs> | null;
    include?: Prisma.KycProfileInclude<ExtArgs> | null;
    where?: Prisma.KycProfileWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.KycProfileOrderByWithRelationInput | Prisma.KycProfileOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.KycProfileWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.KycProfileScalarFieldEnum | Prisma.KycProfileScalarFieldEnum[] | runtime.Types.Skip;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type KycProfileCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycProfileSelect<ExtArgs> | null;
    omit?: Prisma.KycProfileOmit<ExtArgs> | null;
    include?: Prisma.KycProfileInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.KycProfileCreateInput, Prisma.KycProfileUncheckedCreateInput>;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type KycProfileCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.KycProfileCreateManyInput | Prisma.KycProfileCreateManyInput[];
    skipDuplicates?: boolean | runtime.Types.Skip;
};
export type KycProfileCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycProfileSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.KycProfileOmit<ExtArgs> | null;
    data: Prisma.KycProfileCreateManyInput | Prisma.KycProfileCreateManyInput[];
    skipDuplicates?: boolean | runtime.Types.Skip;
    include?: Prisma.KycProfileIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type KycProfileUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycProfileSelect<ExtArgs> | null;
    omit?: Prisma.KycProfileOmit<ExtArgs> | null;
    include?: Prisma.KycProfileInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.KycProfileUpdateInput, Prisma.KycProfileUncheckedUpdateInput>;
    where: Prisma.KycProfileWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type KycProfileUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.KycProfileUpdateManyMutationInput, Prisma.KycProfileUncheckedUpdateManyInput>;
    where?: Prisma.KycProfileWhereInput | runtime.Types.Skip;
    limit?: number | runtime.Types.Skip;
};
export type KycProfileUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycProfileSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.KycProfileOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.KycProfileUpdateManyMutationInput, Prisma.KycProfileUncheckedUpdateManyInput>;
    where?: Prisma.KycProfileWhereInput | runtime.Types.Skip;
    limit?: number | runtime.Types.Skip;
    include?: Prisma.KycProfileIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type KycProfileUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycProfileSelect<ExtArgs> | null;
    omit?: Prisma.KycProfileOmit<ExtArgs> | null;
    include?: Prisma.KycProfileInclude<ExtArgs> | null;
    where: Prisma.KycProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.KycProfileCreateInput, Prisma.KycProfileUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.KycProfileUpdateInput, Prisma.KycProfileUncheckedUpdateInput>;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type KycProfileDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycProfileSelect<ExtArgs> | null;
    omit?: Prisma.KycProfileOmit<ExtArgs> | null;
    include?: Prisma.KycProfileInclude<ExtArgs> | null;
    where: Prisma.KycProfileWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type KycProfileDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KycProfileWhereInput | runtime.Types.Skip;
    limit?: number | runtime.Types.Skip;
};
export type KycProfileDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycProfileSelect<ExtArgs> | null;
    omit?: Prisma.KycProfileOmit<ExtArgs> | null;
    include?: Prisma.KycProfileInclude<ExtArgs> | null;
};
export {};
