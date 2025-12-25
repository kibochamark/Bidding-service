import { Injectable } from '@nestjs/common';
import { AddressRepository } from './address.repository';
import { CreateAddressDto, UpdateAddressDto } from '../../../src/Controllers/Accounts/dto';

@Injectable()
export class AddressService {
    constructor(private addressRepository: AddressRepository) {}

    /**
     * Get all addresses for a specific account
     */
    async getAddressesByAccountId(accountId: string) {
        try {
            
            return await this.addressRepository.findAddressesByAccountId(accountId);

        } catch (error) {
            
            if (error.status && error.status === 404) {
                return [];
            }
            throw error;
            
        }
    }

    /**
     * Get a single address by ID
     */
    async getAddressById(id: string) {
        try {
            return await this.addressRepository.findAddressById(id);
        } catch (error) {
            
            if (error.status && error.status === 404) {
                return null;
            }
            throw error;
        }
        
    }

    /**
     * Create a new address
     */
    async createAddress(data: CreateAddressDto) {
        try{
        return await this.addressRepository.createAddress(data);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update an existing address
     */
    async updateAddress(id: string, data: UpdateAddressDto) {
        try{

            return await this.addressRepository.updateAddress(id, data);

        }catch(error){
            throw error;
        }
    }

    /**
     * Delete an address
     */
    async deleteAddress(id: string) {
        try {
            return await this.addressRepository.deleteAddress(id);
        } catch (error) {
            throw error;
        }
    }
}
