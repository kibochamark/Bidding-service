import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BidModel = runtime.Types.Result.DefaultSelection<Prisma.$BidPayload>;
export type AggregateBid = {
    _count: BidCountAggregateOutputType | null;
    _avg: BidAvgAggregateOutputType | null;
    _sum: BidSumAggregateOutputType | null;
    _min: BidMinAggregateOutputType | null;
    _max: BidMaxAggregateOutputType | null;
};
export type BidAvgAggregateOutputType = {
    bidAmount: runtime.Decimal | null;
};
export type BidSumAggregateOutputType = {
    bidAmount: runtime.Decimal | null;
};
export type BidMinAggregateOutputType = {
    id: string | null;
    auctionId: string | null;
    bidderId: string | null;
    bidderName: string | null;
    bidAmount: runtime.Decimal | null;
    isUnique: boolean | null;
    isWinning: boolean | null;
    placedAt: Date | null;
};
export type BidMaxAggregateOutputType = {
    id: string | null;
    auctionId: string | null;
    bidderId: string | null;
    bidderName: string | null;
    bidAmount: runtime.Decimal | null;
    isUnique: boolean | null;
    isWinning: boolean | null;
    placedAt: Date | null;
};
export type BidCountAggregateOutputType = {
    id: number;
    auctionId: number;
    bidderId: number;
    bidderName: number;
    bidAmount: number;
    isUnique: number;
    isWinning: number;
    placedAt: number;
    _all: number;
};
export type BidAvgAggregateInputType = {
    bidAmount?: true | runtime.Types.Skip;
};
export type BidSumAggregateInputType = {
    bidAmount?: true | runtime.Types.Skip;
};
export type BidMinAggregateInputType = {
    id?: true | runtime.Types.Skip;
    auctionId?: true | runtime.Types.Skip;
    bidderId?: true | runtime.Types.Skip;
    bidderName?: true | runtime.Types.Skip;
    bidAmount?: true | runtime.Types.Skip;
    isUnique?: true | runtime.Types.Skip;
    isWinning?: true | runtime.Types.Skip;
    placedAt?: true | runtime.Types.Skip;
};
export type BidMaxAggregateInputType = {
    id?: true | runtime.Types.Skip;
    auctionId?: true | runtime.Types.Skip;
    bidderId?: true | runtime.Types.Skip;
    bidderName?: true | runtime.Types.Skip;
    bidAmount?: true | runtime.Types.Skip;
    isUnique?: true | runtime.Types.Skip;
    isWinning?: true | runtime.Types.Skip;
    placedAt?: true | runtime.Types.Skip;
};
export type BidCountAggregateInputType = {
    id?: true | runtime.Types.Skip;
    auctionId?: true | runtime.Types.Skip;
    bidderId?: true | runtime.Types.Skip;
    bidderName?: true | runtime.Types.Skip;
    bidAmount?: true | runtime.Types.Skip;
    isUnique?: true | runtime.Types.Skip;
    isWinning?: true | runtime.Types.Skip;
    placedAt?: true | runtime.Types.Skip;
    _all?: true | runtime.Types.Skip;
};
export type BidAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BidWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.BidOrderByWithRelationInput | Prisma.BidOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.BidWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    _count?: true | BidCountAggregateInputType;
    _avg?: BidAvgAggregateInputType;
    _sum?: BidSumAggregateInputType;
    _min?: BidMinAggregateInputType;
    _max?: BidMaxAggregateInputType;
};
export type GetBidAggregateType<T extends BidAggregateArgs> = {
    [P in keyof T & keyof AggregateBid]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBid[P]> : Prisma.GetScalarType<T[P], AggregateBid[P]>;
};
export type BidGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BidWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.BidOrderByWithAggregationInput | Prisma.BidOrderByWithAggregationInput[] | runtime.Types.Skip;
    by: Prisma.BidScalarFieldEnum[] | Prisma.BidScalarFieldEnum;
    having?: Prisma.BidScalarWhereWithAggregatesInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    _count?: BidCountAggregateInputType | true;
    _avg?: BidAvgAggregateInputType;
    _sum?: BidSumAggregateInputType;
    _min?: BidMinAggregateInputType;
    _max?: BidMaxAggregateInputType;
};
export type BidGroupByOutputType = {
    id: string;
    auctionId: string;
    bidderId: string;
    bidderName: string;
    bidAmount: runtime.Decimal;
    isUnique: boolean;
    isWinning: boolean;
    placedAt: Date;
    _count: BidCountAggregateOutputType | null;
    _avg: BidAvgAggregateOutputType | null;
    _sum: BidSumAggregateOutputType | null;
    _min: BidMinAggregateOutputType | null;
    _max: BidMaxAggregateOutputType | null;
};
type GetBidGroupByPayload<T extends BidGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BidGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BidGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BidGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BidGroupByOutputType[P]>;
}>>;
export type BidWhereInput = {
    AND?: Prisma.BidWhereInput | Prisma.BidWhereInput[] | runtime.Types.Skip;
    OR?: Prisma.BidWhereInput[] | runtime.Types.Skip;
    NOT?: Prisma.BidWhereInput | Prisma.BidWhereInput[] | runtime.Types.Skip;
    id?: Prisma.StringFilter<"Bid"> | string | runtime.Types.Skip;
    auctionId?: Prisma.StringFilter<"Bid"> | string | runtime.Types.Skip;
    bidderId?: Prisma.StringFilter<"Bid"> | string | runtime.Types.Skip;
    bidderName?: Prisma.StringFilter<"Bid"> | string | runtime.Types.Skip;
    bidAmount?: Prisma.DecimalFilter<"Bid"> | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    isUnique?: Prisma.BoolFilter<"Bid"> | boolean | runtime.Types.Skip;
    isWinning?: Prisma.BoolFilter<"Bid"> | boolean | runtime.Types.Skip;
    placedAt?: Prisma.DateTimeFilter<"Bid"> | Date | string | runtime.Types.Skip;
    auction?: Prisma.XOR<Prisma.AuctionScalarRelationFilter, Prisma.AuctionWhereInput> | runtime.Types.Skip;
};
export type BidOrderByWithRelationInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    auctionId?: Prisma.SortOrder | runtime.Types.Skip;
    bidderId?: Prisma.SortOrder | runtime.Types.Skip;
    bidderName?: Prisma.SortOrder | runtime.Types.Skip;
    bidAmount?: Prisma.SortOrder | runtime.Types.Skip;
    isUnique?: Prisma.SortOrder | runtime.Types.Skip;
    isWinning?: Prisma.SortOrder | runtime.Types.Skip;
    placedAt?: Prisma.SortOrder | runtime.Types.Skip;
    auction?: Prisma.AuctionOrderByWithRelationInput | runtime.Types.Skip;
    _relevance?: Prisma.BidOrderByRelevanceInput | runtime.Types.Skip;
};
export type BidWhereUniqueInput = Prisma.AtLeast<{
    id?: string | runtime.Types.Skip;
    auctionId_bidderId?: Prisma.BidAuctionIdBidderIdCompoundUniqueInput | runtime.Types.Skip;
    AND?: Prisma.BidWhereInput | Prisma.BidWhereInput[] | runtime.Types.Skip;
    OR?: Prisma.BidWhereInput[] | runtime.Types.Skip;
    NOT?: Prisma.BidWhereInput | Prisma.BidWhereInput[] | runtime.Types.Skip;
    auctionId?: Prisma.StringFilter<"Bid"> | string | runtime.Types.Skip;
    bidderId?: Prisma.StringFilter<"Bid"> | string | runtime.Types.Skip;
    bidderName?: Prisma.StringFilter<"Bid"> | string | runtime.Types.Skip;
    bidAmount?: Prisma.DecimalFilter<"Bid"> | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    isUnique?: Prisma.BoolFilter<"Bid"> | boolean | runtime.Types.Skip;
    isWinning?: Prisma.BoolFilter<"Bid"> | boolean | runtime.Types.Skip;
    placedAt?: Prisma.DateTimeFilter<"Bid"> | Date | string | runtime.Types.Skip;
    auction?: Prisma.XOR<Prisma.AuctionScalarRelationFilter, Prisma.AuctionWhereInput> | runtime.Types.Skip;
}, "id" | "auctionId_bidderId">;
export type BidOrderByWithAggregationInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    auctionId?: Prisma.SortOrder | runtime.Types.Skip;
    bidderId?: Prisma.SortOrder | runtime.Types.Skip;
    bidderName?: Prisma.SortOrder | runtime.Types.Skip;
    bidAmount?: Prisma.SortOrder | runtime.Types.Skip;
    isUnique?: Prisma.SortOrder | runtime.Types.Skip;
    isWinning?: Prisma.SortOrder | runtime.Types.Skip;
    placedAt?: Prisma.SortOrder | runtime.Types.Skip;
    _count?: Prisma.BidCountOrderByAggregateInput | runtime.Types.Skip;
    _avg?: Prisma.BidAvgOrderByAggregateInput | runtime.Types.Skip;
    _max?: Prisma.BidMaxOrderByAggregateInput | runtime.Types.Skip;
    _min?: Prisma.BidMinOrderByAggregateInput | runtime.Types.Skip;
    _sum?: Prisma.BidSumOrderByAggregateInput | runtime.Types.Skip;
};
export type BidScalarWhereWithAggregatesInput = {
    AND?: Prisma.BidScalarWhereWithAggregatesInput | Prisma.BidScalarWhereWithAggregatesInput[] | runtime.Types.Skip;
    OR?: Prisma.BidScalarWhereWithAggregatesInput[] | runtime.Types.Skip;
    NOT?: Prisma.BidScalarWhereWithAggregatesInput | Prisma.BidScalarWhereWithAggregatesInput[] | runtime.Types.Skip;
    id?: Prisma.StringWithAggregatesFilter<"Bid"> | string | runtime.Types.Skip;
    auctionId?: Prisma.StringWithAggregatesFilter<"Bid"> | string | runtime.Types.Skip;
    bidderId?: Prisma.StringWithAggregatesFilter<"Bid"> | string | runtime.Types.Skip;
    bidderName?: Prisma.StringWithAggregatesFilter<"Bid"> | string | runtime.Types.Skip;
    bidAmount?: Prisma.DecimalWithAggregatesFilter<"Bid"> | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    isUnique?: Prisma.BoolWithAggregatesFilter<"Bid"> | boolean | runtime.Types.Skip;
    isWinning?: Prisma.BoolWithAggregatesFilter<"Bid"> | boolean | runtime.Types.Skip;
    placedAt?: Prisma.DateTimeWithAggregatesFilter<"Bid"> | Date | string | runtime.Types.Skip;
};
export type BidCreateInput = {
    id?: string | runtime.Types.Skip;
    bidderId: string;
    bidderName: string;
    bidAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    isUnique?: boolean | runtime.Types.Skip;
    isWinning?: boolean | runtime.Types.Skip;
    placedAt?: Date | string | runtime.Types.Skip;
    auction: Prisma.AuctionCreateNestedOneWithoutBidsInput;
};
export type BidUncheckedCreateInput = {
    id?: string | runtime.Types.Skip;
    auctionId: string;
    bidderId: string;
    bidderName: string;
    bidAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    isUnique?: boolean | runtime.Types.Skip;
    isWinning?: boolean | runtime.Types.Skip;
    placedAt?: Date | string | runtime.Types.Skip;
};
export type BidUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    bidderId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    bidderName?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    bidAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    isUnique?: Prisma.BoolFieldUpdateOperationsInput | boolean | runtime.Types.Skip;
    isWinning?: Prisma.BoolFieldUpdateOperationsInput | boolean | runtime.Types.Skip;
    placedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
    auction?: Prisma.AuctionUpdateOneRequiredWithoutBidsNestedInput | runtime.Types.Skip;
};
export type BidUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    auctionId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    bidderId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    bidderName?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    bidAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    isUnique?: Prisma.BoolFieldUpdateOperationsInput | boolean | runtime.Types.Skip;
    isWinning?: Prisma.BoolFieldUpdateOperationsInput | boolean | runtime.Types.Skip;
    placedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type BidCreateManyInput = {
    id?: string | runtime.Types.Skip;
    auctionId: string;
    bidderId: string;
    bidderName: string;
    bidAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    isUnique?: boolean | runtime.Types.Skip;
    isWinning?: boolean | runtime.Types.Skip;
    placedAt?: Date | string | runtime.Types.Skip;
};
export type BidUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    bidderId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    bidderName?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    bidAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    isUnique?: Prisma.BoolFieldUpdateOperationsInput | boolean | runtime.Types.Skip;
    isWinning?: Prisma.BoolFieldUpdateOperationsInput | boolean | runtime.Types.Skip;
    placedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type BidUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    auctionId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    bidderId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    bidderName?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    bidAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    isUnique?: Prisma.BoolFieldUpdateOperationsInput | boolean | runtime.Types.Skip;
    isWinning?: Prisma.BoolFieldUpdateOperationsInput | boolean | runtime.Types.Skip;
    placedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type BidListRelationFilter = {
    every?: Prisma.BidWhereInput | runtime.Types.Skip;
    some?: Prisma.BidWhereInput | runtime.Types.Skip;
    none?: Prisma.BidWhereInput | runtime.Types.Skip;
};
export type BidOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder | runtime.Types.Skip;
};
export type BidOrderByRelevanceInput = {
    fields: Prisma.BidOrderByRelevanceFieldEnum | Prisma.BidOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type BidAuctionIdBidderIdCompoundUniqueInput = {
    auctionId: string;
    bidderId: string;
};
export type BidCountOrderByAggregateInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    auctionId?: Prisma.SortOrder | runtime.Types.Skip;
    bidderId?: Prisma.SortOrder | runtime.Types.Skip;
    bidderName?: Prisma.SortOrder | runtime.Types.Skip;
    bidAmount?: Prisma.SortOrder | runtime.Types.Skip;
    isUnique?: Prisma.SortOrder | runtime.Types.Skip;
    isWinning?: Prisma.SortOrder | runtime.Types.Skip;
    placedAt?: Prisma.SortOrder | runtime.Types.Skip;
};
export type BidAvgOrderByAggregateInput = {
    bidAmount?: Prisma.SortOrder | runtime.Types.Skip;
};
export type BidMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    auctionId?: Prisma.SortOrder | runtime.Types.Skip;
    bidderId?: Prisma.SortOrder | runtime.Types.Skip;
    bidderName?: Prisma.SortOrder | runtime.Types.Skip;
    bidAmount?: Prisma.SortOrder | runtime.Types.Skip;
    isUnique?: Prisma.SortOrder | runtime.Types.Skip;
    isWinning?: Prisma.SortOrder | runtime.Types.Skip;
    placedAt?: Prisma.SortOrder | runtime.Types.Skip;
};
export type BidMinOrderByAggregateInput = {
    id?: Prisma.SortOrder | runtime.Types.Skip;
    auctionId?: Prisma.SortOrder | runtime.Types.Skip;
    bidderId?: Prisma.SortOrder | runtime.Types.Skip;
    bidderName?: Prisma.SortOrder | runtime.Types.Skip;
    bidAmount?: Prisma.SortOrder | runtime.Types.Skip;
    isUnique?: Prisma.SortOrder | runtime.Types.Skip;
    isWinning?: Prisma.SortOrder | runtime.Types.Skip;
    placedAt?: Prisma.SortOrder | runtime.Types.Skip;
};
export type BidSumOrderByAggregateInput = {
    bidAmount?: Prisma.SortOrder | runtime.Types.Skip;
};
export type BidCreateNestedManyWithoutAuctionInput = {
    create?: Prisma.XOR<Prisma.BidCreateWithoutAuctionInput, Prisma.BidUncheckedCreateWithoutAuctionInput> | Prisma.BidCreateWithoutAuctionInput[] | Prisma.BidUncheckedCreateWithoutAuctionInput[] | runtime.Types.Skip;
    connectOrCreate?: Prisma.BidCreateOrConnectWithoutAuctionInput | Prisma.BidCreateOrConnectWithoutAuctionInput[] | runtime.Types.Skip;
    createMany?: Prisma.BidCreateManyAuctionInputEnvelope | runtime.Types.Skip;
    connect?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[] | runtime.Types.Skip;
};
export type BidUncheckedCreateNestedManyWithoutAuctionInput = {
    create?: Prisma.XOR<Prisma.BidCreateWithoutAuctionInput, Prisma.BidUncheckedCreateWithoutAuctionInput> | Prisma.BidCreateWithoutAuctionInput[] | Prisma.BidUncheckedCreateWithoutAuctionInput[] | runtime.Types.Skip;
    connectOrCreate?: Prisma.BidCreateOrConnectWithoutAuctionInput | Prisma.BidCreateOrConnectWithoutAuctionInput[] | runtime.Types.Skip;
    createMany?: Prisma.BidCreateManyAuctionInputEnvelope | runtime.Types.Skip;
    connect?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[] | runtime.Types.Skip;
};
export type BidUpdateManyWithoutAuctionNestedInput = {
    create?: Prisma.XOR<Prisma.BidCreateWithoutAuctionInput, Prisma.BidUncheckedCreateWithoutAuctionInput> | Prisma.BidCreateWithoutAuctionInput[] | Prisma.BidUncheckedCreateWithoutAuctionInput[] | runtime.Types.Skip;
    connectOrCreate?: Prisma.BidCreateOrConnectWithoutAuctionInput | Prisma.BidCreateOrConnectWithoutAuctionInput[] | runtime.Types.Skip;
    upsert?: Prisma.BidUpsertWithWhereUniqueWithoutAuctionInput | Prisma.BidUpsertWithWhereUniqueWithoutAuctionInput[] | runtime.Types.Skip;
    createMany?: Prisma.BidCreateManyAuctionInputEnvelope | runtime.Types.Skip;
    set?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[] | runtime.Types.Skip;
    disconnect?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[] | runtime.Types.Skip;
    delete?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[] | runtime.Types.Skip;
    connect?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[] | runtime.Types.Skip;
    update?: Prisma.BidUpdateWithWhereUniqueWithoutAuctionInput | Prisma.BidUpdateWithWhereUniqueWithoutAuctionInput[] | runtime.Types.Skip;
    updateMany?: Prisma.BidUpdateManyWithWhereWithoutAuctionInput | Prisma.BidUpdateManyWithWhereWithoutAuctionInput[] | runtime.Types.Skip;
    deleteMany?: Prisma.BidScalarWhereInput | Prisma.BidScalarWhereInput[] | runtime.Types.Skip;
};
export type BidUncheckedUpdateManyWithoutAuctionNestedInput = {
    create?: Prisma.XOR<Prisma.BidCreateWithoutAuctionInput, Prisma.BidUncheckedCreateWithoutAuctionInput> | Prisma.BidCreateWithoutAuctionInput[] | Prisma.BidUncheckedCreateWithoutAuctionInput[] | runtime.Types.Skip;
    connectOrCreate?: Prisma.BidCreateOrConnectWithoutAuctionInput | Prisma.BidCreateOrConnectWithoutAuctionInput[] | runtime.Types.Skip;
    upsert?: Prisma.BidUpsertWithWhereUniqueWithoutAuctionInput | Prisma.BidUpsertWithWhereUniqueWithoutAuctionInput[] | runtime.Types.Skip;
    createMany?: Prisma.BidCreateManyAuctionInputEnvelope | runtime.Types.Skip;
    set?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[] | runtime.Types.Skip;
    disconnect?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[] | runtime.Types.Skip;
    delete?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[] | runtime.Types.Skip;
    connect?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[] | runtime.Types.Skip;
    update?: Prisma.BidUpdateWithWhereUniqueWithoutAuctionInput | Prisma.BidUpdateWithWhereUniqueWithoutAuctionInput[] | runtime.Types.Skip;
    updateMany?: Prisma.BidUpdateManyWithWhereWithoutAuctionInput | Prisma.BidUpdateManyWithWhereWithoutAuctionInput[] | runtime.Types.Skip;
    deleteMany?: Prisma.BidScalarWhereInput | Prisma.BidScalarWhereInput[] | runtime.Types.Skip;
};
export type BidCreateWithoutAuctionInput = {
    id?: string | runtime.Types.Skip;
    bidderId: string;
    bidderName: string;
    bidAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    isUnique?: boolean | runtime.Types.Skip;
    isWinning?: boolean | runtime.Types.Skip;
    placedAt?: Date | string | runtime.Types.Skip;
};
export type BidUncheckedCreateWithoutAuctionInput = {
    id?: string | runtime.Types.Skip;
    bidderId: string;
    bidderName: string;
    bidAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    isUnique?: boolean | runtime.Types.Skip;
    isWinning?: boolean | runtime.Types.Skip;
    placedAt?: Date | string | runtime.Types.Skip;
};
export type BidCreateOrConnectWithoutAuctionInput = {
    where: Prisma.BidWhereUniqueInput;
    create: Prisma.XOR<Prisma.BidCreateWithoutAuctionInput, Prisma.BidUncheckedCreateWithoutAuctionInput>;
};
export type BidCreateManyAuctionInputEnvelope = {
    data: Prisma.BidCreateManyAuctionInput | Prisma.BidCreateManyAuctionInput[];
    skipDuplicates?: boolean | runtime.Types.Skip;
};
export type BidUpsertWithWhereUniqueWithoutAuctionInput = {
    where: Prisma.BidWhereUniqueInput;
    update: Prisma.XOR<Prisma.BidUpdateWithoutAuctionInput, Prisma.BidUncheckedUpdateWithoutAuctionInput>;
    create: Prisma.XOR<Prisma.BidCreateWithoutAuctionInput, Prisma.BidUncheckedCreateWithoutAuctionInput>;
};
export type BidUpdateWithWhereUniqueWithoutAuctionInput = {
    where: Prisma.BidWhereUniqueInput;
    data: Prisma.XOR<Prisma.BidUpdateWithoutAuctionInput, Prisma.BidUncheckedUpdateWithoutAuctionInput>;
};
export type BidUpdateManyWithWhereWithoutAuctionInput = {
    where: Prisma.BidScalarWhereInput;
    data: Prisma.XOR<Prisma.BidUpdateManyMutationInput, Prisma.BidUncheckedUpdateManyWithoutAuctionInput>;
};
export type BidScalarWhereInput = {
    AND?: Prisma.BidScalarWhereInput | Prisma.BidScalarWhereInput[] | runtime.Types.Skip;
    OR?: Prisma.BidScalarWhereInput[] | runtime.Types.Skip;
    NOT?: Prisma.BidScalarWhereInput | Prisma.BidScalarWhereInput[] | runtime.Types.Skip;
    id?: Prisma.StringFilter<"Bid"> | string | runtime.Types.Skip;
    auctionId?: Prisma.StringFilter<"Bid"> | string | runtime.Types.Skip;
    bidderId?: Prisma.StringFilter<"Bid"> | string | runtime.Types.Skip;
    bidderName?: Prisma.StringFilter<"Bid"> | string | runtime.Types.Skip;
    bidAmount?: Prisma.DecimalFilter<"Bid"> | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    isUnique?: Prisma.BoolFilter<"Bid"> | boolean | runtime.Types.Skip;
    isWinning?: Prisma.BoolFilter<"Bid"> | boolean | runtime.Types.Skip;
    placedAt?: Prisma.DateTimeFilter<"Bid"> | Date | string | runtime.Types.Skip;
};
export type BidCreateManyAuctionInput = {
    id?: string | runtime.Types.Skip;
    bidderId: string;
    bidderName: string;
    bidAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    isUnique?: boolean | runtime.Types.Skip;
    isWinning?: boolean | runtime.Types.Skip;
    placedAt?: Date | string | runtime.Types.Skip;
};
export type BidUpdateWithoutAuctionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    bidderId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    bidderName?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    bidAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    isUnique?: Prisma.BoolFieldUpdateOperationsInput | boolean | runtime.Types.Skip;
    isWinning?: Prisma.BoolFieldUpdateOperationsInput | boolean | runtime.Types.Skip;
    placedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type BidUncheckedUpdateWithoutAuctionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    bidderId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    bidderName?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    bidAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    isUnique?: Prisma.BoolFieldUpdateOperationsInput | boolean | runtime.Types.Skip;
    isWinning?: Prisma.BoolFieldUpdateOperationsInput | boolean | runtime.Types.Skip;
    placedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type BidUncheckedUpdateManyWithoutAuctionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    bidderId?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    bidderName?: Prisma.StringFieldUpdateOperationsInput | string | runtime.Types.Skip;
    bidAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | runtime.Types.Skip;
    isUnique?: Prisma.BoolFieldUpdateOperationsInput | boolean | runtime.Types.Skip;
    isWinning?: Prisma.BoolFieldUpdateOperationsInput | boolean | runtime.Types.Skip;
    placedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string | runtime.Types.Skip;
};
export type BidSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean | runtime.Types.Skip;
    auctionId?: boolean | runtime.Types.Skip;
    bidderId?: boolean | runtime.Types.Skip;
    bidderName?: boolean | runtime.Types.Skip;
    bidAmount?: boolean | runtime.Types.Skip;
    isUnique?: boolean | runtime.Types.Skip;
    isWinning?: boolean | runtime.Types.Skip;
    placedAt?: boolean | runtime.Types.Skip;
    auction?: boolean | Prisma.AuctionDefaultArgs<ExtArgs> | runtime.Types.Skip;
}, ExtArgs["result"]["bid"]>;
export type BidSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean | runtime.Types.Skip;
    auctionId?: boolean | runtime.Types.Skip;
    bidderId?: boolean | runtime.Types.Skip;
    bidderName?: boolean | runtime.Types.Skip;
    bidAmount?: boolean | runtime.Types.Skip;
    isUnique?: boolean | runtime.Types.Skip;
    isWinning?: boolean | runtime.Types.Skip;
    placedAt?: boolean | runtime.Types.Skip;
    auction?: boolean | Prisma.AuctionDefaultArgs<ExtArgs> | runtime.Types.Skip;
}, ExtArgs["result"]["bid"]>;
export type BidSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean | runtime.Types.Skip;
    auctionId?: boolean | runtime.Types.Skip;
    bidderId?: boolean | runtime.Types.Skip;
    bidderName?: boolean | runtime.Types.Skip;
    bidAmount?: boolean | runtime.Types.Skip;
    isUnique?: boolean | runtime.Types.Skip;
    isWinning?: boolean | runtime.Types.Skip;
    placedAt?: boolean | runtime.Types.Skip;
    auction?: boolean | Prisma.AuctionDefaultArgs<ExtArgs> | runtime.Types.Skip;
}, ExtArgs["result"]["bid"]>;
export type BidSelectScalar = {
    id?: boolean | runtime.Types.Skip;
    auctionId?: boolean | runtime.Types.Skip;
    bidderId?: boolean | runtime.Types.Skip;
    bidderName?: boolean | runtime.Types.Skip;
    bidAmount?: boolean | runtime.Types.Skip;
    isUnique?: boolean | runtime.Types.Skip;
    isWinning?: boolean | runtime.Types.Skip;
    placedAt?: boolean | runtime.Types.Skip;
};
export type BidOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "auctionId" | "bidderId" | "bidderName" | "bidAmount" | "isUnique" | "isWinning" | "placedAt", ExtArgs["result"]["bid"], runtime.Types.Skip>;
export type BidInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    auction?: boolean | Prisma.AuctionDefaultArgs<ExtArgs> | runtime.Types.Skip;
};
export type BidIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    auction?: boolean | Prisma.AuctionDefaultArgs<ExtArgs> | runtime.Types.Skip;
};
export type BidIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    auction?: boolean | Prisma.AuctionDefaultArgs<ExtArgs> | runtime.Types.Skip;
};
export type $BidPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Bid";
    objects: {
        auction: Prisma.$AuctionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        auctionId: string;
        bidderId: string;
        bidderName: string;
        bidAmount: runtime.Decimal;
        isUnique: boolean;
        isWinning: boolean;
        placedAt: Date;
    }, ExtArgs["result"]["bid"]>;
    composites: {};
};
export type BidGetPayload<S extends boolean | null | undefined | BidDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BidPayload, S>;
export type BidCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BidFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
    select?: BidCountAggregateInputType | true;
};
export interface BidDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Bid'];
        meta: {
            name: 'Bid';
        };
    };
    findUnique<T extends BidFindUniqueArgs>(args: Prisma.SelectSubset<T, BidFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BidClient<runtime.Types.Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BidFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BidFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BidClient<runtime.Types.Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BidFindFirstArgs>(args?: Prisma.SelectSubset<T, BidFindFirstArgs<ExtArgs>>): Prisma.Prisma__BidClient<runtime.Types.Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BidFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BidFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BidClient<runtime.Types.Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BidFindManyArgs>(args?: Prisma.SelectSubset<T, BidFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BidCreateArgs>(args: Prisma.SelectSubset<T, BidCreateArgs<ExtArgs>>): Prisma.Prisma__BidClient<runtime.Types.Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BidCreateManyArgs>(args?: Prisma.SelectSubset<T, BidCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BidCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BidCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BidDeleteArgs>(args: Prisma.SelectSubset<T, BidDeleteArgs<ExtArgs>>): Prisma.Prisma__BidClient<runtime.Types.Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BidUpdateArgs>(args: Prisma.SelectSubset<T, BidUpdateArgs<ExtArgs>>): Prisma.Prisma__BidClient<runtime.Types.Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BidDeleteManyArgs>(args?: Prisma.SelectSubset<T, BidDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BidUpdateManyArgs>(args: Prisma.SelectSubset<T, BidUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BidUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BidUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BidUpsertArgs>(args: Prisma.SelectSubset<T, BidUpsertArgs<ExtArgs>>): Prisma.Prisma__BidClient<runtime.Types.Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BidCountArgs>(args?: Prisma.Subset<T, BidCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BidCountAggregateOutputType> : number>;
    aggregate<T extends BidAggregateArgs>(args: Prisma.Subset<T, BidAggregateArgs>): Prisma.PrismaPromise<GetBidAggregateType<T>>;
    groupBy<T extends BidGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BidGroupByArgs['orderBy'];
    } : {
        orderBy?: BidGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BidGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBidGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BidFieldRefs;
}
export interface Prisma__BidClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    auction<T extends Prisma.AuctionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AuctionDefaultArgs<ExtArgs>>): Prisma.Prisma__AuctionClient<runtime.Types.Result.GetResult<Prisma.$AuctionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BidFieldRefs {
    readonly id: Prisma.FieldRef<"Bid", 'String'>;
    readonly auctionId: Prisma.FieldRef<"Bid", 'String'>;
    readonly bidderId: Prisma.FieldRef<"Bid", 'String'>;
    readonly bidderName: Prisma.FieldRef<"Bid", 'String'>;
    readonly bidAmount: Prisma.FieldRef<"Bid", 'Decimal'>;
    readonly isUnique: Prisma.FieldRef<"Bid", 'Boolean'>;
    readonly isWinning: Prisma.FieldRef<"Bid", 'Boolean'>;
    readonly placedAt: Prisma.FieldRef<"Bid", 'DateTime'>;
}
export type BidFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelect<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    include?: Prisma.BidInclude<ExtArgs> | null;
    where: Prisma.BidWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type BidFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelect<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    include?: Prisma.BidInclude<ExtArgs> | null;
    where: Prisma.BidWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type BidFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelect<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    include?: Prisma.BidInclude<ExtArgs> | null;
    where?: Prisma.BidWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.BidOrderByWithRelationInput | Prisma.BidOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.BidWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.BidScalarFieldEnum | Prisma.BidScalarFieldEnum[] | runtime.Types.Skip;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type BidFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelect<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    include?: Prisma.BidInclude<ExtArgs> | null;
    where?: Prisma.BidWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.BidOrderByWithRelationInput | Prisma.BidOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.BidWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.BidScalarFieldEnum | Prisma.BidScalarFieldEnum[] | runtime.Types.Skip;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type BidFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelect<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    include?: Prisma.BidInclude<ExtArgs> | null;
    where?: Prisma.BidWhereInput | runtime.Types.Skip;
    orderBy?: Prisma.BidOrderByWithRelationInput | Prisma.BidOrderByWithRelationInput[] | runtime.Types.Skip;
    cursor?: Prisma.BidWhereUniqueInput | runtime.Types.Skip;
    take?: number | runtime.Types.Skip;
    skip?: number | runtime.Types.Skip;
    distinct?: Prisma.BidScalarFieldEnum | Prisma.BidScalarFieldEnum[] | runtime.Types.Skip;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type BidCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelect<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    include?: Prisma.BidInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BidCreateInput, Prisma.BidUncheckedCreateInput>;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type BidCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BidCreateManyInput | Prisma.BidCreateManyInput[];
    skipDuplicates?: boolean | runtime.Types.Skip;
};
export type BidCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    data: Prisma.BidCreateManyInput | Prisma.BidCreateManyInput[];
    skipDuplicates?: boolean | runtime.Types.Skip;
    include?: Prisma.BidIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BidUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelect<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    include?: Prisma.BidInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BidUpdateInput, Prisma.BidUncheckedUpdateInput>;
    where: Prisma.BidWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type BidUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BidUpdateManyMutationInput, Prisma.BidUncheckedUpdateManyInput>;
    where?: Prisma.BidWhereInput | runtime.Types.Skip;
    limit?: number | runtime.Types.Skip;
};
export type BidUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BidUpdateManyMutationInput, Prisma.BidUncheckedUpdateManyInput>;
    where?: Prisma.BidWhereInput | runtime.Types.Skip;
    limit?: number | runtime.Types.Skip;
    include?: Prisma.BidIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BidUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelect<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    include?: Prisma.BidInclude<ExtArgs> | null;
    where: Prisma.BidWhereUniqueInput;
    create: Prisma.XOR<Prisma.BidCreateInput, Prisma.BidUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BidUpdateInput, Prisma.BidUncheckedUpdateInput>;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type BidDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelect<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    include?: Prisma.BidInclude<ExtArgs> | null;
    where: Prisma.BidWhereUniqueInput;
    relationLoadStrategy?: Prisma.RelationLoadStrategy | runtime.Types.Skip;
};
export type BidDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BidWhereInput | runtime.Types.Skip;
    limit?: number | runtime.Types.Skip;
};
export type BidDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelect<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    include?: Prisma.BidInclude<ExtArgs> | null;
};
export {};
