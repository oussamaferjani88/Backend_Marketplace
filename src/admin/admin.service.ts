import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../admin/entities/admin.entity';
import { AdminDto } from './dto/admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) { }

  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async findOneEmail(email: string): Promise<Admin | undefined> {
    const admin = await this.adminRepository.findOne({ where: { email } });
    return admin;
  }

  async create(admin: AdminDto): Promise<Admin> {
    try {
    const hashedPassword = await bcrypt.hash(admin.password, 10);
    const newAdmin = this.adminRepository.create({
      ...admin,
      password: hashedPassword,
    });
    console.log('new admin :', newAdmin);
    return this.adminRepository.save(newAdmin);
    } catch (error) {
      console.error('error creating admin :', error);
      throw error;
    }
  }



  












  async update(id: number, admin: Partial<Admin>,): Promise<Admin> {
    await this.adminRepository.update(id, admin);
    return this.adminRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.adminRepository.delete(id);
  }

  async validateAdmin(email: string, password: string): Promise<Admin | undefined> {

    const admin = await this.findOneEmail(email);
    if (admin && (await bcrypt.compare(password, admin.password))) {
      return admin;
    }
    return null;
  }

}
