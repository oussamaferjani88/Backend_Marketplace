import { Controller, Get, Post, Body, Patch, Param, Delete ,  UploadedFile,  CanActivate, ExecutionContext,
    NotFoundException,BadRequestException  ,Res,} from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {

    constructor(private dashboardService: DashboardService) {}

  @Get('countProds')
  async getCountProds() {
    return this.dashboardService.getCountProd();
  }

  @Get('total-users')
  async getTotalUsers() {
    return this.dashboardService.getTotalUsers();
  }

  @Get('most-prods')
  async getMostProductsCategory() {
    return this.dashboardService.getMostProductsCategory();
  }
  

}
