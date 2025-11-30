import { Injectable, Logger } from '@nestjs/common';
import { KycRepository } from './kyc.repository';
import { SubmitKycDto, UpdateKycStatusDto } from 'src/Controllers/Accounts/dto';
import { KycStatus } from 'generated/prisma/enums';

@Injectable()
export class KycService {
    private readonly logger = new Logger(KycService.name);

    constructor(private kycRepository: KycRepository) {}

    /**
     * Get KYC status for a user by their account kindeId
     */
    async getKycByAccountId(accountId: string) {
        return await this.kycRepository.findKycByAccountId(accountId);
    }

    /**
     * Get KYC by its ID
     */
    async getKycById(id: string) {
        return await this.kycRepository.findKycById(id);
    }

    /**
     * Get all KYC submissions (admin only)
     * Optionally filter by status
     */
    async getAllKyc(status?: KycStatus) {
        return await this.kycRepository.findAllKyc(status);
    }

    /**
     * Submit KYC documents for verification
     */
    async submitKyc(data: SubmitKycDto) {
        this.logger.log(`KYC submission for account: ${data.accountId}`);
        return await this.kycRepository.submitKyc(data);
    }

    /**
     * Update KYC status (admin only)
     */
    async updateKycStatus(id: string, data: UpdateKycStatusDto) {
        this.logger.log(
            `Updating KYC ${id} to status: ${data.status} by admin: ${data.reviewedBy}`,
        );
        return await this.kycRepository.updateKycStatus(id, data);
    }

    /**
     * Delete KYC profile
     */
    async deleteKyc(id: string) {
        this.logger.log(`Deleting KYC profile: ${id}`);
        return await this.kycRepository.deleteKyc(id);
    }
}
