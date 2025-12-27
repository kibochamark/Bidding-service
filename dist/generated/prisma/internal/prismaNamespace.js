"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.ProductOrderByRelevanceFieldEnum = exports.JsonNullValueFilter = exports.CategoryOrderByRelevanceFieldEnum = exports.AddressOrderByRelevanceFieldEnum = exports.SellerDetailsOrderByRelevanceFieldEnum = exports.KycProfileOrderByRelevanceFieldEnum = exports.NullsOrder = exports.AccountOrderByRelevanceFieldEnum = exports.QueryMode = exports.JsonNullValueInput = exports.SortOrder = exports.ProductScalarFieldEnum = exports.CategoryScalarFieldEnum = exports.AddressScalarFieldEnum = exports.SellerDetailsScalarFieldEnum = exports.KycProfileScalarFieldEnum = exports.RelationLoadStrategy = exports.AccountScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.skip = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.skip = runtime.skip;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.0.0",
    engine: "0c19ccc313cf9911a90d99d2ac2eb0280c76c513"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    Account: 'Account',
    KycProfile: 'KycProfile',
    SellerDetails: 'SellerDetails',
    Address: 'Address',
    Category: 'Category',
    Product: 'Product'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.AccountScalarFieldEnum = {
    id: 'id',
    kindeId: 'kindeId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.RelationLoadStrategy = {
    query: 'query',
    join: 'join'
};
exports.KycProfileScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    status: 'status',
    idDocumentUrl: 'idDocumentUrl',
    selfieUrl: 'selfieUrl',
    rejectionReason: 'rejectionReason',
    reviewedBy: 'reviewedBy',
    verifiedAt: 'verifiedAt',
    accountId: 'accountId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SellerDetailsScalarFieldEnum = {
    id: 'id',
    companyName: 'companyName',
    taxId: 'taxId',
    rating: 'rating',
    totalSales: 'totalSales',
    accountId: 'accountId',
    responseRate: 'responseRate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.AddressScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    label: 'label',
    street: 'street',
    city: 'city',
    zipCode: 'zipCode',
    country: 'country',
    accountId: 'accountId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CategoryScalarFieldEnum = {
    id: 'id',
    slug: 'slug',
    name: 'name',
    description: 'description',
    icon: 'icon',
    parentId: 'parentId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ProductScalarFieldEnum = {
    id: 'id',
    title: 'title',
    description: 'description',
    categoryId: 'categoryId',
    condition: 'condition',
    images: 'images',
    startingPrice: 'startingPrice',
    currentBid: 'currentBid',
    bidsCount: 'bidsCount',
    reservePrice: 'reservePrice',
    buyNowPrice: 'buyNowPrice',
    startDate: 'startDate',
    endDate: 'endDate',
    isActive: 'isActive',
    sellerId: 'sellerId',
    sellerName: 'sellerName',
    sellerRating: 'sellerRating',
    rating: 'rating',
    reviewCount: 'reviewCount',
    specifications: 'specifications',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.JsonNullValueInput = {
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.AccountOrderByRelevanceFieldEnum = {
    id: 'id',
    kindeId: 'kindeId'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.KycProfileOrderByRelevanceFieldEnum = {
    id: 'id',
    userId: 'userId',
    idDocumentUrl: 'idDocumentUrl',
    selfieUrl: 'selfieUrl',
    rejectionReason: 'rejectionReason',
    reviewedBy: 'reviewedBy',
    accountId: 'accountId'
};
exports.SellerDetailsOrderByRelevanceFieldEnum = {
    id: 'id',
    companyName: 'companyName',
    taxId: 'taxId',
    accountId: 'accountId'
};
exports.AddressOrderByRelevanceFieldEnum = {
    id: 'id',
    userId: 'userId',
    label: 'label',
    street: 'street',
    city: 'city',
    zipCode: 'zipCode',
    country: 'country',
    accountId: 'accountId'
};
exports.CategoryOrderByRelevanceFieldEnum = {
    id: 'id',
    slug: 'slug',
    name: 'name',
    description: 'description',
    icon: 'icon',
    parentId: 'parentId'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.ProductOrderByRelevanceFieldEnum = {
    id: 'id',
    title: 'title',
    description: 'description',
    categoryId: 'categoryId',
    images: 'images',
    sellerId: 'sellerId',
    sellerName: 'sellerName'
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map