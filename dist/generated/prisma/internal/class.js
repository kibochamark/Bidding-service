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
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [
        "fullTextSearchPostgres",
        "nativeDistinct",
        "postgresqlExtensions",
        "relationJoins",
        "schemaEngineDriverAdapters",
        "shardKeys",
        "strictUndefinedChecks",
        "views"
    ],
    "clientVersion": "7.0.0",
    "engineVersion": "0c19ccc313cf9911a90d99d2ac2eb0280c76c513",
    "activeProvider": "postgresql",
    "inlineSchema": "generator client {\n  provider        = \"prisma-client\"\n  output          = \"../generated/prisma\"\n  previewFeatures = [\"fullTextSearchPostgres\", \"nativeDistinct\", \"postgresqlExtensions\", \"relationJoins\", \"schemaEngineDriverAdapters\", \"shardKeys\", \"strictUndefinedChecks\", \"views\"]\n  engineType      = \"binary\"\n  moduleFormat    = \"cjs\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel Account {\n  id            String         @id @default(uuid())\n  kindeId       String         @unique\n  email         String?        @unique\n  contact       String?\n  fullName      String?\n  createdAt     DateTime       @default(now())\n  updatedAt     DateTime       @updatedAt\n  addresses     Address[]\n  kyc           KycProfile?\n  sellerProfile SellerDetails?\n}\n\nmodel KycProfile {\n  id              String    @id @default(uuid())\n  userId          String    @unique\n  status          KycStatus @default(PENDING)\n  fullName        String\n  dateOfBirth     DateTime\n  alienIdNumber   String?\n  idDocumentUrl   String\n  selfieUrl       String?\n  rejectionReason String?\n  reviewedBy      String?\n  verifiedAt      DateTime?\n  accountId       String    @unique\n  createdAt       DateTime  @default(now())\n  updatedAt       DateTime  @updatedAt\n  account         Account   @relation(fields: [accountId], references: [kindeId])\n}\n\nmodel SellerDetails {\n  id           String   @id @default(uuid())\n  companyName  String\n  taxId        String?\n  rating       Decimal  @default(0.0)\n  totalSales   Int      @default(0)\n  accountId    String   @unique\n  responseRate Decimal? @default(0.0)\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n  account      Account  @relation(fields: [accountId], references: [kindeId])\n}\n\nmodel Address {\n  id        String   @id @default(uuid())\n  userId    String\n  label     String?\n  street    String\n  city      String\n  zipCode   String\n  country   String\n  accountId String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  account   Account  @relation(fields: [accountId], references: [kindeId])\n}\n\nmodel Category {\n  id          String     @id @default(uuid())\n  slug        String     @unique\n  name        String\n  description String?\n  icon        String?\n  parentId    String?\n  createdAt   DateTime   @default(now())\n  updatedAt   DateTime   @updatedAt\n  parent      Category?  @relation(\"CategoryHierarchy\", fields: [parentId], references: [id])\n  children    Category[] @relation(\"CategoryHierarchy\")\n  products    Product[]\n\n  @@index([slug])\n  @@index([parentId])\n}\n\nmodel Product {\n  id             String                   @id @default(uuid())\n  title          String\n  description    String\n  categoryId     String\n  condition      ProductCondition         @default(GOOD)\n  images         String[]\n  startingPrice  Decimal                  @db.Decimal(10, 2)\n  currentBid     Decimal                  @db.Decimal(10, 2)\n  bidsCount      Int                      @default(0)\n  reservePrice   Decimal?                 @db.Decimal(10, 2)\n  buyNowPrice    Decimal?                 @db.Decimal(10, 2)\n  startDate      DateTime                 @default(now())\n  endDate        DateTime\n  isActive       Boolean                  @default(true)\n  sellerId       String\n  sellerName     String\n  sellerRating   Decimal                  @default(0.0) @db.Decimal(3, 2)\n  rating         Decimal                  @default(0.0) @db.Decimal(3, 2)\n  reviewCount    Int                      @default(0)\n  specifications Json\n  createdAt      DateTime                 @default(now())\n  updatedAt      DateTime                 @updatedAt\n  search_vector  Unsupported(\"tsvector\")?\n  category       Category                 @relation(fields: [categoryId], references: [id])\n\n  @@index([categoryId, isActive, endDate(sort: Desc)])\n  @@index([sellerId, isActive])\n  @@index([isActive, endDate])\n  @@index([isActive, currentBid(sort: Desc)])\n  @@index([isActive, createdAt(sort: Desc)])\n  @@index([condition, isActive])\n  @@index([title])\n  @@index([startingPrice, currentBid])\n  @@index([search_vector], type: Gin)\n}\n\nenum KycStatus {\n  PENDING\n  VERIFIED\n  REJECTED\n  NEEDS_MORE_INFO\n}\n\nenum ProductCondition {\n  MINT\n  EXCELLENT\n  GOOD\n  FAIR\n  NEW\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"Account\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"kindeId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"contact\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fullName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"addresses\",\"kind\":\"object\",\"type\":\"Address\",\"relationName\":\"AccountToAddress\"},{\"name\":\"kyc\",\"kind\":\"object\",\"type\":\"KycProfile\",\"relationName\":\"AccountToKycProfile\"},{\"name\":\"sellerProfile\",\"kind\":\"object\",\"type\":\"SellerDetails\",\"relationName\":\"AccountToSellerDetails\"}],\"dbName\":null},\"KycProfile\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"KycStatus\"},{\"name\":\"fullName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"dateOfBirth\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"alienIdNumber\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"idDocumentUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"selfieUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"rejectionReason\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"reviewedBy\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"verifiedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"accountId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"account\",\"kind\":\"object\",\"type\":\"Account\",\"relationName\":\"AccountToKycProfile\"}],\"dbName\":null},\"SellerDetails\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"companyName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"taxId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"rating\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"totalSales\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"accountId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"responseRate\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"account\",\"kind\":\"object\",\"type\":\"Account\",\"relationName\":\"AccountToSellerDetails\"}],\"dbName\":null},\"Address\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"label\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"street\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"city\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"zipCode\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"country\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"accountId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"account\",\"kind\":\"object\",\"type\":\"Account\",\"relationName\":\"AccountToAddress\"}],\"dbName\":null},\"Category\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"slug\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"icon\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"parentId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"parent\",\"kind\":\"object\",\"type\":\"Category\",\"relationName\":\"CategoryHierarchy\"},{\"name\":\"children\",\"kind\":\"object\",\"type\":\"Category\",\"relationName\":\"CategoryHierarchy\"},{\"name\":\"products\",\"kind\":\"object\",\"type\":\"Product\",\"relationName\":\"CategoryToProduct\"}],\"dbName\":null},\"Product\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"categoryId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"condition\",\"kind\":\"enum\",\"type\":\"ProductCondition\"},{\"name\":\"images\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"startingPrice\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"currentBid\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"bidsCount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"reservePrice\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"buyNowPrice\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"startDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"endDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"isActive\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"sellerId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sellerName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sellerRating\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"rating\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"reviewCount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"specifications\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"category\",\"kind\":\"object\",\"type\":\"Category\",\"relationName\":\"CategoryToProduct\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_bg.postgresql.js"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_bg.postgresql.wasm-base64.js");
        return await decodeBase64AsWasm(wasm);
    }
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map