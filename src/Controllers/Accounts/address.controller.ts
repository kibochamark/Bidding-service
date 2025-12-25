import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AddressService } from '../../../src/Domains/Accounts/address.service';
import { AddressParamDto, CreateAddressDto, UpdateAddressDto } from './dto';

@Controller('addresses')
export class AddressController {
    constructor(private addressService: AddressService) {}

    /**
     * Get all addresses for a specific account
     * Query parameter: accountId
     */
    @Get()
    async getAddressesByAccountId(@Query('accountId') accountId: string) {
        return await this.addressService.getAddressesByAccountId(accountId);
    }

    /**
     * Get a single address by ID
     */
    @Get(':id')
    async getAddressById(@Param() params: AddressParamDto) {
        return await this.addressService.getAddressById(params.id);
    }

    /**
     * Create a new address
     * TODO: Extract accountId from authenticated user context instead of body
     */
    @Post()
    async createAddress(@Body() createAddressDto: CreateAddressDto) {
        return await this.addressService.createAddress(createAddressDto);
    }

    /**
     * Update an existing address
     */
    @Patch(':id')
    async updateAddress(
        @Param() params: AddressParamDto,
        @Body() updateAddressDto: UpdateAddressDto,
    ) {
        return await this.addressService.updateAddress(params.id, updateAddressDto);
    }

    /**
     * Delete an address
     */
    @Delete(':id')
    async deleteAddress(@Param() params: AddressParamDto) {
        return await this.addressService.deleteAddress(params.id);
    }
}
