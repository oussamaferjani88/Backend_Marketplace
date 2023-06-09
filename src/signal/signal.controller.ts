import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SignalService } from './signal.service';
import { Signal } from './entities/signal.entity';
import { CreateSignalDto } from './dto/create-signal.dto';
@Controller('signals')
export class SignalController {
  constructor(private readonly signalService: SignalService) {}

  @Get()
  findAll(): Promise<Signal[]> {
    return this.signalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Signal> {
    return this.signalService.findOne(+id);
  }

  @Post()
  create(@Body() createSignalDto: CreateSignalDto): Promise<Signal> {
    return this.signalService.create(createSignalDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() signal: Partial<Signal>,
  ): Promise<Signal> {
    return this.signalService.update(+id, signal);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.signalService.remove(+id);
  }
}
