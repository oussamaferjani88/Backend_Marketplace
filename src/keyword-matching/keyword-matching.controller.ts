import { Controller, Get, Query } from '@nestjs/common';
import { KeywordMatchingService } from './keyword-matching.service';

@Controller('keyword-matching')
export class KeywordMatchingController {
  constructor(private keywordMatchingService: KeywordMatchingService) {}

  @Get()
  async performKeywordMatching(@Query('query') query: string) {
    try {
      const matches = await this.keywordMatchingService.performKeywordMatching(query);
      return { success: true, data: matches };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
