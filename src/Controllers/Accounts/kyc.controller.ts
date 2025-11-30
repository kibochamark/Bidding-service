import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { KycService } from 'src/Domains/Accounts/kyc.service';
import { KycParamDto, SubmitKycDto, UpdateKycStatusDto } from './dto';
import { KycStatus } from 'generated/prisma/enums';

@Controller('kyc')
export class KycController {
    constructor(private kycService: KycService) {}

    /**
     * Get all KYC submissions (Admin only)
     * Optional query param: ?status=PENDING
     * TODO: Add @UseGuards(KindeAuthGuard, PermissionsGuard) @RequirePermissions('manage:kyc')
     */
    @Get()
    async getAllKyc(@Query('status') status?: KycStatus) {
        return await this.kycService.getAllKyc(status);
    }

    /**
     * Get KYC status for the authenticated user
     * TODO: Extract accountId from @CurrentUser() instead of query param
     */
    @Get('status')
    async getKycStatus(@Query('accountId') accountId: string) {
        return await this.kycService.getKycByAccountId(accountId);
    }

    /**
     * Get KYC by ID (Admin only)
     * TODO: Add @UseGuards(KindeAuthGuard, PermissionsGuard) @RequirePermissions('manage:kyc')
     */
    @Get(':id')
    async getKycById(@Param() params: KycParamDto) {
        return await this.kycService.getKycById(params.id);
    }

    /**
     * Submit KYC documents for verification
     * TODO: Add @UseGuards(KindeAuthGuard)
     * TODO: Extract accountId from @CurrentUser() instead of body
     */
    @Post()
    async submitKyc(@Body() submitKycDto: SubmitKycDto) {
        return await this.kycService.submitKyc(submitKycDto);
    }

    /**
     * Update KYC status (Admin only - approve/reject)
     * TODO: Add @UseGuards(KindeAuthGuard, PermissionsGuard) @RequirePermissions('manage:kyc')
     * TODO: Extract reviewedBy from @CurrentUser() instead of body
     */
    @Patch(':id')
    async updateKycStatus(
        @Param() params: KycParamDto,
        @Body() updateKycStatusDto: UpdateKycStatusDto,
    ) {
        return await this.kycService.updateKycStatus(params.id, updateKycStatusDto);
    }

    /**
     * Delete KYC profile (Admin only)
     * TODO: Add @UseGuards(KindeAuthGuard, PermissionsGuard) @RequirePermissions('manage:kyc')
     */
    @Delete(':id')
    async deleteKyc(@Param() params: KycParamDto) {
        return await this.kycService.deleteKyc(params.id);
    }
}
