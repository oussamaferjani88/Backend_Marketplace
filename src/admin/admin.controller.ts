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

    @Post('Register')
    async Register(@Body() admin: AdminDto): Promise<Admin> {
        //console.log('creating utilisateur:', AdminDto);
        try  {
            const createdAdmin = await this.adminService.create(admin);
            return createdAdmin;
        } catch (error) {
            console.error('Failed to create admin', error);
            throw error;
        }
    }

}
