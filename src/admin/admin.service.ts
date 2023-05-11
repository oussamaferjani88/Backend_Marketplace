import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../admin/entities/admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
    ) { }

    async findOne(username: string): Promise<Admin | undefined> {
        const admin = await this.adminRepository.findOne({ where: { username } });
        return admin;
    }

    async create(admin: Admin): Promise<Admin> {
        const hashedPassword = await bcrypt.hash(admin.password, 10);
        const newAdmin = this.adminRepository.create({
          ...admin,
          password: hashedPassword,
        });
        return this.adminRepository.save(newAdmin);
      }

    async validateUser(username: string , password: string) : Promise<Admin | undefined> {
        
        const admin = await this.findOne(username);
        if (admin && (await bcrypt.compare(password, admin.password))) {
          return admin;
        }
        return null;
      }

}
