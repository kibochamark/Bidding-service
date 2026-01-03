import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AuctionModel = runtime.Types.Result.DefaultSelection<Prisma.$AuctionPayload>;
export type AggregateAuction = {
    _count: AuctionCountAggregateOutputType | null;
    _avg: AuctionAvgAggregateOutputType | null;
    _sum: AuctionSumAggregateOutputType | null;
    _min: AuctionMinAggregateOutputType | null;
    _max: AuctionMaxAggregateOutputType | null;
};
export type AuctionAvgAggregateOutputType = {
    prizeValue: runtime.Decimal | null;
    entryFee: runtime.Decimal | null;
    winningBidAmount: runtime.Decimal | null;
    totalBidsCount: number | null;
    totalRevenue: runtime.Decimal | null;
};
export type AuctionSumAggregateOutputType = {
    prizeValue: runtime.Decimal | null;
    entryFee: runtime.Decimal | null;
    winningBidAmount: runtime.Decimal | null;
    totalBidsCount: number | null;
    totalRevenue: runtime.Decimal | null;
};
export type AuctionMinAggregateOutputType = {
    id: string | null;
    productId: string | null;
    title: string | null;
    description: string | null;
    prizeValue: runtime.Decimal | null;
    entryFee: runtime.Decimal | null;
    startDate: Date | null;
    endDate: Date | null;
    status: $Enums.AuctionStatus | null;
    winnerId: string | null;
    winningBidAmount: runtime.Decimal | null;
    totalBidsCount: number | null;
    totalRevenue: runtime.Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AuctionMaxAggregateOutputType = {
    id: string | null;
    productId: string | null;
    title: string | null;
    description: string | null;
    prizeValue: runtime.Decimal | null;
    entryFee: runtime.Decimal | null;
    startDate: Date | null;
    endDate: Date | null;
    status: $Enums.AuctionStatus | null;
    winnerId: string | null;
    winningBidAmount: runtime.Decimal | null;
    totalBidsCount: number | null;
    totalRevenue: runtime.Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AuctionCountAggregateOutputType = {
    id: number;
    productId: number;
    title: number;
    description: number;
    prizeValue: number;
    entryFee: number;
    startDate: number;
    endDate: number;
    status: number;
    winnerId: number;
    winningBidAmount: number;
    totalBidsCount: number;
    totalRevenue: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type AuctionAvgAggregateInputType = {
    prizeValue?: true | runtime.Types.Skip;
    entryFee?: true | runtime.Types.Skip;
    winningBidAmount?: true | runtime.Types.Skip;
    totalBidsCount?: true | runtime.Types.Skip;
    totalRevenue?: true | runtime.Types.Skip;
};
export type AuctionSumAggregateInputType = {
    prizeValue?: true | runtime.Types.Skip;
    entryFee?: true | runtime.Types.Skip;
    winningBidAmount?: true | runtime.Types.Skip;
    totalBidsCount?: true | runtime.Types.Skip;
    totalRevenue?: true | runtime.Types.Skip;
};
export type AuctionMinAggregateInputType = {
    id?: true | runtime.Types.Skip;
    productId?: true | runtime.Types.Skip;
    title?: true | runtime.Types.Skip;
    description?: true | runtime.Types.Skip;
    prizeValue?: true | runtime.Types.Skip;
    entryFee?: true | runtime.Types.Skip;
    startDate?: true | runtime.Types.Skip;
    endDate?: true | runtime.Types.Skip;
    status?: true | runtime.Types.Skip;
    winnerId?: true | runtime.Types.Skip;
    winningBidAmount?: true | runtime.Types.Skip;
    totalBidsCount?: true | runtime.Types.Skip;
    totalRevenue?: true | runtime.Types.Skip;
    createdAt?: true | runtime.Types.Skip;
    updatedAt?: true | runtime.Types.Skip;
};
export type AuctionMaxAggregateInputType = {
    id?: true | runtime.Types.Skip;
    productId?: true | runtime.Types.Skip;
    title?: true | runtime.Types.Skip;
    description?: true | runtime.Types.Skip;
    prizeValue?: true | runtime.Types.Skip;
    entryFee?: true | runtime.Types.Skip;
    startDate?: true | runtime.Types.Skip;
    endDate?: true | runtime.Types.Skip;
    status?: true | runtime.Types.Skip;
    winnerId?: true | runtime.Types.Skip;
    winningBidAmount?: true | runtime.Types.Skip;
    totalBidsCount?: true | runtime.Types.Skip;
    totalRevenue?: true | runtime.Types.Skip;
    createdAt?: true | runtime.Types.Skip;
    updatedAt?: true | runtime.Types.Skip;
};
export type AuctionCountAggregateInputType = {
    id?: true | runtime.Types.Skip;
    productId?: true | runtime.Types.Skip;
    title?: true | runtime.Types.Skip;
    description?: true | runtime.Types.Skip;
    prizeValue?: true | runtime.Types.Skip;
    entryFee?: true | runtime.Types.Skip;
    startDate?: true | runtime.Types.Skip;
    endDate?: true | runtime.Types.Skip;
    status?: true | runtime.Types.Skip;
    winnerId?: true | runtime.Types.Skip;
    winningBidAmount?: true | runtime.Types.Skip;
    totalBidsCount?: true | runtime.Types.Skip;
    totalRevenue?: true | runtime.Types.Skip;
    createdAt?: true | runtime.Types.Skip;
    updatedAt?: true | runtime.Types.Skip;
    _all?: true | runtime.Types.Skip;
};
export type AuctionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuctionWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.AuctionOrderByWithRelationInput | Prisma.AuctionOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.AuctionWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    _count?: true | AuctionCountAggregateInputType;
    _avg?: AuctionAvgAggregateInputType;
    _sum?: AuctionSumAggregateInputType;
    _min?: AuctionMinAggregateInputType;
    _max?: AuctionMaxAggregateInputType;
};
export type GetAuctionAggregateType<T extends AuctionAggregateArgs> = {
    [P in keyof T & keyof AggregateAuction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAuction[P]> : Prisma.GetScalarType<T[P], AggregateAuction[P]>;
};
export type AuctionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuctionWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.AuctionOrderByWithAggregationInput | Prisma.AuctionOrderByWithAggregationInput[] | runtime.Types.Skip;
    by: Prisma.AuctionScalarFieldEnum[] | Prisma.AuctionScalarFieldEnum;
    having?: Prisma.AuctionScalarWhereWithAggregatesInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    _count?: AuctionCountAggregateInputType | true;
    _avg?: AuctionAvgAggregateInputType;
    _sum?: AuctionSumAggregateInputType;
    _min?: AuctionMinAggregateInputType;
    _max?: AuctionMaxAggregateInputType;
};
export type AuctionGroupByOutputType = {
    id: string;
    productId: string;
    title: string;
    description: string;
    prizeValue: runtime.Decimal;
    entryFee: runtime.Decimal;
    startDate: Date;
    endDate: Date;
    status: $Enums.AuctionStatus;
    winnerId: string | null;
    winningBidAmount: runtime.Decimal | null;
    totalBidsCount: number;
    totalRevenue: runtime.Decimal;
    createdAt: Date;
    updatedAt: Date;
    _count: AuctionCountAggregateOutputType | null;
    _avg: AuctionAvgAggregateOutputType | null;
    _sum: AuctionSumAggregateOutputType | null;
    _min: AuctionMinAggregateOutputType | null;
    _max: AuctionMaxAggregateOutputType | null;
};
type GetAuctionGroupByPayload<T extends AuctionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AuctionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AuctionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AuctionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AuctionGroupByOutputType[P]>;
}>>;
export type AuctionWhereInput = {
    AND?: Prisma.AuctionWhereInput | Prisma.AuctionWhereInput[] | runtime.Types.Skip;
    OR?: Prisma.AuctionWhereInput[] | runtime.Types.Skip;
    NOT?: Prisma.AuctionWhereInput | Prisma.AuctionWhereInput[] | runtime.Types.Skip;
    id?: Prisma.StringFilter<"Auction"> | string | runtime.Types.Skip;
    productId?: Prisma.StringFilter<"Auction"> | string | runtime.Types.Skip;
    title?: Prisma.StringFilter<"Auction"> | string | runtime.Types.Skip;
    description?: Prisma.StringFilter<"Auction"> | string | runtime.Types.Skip;
    prizeValue?: Prisma.DecimalFilter<"Auction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    entryFee?: Prisma.DecimalFilter<"Auction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    startDate?: Prisma.DateTimeFilter<"Auction"> | Date | string | runtime.Types.Skip;
    endDate?: Prisma.DateTimeFilter<"Auction"> | Date | string | runtime.Types.Skip;
    status?: Prisma.EnumAuctionStatusFilter<"Auction"> | $Enums.AuctionStatus | runtime.Types.Skip;
    winnerId?: Prisma.StringNullableFilter<"Auction"> | string | null | runtime.Types.Skip;
    winningBidAmount?: Prisma.DecimalNullableFilter<"Auction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    totalBidsCount?: Prisma.IntFilter<"Auction"> | number | runtime.Types.Skip;
    totalRevenue?: Prisma.DecimalFilter<"Auction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFilter<"Auction"> | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFilter<"Auction"> | Date | string | runtime.Types.Skip;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput> | runtime.Types.Skip;
    bids?: Prisma.BidListRelationFilter | runtime.Types.Skip;
};
export type AuctionOrderByWithRelationInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    productId?: Prisma.SortOrder | runtime.Types.Skip;
    title?: Prisma.SortOrder | runtime.Types.Skip;
    description?: Prisma.SortOrder | runtime.Types.Skip;
    prizeValue?: Prisma.SortOrder | runtime.Types.Skip;
    entryFee?: Prisma.SortOrder | runtime.Types.Skip;
    startDate?: Prisma.SortOrder | runtime.Types.Skip;
    endDate?: Prisma.SortOrder | runtime.Types.Skip;
    status?: Prisma.SortOrder | runtime.Types.Skip;
    winnerId?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    winningBidAmount?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    totalBidsCount?: Prisma.SortOrder | runtime.Types.Skip;
    totalRevenue?: Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
    product?: Prisma.ProductOrderByWithRelationInput | runtime.Types.Skip;
    bids?: Prisma.BidOrderByRelationAggregateInput | runtime.Types.Skip;
    _relevance?: Prisma.AuctionOrderByRelevanceInput | runtime.Types.Skip;
};
export type AuctionWhereUniqueInput = Prisma.AtLeast<{
    id?: string | runtime.Types.Skip;
    AND?: Prisma.AuctionWhereInput | Prisma.AuctionWhereInput[] | runtime.Types.Skip;
    OR?: Prisma.AuctionWhereInput[] | runtime.Types.Skip;
    NOT?: Prisma.AuctionWhereInput | Prisma.AuctionWhereInput[] | runtime.Types.Skip;
    productId?: Prisma.StringFilter<"Auction"> | string | runtime.Types.Skip;
    title?: Prisma.StringFilter<"Auction"> | string | runtime.Types.Skip;
    description?: Prisma.StringFilter<"Auction"> | string | runtime.Types.Skip;
    prizeValue?: Prisma.DecimalFilter<"Auction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    entryFee?: Prisma.DecimalFilter<"Auction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    startDate?: Prisma.DateTimeFilter<"Auction"> | Date | string | runtime.Types.Skip;
    endDate?: Prisma.DateTimeFilter<"Auction"> | Date | string | runtime.Types.Skip;
    status?: Prisma.EnumAuctionStatusFilter<"Auction"> | $Enums.AuctionStatus | runtime.Types.Skip;
    winnerId?: Prisma.StringNullableFilter<"Auction"> | string | null | runtime.Types.Skip;
    winningBidAmount?: Prisma.DecimalNullableFilter<"Auction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    totalBidsCount?: Prisma.IntFilter<"Auction"> | number | runtime.Types.Skip;
    totalRevenue?: Prisma.DecimalFilter<"Auction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFilter<"Auction"> | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFilter<"Auction"> | Date | string | runtime.Types.Skip;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput> | runtime.Types.Skip;
    bids?: Prisma.BidListRelationFilter | runtime.Types.Skip;
}, "id">;
export type AuctionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    productId?: Prisma.SortOrder | runtime.Types.Skip;
    title?: Prisma.SortOrder | runtime.Types.Skip;
    description?: Prisma.SortOrder | runtime.Types.Skip;
    prizeValue?: Prisma.SortOrder | runtime.Types.Skip;
    entryFee?: Prisma.SortOrder | runtime.Types.Skip;
    startDate?: Prisma.SortOrder | runtime.Types.Skip;
    endDate?: Prisma.SortOrder | runtime.Types.Skip;
    status?: Prisma.SortOrder | runtime.Types.Skip;
    winnerId?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    winningBidAmount?: Prisma.SortOrderInput | Prisma.SortOrder | runtime.Types.Skip;
    totalBidsCount?: Prisma.SortOrder | runtime.Types.Skip;
    totalRevenue?: Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
    _count?: Prisma.AuctionCountOrderByAggregateInput | runtime.Types.Skip;
    _avg?: Prisma.AuctionAvgOrderByAggregateInput | runtime.Types.Skip;
    _max?: Prisma.AuctionMaxOrderByAggregateInput | runtime.Types.Skip;
    _min?: Prisma.AuctionMinOrderByAggregateInput | runtime.Types.Skip;
    _sum?: Prisma.AuctionSumOrderByAggregateInput | runtime.Types.Skip;
};
export type AuctionScalarWhereWithAggregatesInput = {
    AND?: Prisma.AuctionScalarWhereWithAggregatesInput | Prisma.AuctionScalarWhereWithAggregatesInput[] | runtime.Types.Skip;
    OR?: Prisma.AuctionScalarWhereWithAggregatesInput[] | runtime.Types.Skip;
    NOT?: Prisma.AuctionScalarWhereWithAggregatesInput | Prisma.AuctionScalarWhereWithAggregatesInput[] | runtime.Types.Skip;
    id?: Prisma.StringWithAggregatesFilter<"Auction"> | string | runtime.Types.Skip;
    productId?: Prisma.StringWithAggregatesFilter<"Auction"> | string | runtime.Types.Skip;
    title?: Prisma.StringWithAggregatesFilter<"Auction"> | string | runtime.Types.Skip;
    description?: Prisma.StringWithAggregatesFilter<"Auction"> | string | runtime.Types.Skip;
    prizeValue?: Prisma.DecimalWithAggregatesFilter<"Auction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    entryFee?: Prisma.DecimalWithAggregatesFilter<"Auction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    startDate?: Prisma.DateTimeWithAggregatesFilter<"Auction"> | Date | string | runtime.Types.Skip;
    endDate?: Prisma.DateTimeWithAggregatesFilter<"Auction"> | Date | string | runtime.Types.Skip;
    status?: Prisma.EnumAuctionStatusWithAggregatesFilter<"Auction"> | $Enums.AuctionStatus | runtime.Types.Skip;
    winnerId?: Prisma.StringNullableWithAggregatesFilter<"Auction"> | string | null | runtime.Types.Skip;
    winningBidAmount?: Prisma.DecimalNullableWithAggregatesFilter<"Auction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    totalBidsCount?: Prisma.IntWithAggregatesFilter<"Auction"> | number | runtime.Types.Skip;
    totalRevenue?: Prisma.DecimalWithAggregatesFilter<"Auction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Auction"> | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Auction"> | Date | string | runtime.Types.Skip;
};
export type AuctionCreateInput = {
    id?: string | runtime.Types.Skip;
    title: string;
    description: string;
    prizeValue: runtime.Decimal | runtime.DecimalJsLike | number | string;
    entryFee: runtime.Decimal | runtime.DecimalJsLike | number | string;
    startDate?: Date | string | runtime.Types.Skip;
    endDate: Date | string;
    status?: $Enums.AuctionStatus | runtime.Types.Skip;
    winnerId?: string | null | runtime.Types.Skip;
    winningBidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    totalBidsCount?: number | runtime.Types.Skip;
    totalRevenue?: runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
    product: Prisma.ProductCreateNestedOneWithoutAuctionsInput;
    bids?: Prisma.BidCreateNestedManyWithoutAuctionInput | runtime.Types.Skip;
};
export type AuctionUncheckedCreateInput = {
    id?: string | runtime.Types.Skip;
    productId: string;
    title: string;
    description: string;
    prizeValue: runtime.Decimal | runtime.DecimalJsLike | number | string;
    entryFee: runtime.Decimal | runtime.DecimalJsLike | number | string;
    startDate?: Date | string | runtime.Types.Skip;
    endDate: Date | string;
    status?: $Enums.AuctionStatus | runtime.Types.Skip;
    winnerId?: string | null | runtime.Types.Skip;
    winningBidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    totalBidsCount?: number | runtime.Types.Skip;
    totalRevenue?: runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
    bids?: Prisma.BidUncheckedCreateNestedManyWithoutAuctionInput | runtime.Types.Skip;
};
export type AuctionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    title?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    description?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    prizeValue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    entryFee?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    status?: Prisma.EnumAuctionStatusFieldUpdateOperationsInput | $Enums.AuctionStatus | runtime.Types.Skip;
    winnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    winningBidAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    totalBidsCount?: Prisma.IntFieldUpdateOperationsInput | number | runtime.Types.Skip;
    totalRevenue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    product?: Prisma.ProductUpdateOneRequiredWithoutAuctionsNestedInput | runtime.Types.Skip;
    bids?: Prisma.BidUpdateManyWithoutAuctionNestedInput | runtime.Types.Skip;
};
export type AuctionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    productId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    title?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    description?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    prizeValue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    entryFee?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    status?: Prisma.EnumAuctionStatusFieldUpdateOperationsInput | $Enums.AuctionStatus | runtime.Types.Skip;
    winnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    winningBidAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    totalBidsCount?: Prisma.IntFieldUpdateOperationsInput | number | runtime.Types.Skip;
    totalRevenue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    bids?: Prisma.BidUncheckedUpdateManyWithoutAuctionNestedInput | runtime.Types.Skip;
};
export type AuctionCreateManyInput = {
    id?: string | runtime.Types.Skip;
    productId: string;
    title: string;
    description: string;
    prizeValue: runtime.Decimal | runtime.DecimalJsLike | number | string;
    entryFee: runtime.Decimal | runtime.DecimalJsLike | number | string;
    startDate?: Date | string | runtime.Types.Skip;
    endDate: Date | string;
    status?: $Enums.AuctionStatus | runtime.Types.Skip;
    winnerId?: string | null | runtime.Types.Skip;
    winningBidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    totalBidsCount?: number | runtime.Types.Skip;
    totalRevenue?: runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
};
export type AuctionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    title?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    description?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    prizeValue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    entryFee?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    status?: Prisma.EnumAuctionStatusFieldUpdateOperationsInput | $Enums.AuctionStatus | runtime.Types.Skip;
    winnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    winningBidAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    totalBidsCount?: Prisma.IntFieldUpdateOperationsInput | number | runtime.Types.Skip;
    totalRevenue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type AuctionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    productId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    title?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    description?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    prizeValue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    entryFee?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    status?: Prisma.EnumAuctionStatusFieldUpdateOperationsInput | $Enums.AuctionStatus | runtime.Types.Skip;
    winnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    winningBidAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    totalBidsCount?: Prisma.IntFieldUpdateOperationsInput | number | runtime.Types.Skip;
    totalRevenue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type AuctionListRelationFilter = {
    every?: Prisma.AuctionWhereInput | runtime.Types.Skip;
    some?: Prisma.AuctionWhereInput | runtime.Types.Skip;
    none?: Prisma.AuctionWhereInput | runtime.Types.Skip;
};
export type AuctionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder | runtime.Types.Skip;
};
export type AuctionOrderByRelevanceInput = {
    fields: Prisma.AuctionOrderByRelevanceFieldEnum | Prisma.AuctionOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type AuctionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    productId?: Prisma.SortOrder | runtime.Types.Skip;
    title?: Prisma.SortOrder | runtime.Types.Skip;
    description?: Prisma.SortOrder | runtime.Types.Skip;
    prizeValue?: Prisma.SortOrder | runtime.Types.Skip;
    entryFee?: Prisma.SortOrder | runtime.Types.Skip;
    startDate?: Prisma.SortOrder | runtime.Types.Skip;
    endDate?: Prisma.SortOrder | runtime.Types.Skip;
    status?: Prisma.SortOrder | runtime.Types.Skip;
    winnerId?: Prisma.SortOrder | runtime.Types.Skip;
    winningBidAmount?: Prisma.SortOrder | runtime.Types.Skip;
    totalBidsCount?: Prisma.SortOrder | runtime.Types.Skip;
    totalRevenue?: Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
};
export type AuctionAvgOrderByAggregateInput = {
    prizeValue?: Prisma.SortOrder | runtime.Types.Skip;
    entryFee?: Prisma.SortOrder | runtime.Types.Skip;
    winningBidAmount?: Prisma.SortOrder | runtime.Types.Skip;
    totalBidsCount?: Prisma.SortOrder | runtime.Types.Skip;
    totalRevenue?: Prisma.SortOrder | runtime.Types.Skip;
};
export type AuctionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    productId?: Prisma.SortOrder | runtime.Types.Skip;
    title?: Prisma.SortOrder | runtime.Types.Skip;
    description?: Prisma.SortOrder | runtime.Types.Skip;
    prizeValue?: Prisma.SortOrder | runtime.Types.Skip;
    entryFee?: Prisma.SortOrder | runtime.Types.Skip;
    startDate?: Prisma.SortOrder | runtime.Types.Skip;
    endDate?: Prisma.SortOrder | runtime.Types.Skip;
    status?: Prisma.SortOrder | runtime.Types.Skip;
    winnerId?: Prisma.SortOrder | runtime.Types.Skip;
    winningBidAmount?: Prisma.SortOrder | runtime.Types.Skip;
    totalBidsCount?: Prisma.SortOrder | runtime.Types.Skip;
    totalRevenue?: Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
};
export type AuctionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    productId?: Prisma.SortOrder | runtime.Types.Skip;
    title?: Prisma.SortOrder | runtime.Types.Skip;
    description?: Prisma.SortOrder | runtime.Types.Skip;
    prizeValue?: Prisma.SortOrder | runtime.Types.Skip;
    entryFee?: Prisma.SortOrder | runtime.Types.Skip;
    startDate?: Prisma.SortOrder | runtime.Types.Skip;
    endDate?: Prisma.SortOrder | runtime.Types.Skip;
    status?: Prisma.SortOrder | runtime.Types.Skip;
    winnerId?: Prisma.SortOrder | runtime.Types.Skip;
    winningBidAmount?: Prisma.SortOrder | runtime.Types.Skip;
    totalBidsCount?: Prisma.SortOrder | runtime.Types.Skip;
    totalRevenue?: Prisma.SortOrder | runtime.Types.Skip;
    createdAt?: Prisma.SortOrder | runtime.Types.Skip;
    updatedAt?: Prisma.SortOrder | runtime.Types.Skip;
};
export type AuctionSumOrderByAggregateInput = {
    prizeValue?: Prisma.SortOrder | runtime.Types.Skip;
    entryFee?: Prisma.SortOrder | runtime.Types.Skip;
    winningBidAmount?: Prisma.SortOrder | runtime.Types.Skip;
    totalBidsCount?: Prisma.SortOrder | runtime.Types.Skip;
    totalRevenue?: Prisma.SortOrder | runtime.Types.Skip;
};
export type AuctionScalarRelationFilter = {
    is?: Prisma.AuctionWhereInput | runtime.Types.Skip;
    isNot?: Prisma.AuctionWhereInput | runtime.Types.Skip;
};
export type AuctionCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.AuctionCreateWithoutProductInput, Prisma.AuctionUncheckedCreateWithoutProductInput> | Prisma.AuctionCreateWithoutProductInput[] | Prisma.AuctionUncheckedCreateWithoutProductInput[] | runtime.Types.Skip;
    connectOrCreate?: Prisma.AuctionCreateOrConnectWithoutProductInput | Prisma.AuctionCreateOrConnectWithoutProductInput[] | runtime.Types.Skip;
    createMany?: Prisma.AuctionCreateManyProductInputEnvelope | runtime.Types.Skip;
    connect?: Prisma.AuctionWhereUniqueInput | Prisma.AuctionWhereUniqueInput[] | runtime.Types.Skip;
};
export type AuctionUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.AuctionCreateWithoutProductInput, Prisma.AuctionUncheckedCreateWithoutProductInput> | Prisma.AuctionCreateWithoutProductInput[] | Prisma.AuctionUncheckedCreateWithoutProductInput[] | runtime.Types.Skip;
    connectOrCreate?: Prisma.AuctionCreateOrConnectWithoutProductInput | Prisma.AuctionCreateOrConnectWithoutProductInput[] | runtime.Types.Skip;
    createMany?: Prisma.AuctionCreateManyProductInputEnvelope | runtime.Types.Skip;
    connect?: Prisma.AuctionWhereUniqueInput | Prisma.AuctionWhereUniqueInput[] | runtime.Types.Skip;
};
export type AuctionUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.AuctionCreateWithoutProductInput, Prisma.AuctionUncheckedCreateWithoutProductInput> | Prisma.AuctionCreateWithoutProductInput[] | Prisma.AuctionUncheckedCreateWithoutProductInput[] | runtime.Types.Skip;
    connectOrCreate?: Prisma.AuctionCreateOrConnectWithoutProductInput | Prisma.AuctionCreateOrConnectWithoutProductInput[] | runtime.Types.Skip;
    upsert?: Prisma.AuctionUpsertWithWhereUniqueWithoutProductInput | Prisma.AuctionUpsertWithWhereUniqueWithoutProductInput[] | runtime.Types.Skip;
    createMany?: Prisma.AuctionCreateManyProductInputEnvelope | runtime.Types.Skip;
    set?: Prisma.AuctionWhereUniqueInput | Prisma.AuctionWhereUniqueInput[] | runtime.Types.Skip;
    disconnect?: Prisma.AuctionWhereUniqueInput | Prisma.AuctionWhereUniqueInput[] | runtime.Types.Skip;
    delete?: Prisma.AuctionWhereUniqueInput | Prisma.AuctionWhereUniqueInput[] | runtime.Types.Skip;
    connect?: Prisma.AuctionWhereUniqueInput | Prisma.AuctionWhereUniqueInput[] | runtime.Types.Skip;
    update?: Prisma.AuctionUpdateWithWhereUniqueWithoutProductInput | Prisma.AuctionUpdateWithWhereUniqueWithoutProductInput[] | runtime.Types.Skip;
    updateMany?: Prisma.AuctionUpdateManyWithWhereWithoutProductInput | Prisma.AuctionUpdateManyWithWhereWithoutProductInput[] | runtime.Types.Skip;
    deleteMany?: Prisma.AuctionScalarWhereInput | Prisma.AuctionScalarWhereInput[] | runtime.Types.Skip;
};
export type AuctionUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.AuctionCreateWithoutProductInput, Prisma.AuctionUncheckedCreateWithoutProductInput> | Prisma.AuctionCreateWithoutProductInput[] | Prisma.AuctionUncheckedCreateWithoutProductInput[] | runtime.Types.Skip;
    connectOrCreate?: Prisma.AuctionCreateOrConnectWithoutProductInput | Prisma.AuctionCreateOrConnectWithoutProductInput[] | runtime.Types.Skip;
    upsert?: Prisma.AuctionUpsertWithWhereUniqueWithoutProductInput | Prisma.AuctionUpsertWithWhereUniqueWithoutProductInput[] | runtime.Types.Skip;
    createMany?: Prisma.AuctionCreateManyProductInputEnvelope | runtime.Types.Skip;
    set?: Prisma.AuctionWhereUniqueInput | Prisma.AuctionWhereUniqueInput[] | runtime.Types.Skip;
    disconnect?: Prisma.AuctionWhereUniqueInput | Prisma.AuctionWhereUniqueInput[] | runtime.Types.Skip;
    delete?: Prisma.AuctionWhereUniqueInput | Prisma.AuctionWhereUniqueInput[] | runtime.Types.Skip;
    connect?: Prisma.AuctionWhereUniqueInput | Prisma.AuctionWhereUniqueInput[] | runtime.Types.Skip;
    update?: Prisma.AuctionUpdateWithWhereUniqueWithoutProductInput | Prisma.AuctionUpdateWithWhereUniqueWithoutProductInput[] | runtime.Types.Skip;
    updateMany?: Prisma.AuctionUpdateManyWithWhereWithoutProductInput | Prisma.AuctionUpdateManyWithWhereWithoutProductInput[] | runtime.Types.Skip;
    deleteMany?: Prisma.AuctionScalarWhereInput | Prisma.AuctionScalarWhereInput[] | runtime.Types.Skip;
};
export type EnumAuctionStatusFieldUpdateOperationsInput = {
    set?: $Enums.AuctionStatus | runtime.Types.Skip;
};
export type AuctionCreateNestedOneWithoutBidsInput = {
    create?: Prisma.XOR<Prisma.AuctionCreateWithoutBidsInput, Prisma.AuctionUncheckedCreateWithoutBidsInput> | runtime.Types.Skip;
    connectOrCreate?: Prisma.AuctionCreateOrConnectWithoutBidsInput | runtime.Types.Skip;
    connect?: Prisma.AuctionWhereUniqueInput | runtime.Types.Skip;
};
export type AuctionUpdateOneRequiredWithoutBidsNestedInput = {
    create?: Prisma.XOR<Prisma.AuctionCreateWithoutBidsInput, Prisma.AuctionUncheckedCreateWithoutBidsInput> | runtime.Types.Skip;
    connectOrCreate?: Prisma.AuctionCreateOrConnectWithoutBidsInput | runtime.Types.Skip;
    upsert?: Prisma.AuctionUpsertWithoutBidsInput | runtime.Types.Skip;
    connect?: Prisma.AuctionWhereUniqueInput | runtime.Types.Skip;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AuctionUpdateToOneWithWhereWithoutBidsInput, Prisma.AuctionUpdateWithoutBidsInput>, Prisma.AuctionUncheckedUpdateWithoutBidsInput> | runtime.Types.Skip;
};
export type AuctionCreateWithoutProductInput = {
    id?: string | runtime.Types.Skip;
    title: string;
    description: string;
    prizeValue: runtime.Decimal | runtime.DecimalJsLike | number | string;
    entryFee: runtime.Decimal | runtime.DecimalJsLike | number | string;
    startDate?: Date | string | runtime.Types.Skip;
    endDate: Date | string;
    status?: $Enums.AuctionStatus | runtime.Types.Skip;
    winnerId?: string | null | runtime.Types.Skip;
    winningBidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    totalBidsCount?: number | runtime.Types.Skip;
    totalRevenue?: runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
    bids?: Prisma.BidCreateNestedManyWithoutAuctionInput | runtime.Types.Skip;
};
export type AuctionUncheckedCreateWithoutProductInput = {
    id?: string | runtime.Types.Skip;
    title: string;
    description: string;
    prizeValue: runtime.Decimal | runtime.DecimalJsLike | number | string;
    entryFee: runtime.Decimal | runtime.DecimalJsLike | number | string;
    startDate?: Date | string | runtime.Types.Skip;
    endDate: Date | string;
    status?: $Enums.AuctionStatus | runtime.Types.Skip;
    winnerId?: string | null | runtime.Types.Skip;
    winningBidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    totalBidsCount?: number | runtime.Types.Skip;
    totalRevenue?: runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
    bids?: Prisma.BidUncheckedCreateNestedManyWithoutAuctionInput | runtime.Types.Skip;
};
export type AuctionCreateOrConnectWithoutProductInput = {
    where: Prisma.AuctionWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuctionCreateWithoutProductInput, Prisma.AuctionUncheckedCreateWithoutProductInput>;
};
export type AuctionCreateManyProductInputEnvelope = {
    data: Prisma.AuctionCreateManyProductInput | Prisma.AuctionCreateManyProductInput[];
    skipDuplicates?: boolean | runtime.Types.Skip;
};
export type AuctionUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.AuctionWhereUniqueInput;
    update: Prisma.XOR<Prisma.AuctionUpdateWithoutProductInput, Prisma.AuctionUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.AuctionCreateWithoutProductInput, Prisma.AuctionUncheckedCreateWithoutProductInput>;
};
export type AuctionUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.AuctionWhereUniqueInput;
    data: Prisma.XOR<Prisma.AuctionUpdateWithoutProductInput, Prisma.AuctionUncheckedUpdateWithoutProductInput>;
};
export type AuctionUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.AuctionScalarWhereInput;
    data: Prisma.XOR<Prisma.AuctionUpdateManyMutationInput, Prisma.AuctionUncheckedUpdateManyWithoutProductInput>;
};
export type AuctionScalarWhereInput = {
    AND?: Prisma.AuctionScalarWhereInput | Prisma.AuctionScalarWhereInput[] | runtime.Types.Skip;
    OR?: Prisma.AuctionScalarWhereInput[] | runtime.Types.Skip;
    NOT?: Prisma.AuctionScalarWhereInput | Prisma.AuctionScalarWhereInput[] | runtime.Types.Skip;
    id?: Prisma.StringFilter<"Auction"> | string | runtime.Types.Skip;
    productId?: Prisma.StringFilter<"Auction"> | string | runtime.Types.Skip;
    title?: Prisma.StringFilter<"Auction"> | string | runtime.Types.Skip;
    description?: Prisma.StringFilter<"Auction"> | string | runtime.Types.Skip;
    prizeValue?: Prisma.DecimalFilter<"Auction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    entryFee?: Prisma.DecimalFilter<"Auction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    startDate?: Prisma.DateTimeFilter<"Auction"> | Date | string | runtime.Types.Skip;
    endDate?: Prisma.DateTimeFilter<"Auction"> | Date | string | runtime.Types.Skip;
    status?: Prisma.EnumAuctionStatusFilter<"Auction"> | $Enums.AuctionStatus | runtime.Types.Skip;
    winnerId?: Prisma.StringNullableFilter<"Auction"> | string | null | runtime.Types.Skip;
    winningBidAmount?: Prisma.DecimalNullableFilter<"Auction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    totalBidsCount?: Prisma.IntFilter<"Auction"> | number | runtime.Types.Skip;
    totalRevenue?: Prisma.DecimalFilter<"Auction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFilter<"Auction"> | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFilter<"Auction"> | Date | string | runtime.Types.Skip;
};
export type AuctionCreateWithoutBidsInput = {
    id?: string | runtime.Types.Skip;
    title: string;
    description: string;
    prizeValue: runtime.Decimal | runtime.DecimalJsLike | number | string;
    entryFee: runtime.Decimal | runtime.DecimalJsLike | number | string;
    startDate?: Date | string | runtime.Types.Skip;
    endDate: Date | string;
    status?: $Enums.AuctionStatus | runtime.Types.Skip;
    winnerId?: string | null | runtime.Types.Skip;
    winningBidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    totalBidsCount?: number | runtime.Types.Skip;
    totalRevenue?: runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
    product: Prisma.ProductCreateNestedOneWithoutAuctionsInput;
};
export type AuctionUncheckedCreateWithoutBidsInput = {
    id?: string | runtime.Types.Skip;
    productId: string;
    title: string;
    description: string;
    prizeValue: runtime.Decimal | runtime.DecimalJsLike | number | string;
    entryFee: runtime.Decimal | runtime.DecimalJsLike | number | string;
    startDate?: Date | string | runtime.Types.Skip;
    endDate: Date | string;
    status?: $Enums.AuctionStatus | runtime.Types.Skip;
    winnerId?: string | null | runtime.Types.Skip;
    winningBidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    totalBidsCount?: number | runtime.Types.Skip;
    totalRevenue?: runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
};
export type AuctionCreateOrConnectWithoutBidsInput = {
    where: Prisma.AuctionWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuctionCreateWithoutBidsInput, Prisma.AuctionUncheckedCreateWithoutBidsInput>;
};
export type AuctionUpsertWithoutBidsInput = {
    update: Prisma.XOR<Prisma.AuctionUpdateWithoutBidsInput, Prisma.AuctionUncheckedUpdateWithoutBidsInput>;
    create: Prisma.XOR<Prisma.AuctionCreateWithoutBidsInput, Prisma.AuctionUncheckedCreateWithoutBidsInput>;
    where?: Prisma.AuctionWhereInput | runtime.Types.Skip;
};
export type AuctionUpdateToOneWithWhereWithoutBidsInput = {
    where?: Prisma.AuctionWhereInput | runtime.Types.Skip;
    data: Prisma.XOR<Prisma.AuctionUpdateWithoutBidsInput, Prisma.AuctionUncheckedUpdateWithoutBidsInput>;
};
export type AuctionUpdateWithoutBidsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    title?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    description?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    prizeValue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    entryFee?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    status?: Prisma.EnumAuctionStatusFieldUpdateOperationsInput | $Enums.AuctionStatus | runtime.Types.Skip;
    winnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    winningBidAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    totalBidsCount?: Prisma.IntFieldUpdateOperationsInput | number | runtime.Types.Skip;
    totalRevenue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    product?: Prisma.ProductUpdateOneRequiredWithoutAuctionsNestedInput | runtime.Types.Skip;
};
export type AuctionUncheckedUpdateWithoutBidsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    productId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    title?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    description?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    prizeValue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    entryFee?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    status?: Prisma.EnumAuctionStatusFieldUpdateOperationsInput | $Enums.AuctionStatus | runtime.Types.Skip;
    winnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    winningBidAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    totalBidsCount?: Prisma.IntFieldUpdateOperationsInput | number | runtime.Types.Skip;
    totalRevenue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type AuctionCreateManyProductInput = {
    id?: string | runtime.Types.Skip;
    title: string;
    description: string;
    prizeValue: runtime.Decimal | runtime.DecimalJsLike | number | string;
    entryFee: runtime.Decimal | runtime.DecimalJsLike | number | string;
    startDate?: Date | string | runtime.Types.Skip;
    endDate: Date | string;
    status?: $Enums.AuctionStatus | runtime.Types.Skip;
    winnerId?: string | null | runtime.Types.Skip;
    winningBidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    totalBidsCount?: number | runtime.Types.Skip;
    totalRevenue?: runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    createdAt?: Date | string | runtime.Types.Skip;
    updatedAt?: Date | string | runtime.Types.Skip;
};
export type AuctionUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    title?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    description?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    prizeValue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    entryFee?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    status?: Prisma.EnumAuctionStatusFieldUpdateOperationsInput | $Enums.AuctionStatus | runtime.Types.Skip;
    winnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    winningBidAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    totalBidsCount?: Prisma.IntFieldUpdateOperationsInput | number | runtime.Types.Skip;
    totalRevenue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    bids?: Prisma.BidUpdateManyWithoutAuctionNestedInput | runtime.Types.Skip;
};
export type AuctionUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    title?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    description?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    prizeValue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    entryFee?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    status?: Prisma.EnumAuctionStatusFieldUpdateOperationsInput | $Enums.AuctionStatus | runtime.Types.Skip;
    winnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    winningBidAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    totalBidsCount?: Prisma.IntFieldUpdateOperationsInput | number | runtime.Types.Skip;
    totalRevenue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    bids?: Prisma.BidUncheckedUpdateManyWithoutAuctionNestedInput | runtime.Types.Skip;
};
export type AuctionUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    title?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    description?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    prizeValue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    entryFee?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    status?: Prisma.EnumAuctionStatusFieldUpdateOperationsInput | $Enums.AuctionStatus | runtime.Types.Skip;
    winnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null | runtime.Types.Skip;
    winningBidAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null | runtime.Types.Skip;
    totalBidsCount?: Prisma.IntFieldUpdateOperationsInput | number | runtime.Types.Skip;
    totalRevenue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type AuctionCountOutputType = {
    bids: number;
};
export type AuctionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bids?: boolean | AuctionCountOutputTypeCountBidsArgs;
};
export type AuctionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuctionCountOutputTypeSelect<ExtArgs> | null;
};
export type AuctionCountOutputTypeCountBidsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BidWhereInput | runtime.Types.Skip;
};
export type AuctionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean | runtime.Types.Skip;
    productId?: boolean | runtime.Types.Skip;
    title?: boolean | runtime.Types.Skip;
    description?: boolean | runtime.Types.Skip;
    prizeValue?: boolean | runtime.Types.Skip;
    entryFee?: boolean | runtime.Types.Skip;
    startDate?: boolean | runtime.Types.Skip;
    endDate?: boolean | runtime.Types.Skip;
    status?: boolean | runtime.Types.Skip;
    winnerId?: boolean | runtime.Types.Skip;
    winningBidAmount?: boolean | runtime.Types.Skip;
    totalBidsCount?: boolean | runtime.Types.Skip;
    totalRevenue?: boolean | runtime.Types.Skip;
    createdAt?: boolean | runtime.Types.Skip;
    updatedAt?: boolean | runtime.Types.Skip;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs> | runtime.Types.Skip;
    bids?: boolean | Prisma.Auction$bidsArgs<ExtArgs> | runtime.Types.Skip;
    _count?: boolean | Prisma.AuctionCountOutputTypeDefaultArgs<ExtArgs> | runtime.Types.Skip;
}, ExtArgs["result"]["auction"]>;
export type AuctionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean | runtime.Types.Skip;
    productId?: boolean | runtime.Types.Skip;
    title?: boolean | runtime.Types.Skip;
    description?: boolean | runtime.Types.Skip;
    prizeValue?: boolean | runtime.Types.Skip;
    entryFee?: boolean | runtime.Types.Skip;
    startDate?: boolean | runtime.Types.Skip;
    endDate?: boolean | runtime.Types.Skip;
    status?: boolean | runtime.Types.Skip;
    winnerId?: boolean | runtime.Types.Skip;
    winningBidAmount?: boolean | runtime.Types.Skip;
    totalBidsCount?: boolean | runtime.Types.Skip;
    totalRevenue?: boolean | runtime.Types.Skip;
    createdAt?: boolean | runtime.Types.Skip;
    updatedAt?: boolean | runtime.Types.Skip;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs> | runtime.Types.Skip;
}, ExtArgs["result"]["auction"]>;
export type AuctionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean | runtime.Types.Skip;
    productId?: boolean | runtime.Types.Skip;
    title?: boolean | runtime.Types.Skip;
    description?: boolean | runtime.Types.Skip;
    prizeValue?: boolean | runtime.Types.Skip;
    entryFee?: boolean | runtime.Types.Skip;
    startDate?: boolean | runtime.Types.Skip;
    endDate?: boolean | runtime.Types.Skip;
    status?: boolean | runtime.Types.Skip;
    winnerId?: boolean | runtime.Types.Skip;
    winningBidAmount?: boolean | runtime.Types.Skip;
    totalBidsCount?: boolean | runtime.Types.Skip;
    totalRevenue?: boolean | runtime.Types.Skip;
    createdAt?: boolean | runtime.Types.Skip;
    updatedAt?: boolean | runtime.Types.Skip;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs> | runtime.Types.Skip;
}, ExtArgs["result"]["auction"]>;
export type AuctionSelectScalar = {
    id?: boolean | runtime.Types.Skip;
    productId?: boolean | runtime.Types.Skip;
    title?: boolean | runtime.Types.Skip;
    description?: boolean | runtime.Types.Skip;
    prizeValue?: boolean | runtime.Types.Skip;
    entryFee?: boolean | runtime.Types.Skip;
    startDate?: boolean | runtime.Types.Skip;
    endDate?: boolean | runtime.Types.Skip;
    status?: boolean | runtime.Types.Skip;
    winnerId?: boolean | runtime.Types.Skip;
    winningBidAmount?: boolean | runtime.Types.Skip;
    totalBidsCount?: boolean | runtime.Types.Skip;
    totalRevenue?: boolean | runtime.Types.Skip;
    createdAt?: boolean | runtime.Types.Skip;
    updatedAt?: boolean | runtime.Types.Skip;
};
export type AuctionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "productId" | "title" | "description" | "prizeValue" | "entryFee" | "startDate" | "endDate" | "status" | "winnerId" | "winningBidAmount" | "totalBidsCount" | "totalRevenue" | "createdAt" | "updatedAt", ExtArgs["result"]["auction"], runtime.Types.Skip>;
export type AuctionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs> | runtime.Types.Skip;
    bids?: boolean | Prisma.Auction$bidsArgs<ExtArgs> | runtime.Types.Skip;
    _count?: boolean | Prisma.AuctionCountOutputTypeDefaultArgs<ExtArgs> | runtime.Types.Skip;
};
export type AuctionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs> | runtime.Types.Skip;
};
export type AuctionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs> | runtime.Types.Skip;
};
export type $AuctionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Auction";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
        bids: Prisma.$BidPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        productId: string;
        title: string;
        description: string;
        prizeValue: runtime.Decimal;
        entryFee: runtime.Decimal;
        startDate: Date;
        endDate: Date;
        status: $Enums.AuctionStatus;
        winnerId: string | null;
        winningBidAmount: runtime.Decimal | null;
        totalBidsCount: number;
        totalRevenue: runtime.Decimal;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["auction"]>;
    composites: {};
};
export type AuctionGetPayload<S extends boolean | null | undefined | AuctionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AuctionPayload, S>;
export type AuctionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AuctionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
    select?: AuctionCountAggregateInputType | true;
};
export interface AuctionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Auction'];
        meta: {
            name: 'Auction';
        };
    };
    findUnique<T extends AuctionFindUniqueArgs>(args: Prisma.SelectSubset<T, AuctionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AuctionClient<runtime.Types.Result.GetResult<Prisma.$AuctionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AuctionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AuctionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuctionClient<runtime.Types.Result.GetResult<Prisma.$AuctionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AuctionFindFirstArgs>(args?: Prisma.SelectSubset<T, AuctionFindFirstArgs<ExtArgs>>): Prisma.Prisma__AuctionClient<runtime.Types.Result.GetResult<Prisma.$AuctionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AuctionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AuctionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuctionClient<runtime.Types.Result.GetResult<Prisma.$AuctionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AuctionFindManyArgs>(args?: Prisma.SelectSubset<T, AuctionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuctionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AuctionCreateArgs>(args: Prisma.SelectSubset<T, AuctionCreateArgs<ExtArgs>>): Prisma.Prisma__AuctionClient<runtime.Types.Result.GetResult<Prisma.$AuctionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AuctionCreateManyArgs>(args?: Prisma.SelectSubset<T, AuctionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AuctionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AuctionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuctionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AuctionDeleteArgs>(args: Prisma.SelectSubset<T, AuctionDeleteArgs<ExtArgs>>): Prisma.Prisma__AuctionClient<runtime.Types.Result.GetResult<Prisma.$AuctionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AuctionUpdateArgs>(args: Prisma.SelectSubset<T, AuctionUpdateArgs<ExtArgs>>): Prisma.Prisma__AuctionClient<runtime.Types.Result.GetResult<Prisma.$AuctionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AuctionDeleteManyArgs>(args?: Prisma.SelectSubset<T, AuctionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AuctionUpdateManyArgs>(args: Prisma.SelectSubset<T, AuctionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AuctionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AuctionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuctionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AuctionUpsertArgs>(args: Prisma.SelectSubset<T, AuctionUpsertArgs<ExtArgs>>): Prisma.Prisma__AuctionClient<runtime.Types.Result.GetResult<Prisma.$AuctionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AuctionCountArgs>(args?: Prisma.Subset<T, AuctionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AuctionCountAggregateOutputType> : number>;
    aggregate<T extends AuctionAggregateArgs>(args: Prisma.Subset<T, AuctionAggregateArgs>): Prisma.PrismaPromise<GetAuctionAggregateType<T>>;
    groupBy<T extends AuctionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AuctionGroupByArgs['orderBy'];
    } : {
        orderBy?: AuctionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AuctionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuctionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AuctionFieldRefs;
}
export interface Prisma__AuctionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    bids<T extends Prisma.Auction$bidsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Auction$bidsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AuctionFieldRefs {
    readonly id: Prisma.FieldRef<"Auction", 'String'>;
    readonly productId: Prisma.FieldRef<"Auction", 'String'>;
    readonly title: Prisma.FieldRef<"Auction", 'String'>;
    readonly description: Prisma.FieldRef<"Auction", 'String'>;
    readonly prizeValue: Prisma.FieldRef<"Auction", 'Decimal'>;
    readonly entryFee: Prisma.FieldRef<"Auction", 'Decimal'>;
    readonly startDate: Prisma.FieldRef<"Auction", 'DateTime'>;
    readonly endDate: Prisma.FieldRef<"Auction", 'DateTime'>;
    readonly status: Prisma.FieldRef<"Auction", 'AuctionStatus'>;
    readonly winnerId: Prisma.FieldRef<"Auction", 'String'>;
    readonly winningBidAmount: Prisma.FieldRef<"Auction", 'Decimal'>;
    readonly totalBidsCount: Prisma.FieldRef<"Auction", 'Int'>;
    readonly totalRevenue: Prisma.FieldRef<"Auction", 'Decimal'>;
    readonly createdAt: Prisma.FieldRef<"Auction", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Auction", 'DateTime'>;
}
export type AuctionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuctionSelect<ExtArgs> | null;
    omit?: Prisma.AuctionOmit<ExtArgs> | null;
    include?: Prisma.AuctionInclude<ExtArgs> | null;
    where: Prisma.AuctionWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AuctionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuctionSelect<ExtArgs> | null;
    omit?: Prisma.AuctionOmit<ExtArgs> | null;
    include?: Prisma.AuctionInclude<ExtArgs> | null;
    where: Prisma.AuctionWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AuctionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuctionSelect<ExtArgs> | null;
    omit?: Prisma.AuctionOmit<ExtArgs> | null;
    include?: Prisma.AuctionInclude<ExtArgs> | null;
    where?: Prisma.AuctionWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.AuctionOrderByWithRelationInput | Prisma.AuctionOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.AuctionWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.AuctionScalarFieldEnum | Prisma.AuctionScalarFieldEnum[] | runtime.Types.Skip;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AuctionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuctionSelect<ExtArgs> | null;
    omit?: Prisma.AuctionOmit<ExtArgs> | null;
    include?: Prisma.AuctionInclude<ExtArgs> | null;
    where?: Prisma.AuctionWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.AuctionOrderByWithRelationInput | Prisma.AuctionOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.AuctionWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.AuctionScalarFieldEnum | Prisma.AuctionScalarFieldEnum[] | runtime.Types.Skip;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AuctionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuctionSelect<ExtArgs> | null;
    omit?: Prisma.AuctionOmit<ExtArgs> | null;
    include?: Prisma.AuctionInclude<ExtArgs> | null;
    where?: Prisma.AuctionWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.AuctionOrderByWithRelationInput | Prisma.AuctionOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.AuctionWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.AuctionScalarFieldEnum | Prisma.AuctionScalarFieldEnum[] | runtime.Types.Skip;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AuctionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuctionSelect<ExtArgs> | null;
    omit?: Prisma.AuctionOmit<ExtArgs> | null;
    include?: Prisma.AuctionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuctionCreateInput, Prisma.AuctionUncheckedCreateInput>;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AuctionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AuctionCreateManyInput | Prisma.AuctionCreateManyInput[];
    skipDuplicates?: boolean | runtime.Types.Skip;
};
export type AuctionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuctionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AuctionOmit<ExtArgs> | null;
    data: Prisma.AuctionCreateManyInput | Prisma.AuctionCreateManyInput[];
    skipDuplicates?: boolean | runtime.Types.Skip;
    include?: Prisma.AuctionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AuctionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuctionSelect<ExtArgs> | null;
    omit?: Prisma.AuctionOmit<ExtArgs> | null;
    include?: Prisma.AuctionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuctionUpdateInput, Prisma.AuctionUncheckedUpdateInput>;
    where: Prisma.AuctionWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AuctionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AuctionUpdateManyMutationInput, Prisma.AuctionUncheckedUpdateManyInput>;
    where?: Prisma.AuctionWhereInput | runtime.Types.Skip;
    limit?: number | runtime.Types.Skip;
};
export type AuctionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuctionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AuctionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuctionUpdateManyMutationInput, Prisma.AuctionUncheckedUpdateManyInput>;
    where?: Prisma.AuctionWhereInput | runtime.Types.Skip;
    limit?: number | runtime.Types.Skip;
    include?: Prisma.AuctionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AuctionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuctionSelect<ExtArgs> | null;
    omit?: Prisma.AuctionOmit<ExtArgs> | null;
    include?: Prisma.AuctionInclude<ExtArgs> | null;
    where: Prisma.AuctionWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuctionCreateInput, Prisma.AuctionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AuctionUpdateInput, Prisma.AuctionUncheckedUpdateInput>;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AuctionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuctionSelect<ExtArgs> | null;
    omit?: Prisma.AuctionOmit<ExtArgs> | null;
    include?: Prisma.AuctionInclude<ExtArgs> | null;
    where: Prisma.AuctionWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type AuctionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuctionWhereInput | runtime.Types.Skip;
    limit?: number | runtime.Types.Skip;
};
export type Auction$bidsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelect<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    include?: Prisma.BidInclude<ExtArgs> | null;
    where?: Prisma.BidWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.BidOrderByWithRelationInput | Prisma.BidOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.BidWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.BidScalarFieldEnum | Prisma.BidScalarFieldEnum[] | runtime.Types.Skip;
};
export type AuctionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuctionSelect<ExtArgs> | null;
    omit?: Prisma.AuctionOmit<ExtArgs> | null;
    include?: Prisma.AuctionInclude<ExtArgs> | null;
};
export {};
