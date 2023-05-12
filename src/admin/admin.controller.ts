import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';
import { AdminDto } from './dto/admin.dto';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get()
    async findAll(): Promise<Admin[]> {
        return this.adminService.findAll();
    }

    @Post()
    async create(@Body() AdminDto: AdminDto): Promise<Admin> {
        try  {
            const createdAdmin = await this.adminService.create(AdminDto);
            return createdAdmin;
        } catch (error) {
            console.error('Failed to create admin', error);
            throw error;
        }
    }

}
