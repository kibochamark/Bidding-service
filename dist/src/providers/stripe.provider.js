"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeProvider = exports.STRIPE_CLIENT = void 0;
const config_1 = require("@nestjs/config");
const stripe_1 = __importDefault(require("stripe"));
exports.STRIPE_CLIENT = 'STRIPE_CLIENT';
exports.StripeProvider = {
    provide: exports.STRIPE_CLIENT,
    useFactory: (configService) => {
        const stripeKey = configService.get('STRIPE_SECRET_KEY');
        if (!stripeKey) {
            throw new Error('STRIPE_SECRET_KEY is not configured');
        }
        return new stripe_1.default(stripeKey);
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=stripe.provider.js.map