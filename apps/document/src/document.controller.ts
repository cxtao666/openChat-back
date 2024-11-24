import { Controller, Get } from '@nestjs/common';
import { DocumentService } from './document.service';

@Controller()
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}


  @Get('/api/rpc')
  async sayHello() {
    return await this.documentService.getHello();
  }
}
