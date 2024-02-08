import { Controller, Get, Inject } from '@nestjs/common';
import { VersionRepository } from './ports/out/version.repository';

@Controller('ping')
export class PingController {
  constructor(@Inject(VersionRepository) private versionRepository: VersionRepository) {}

  @Get()
  async ping(): Promise<{/*status: string, details: { database: string }*/}> {
    try {
      await this.versionRepository.getVersion();
      return {status: 'OK', details: {database: 'OK'}};
    }
    catch (error) {
      console.error('Error:', error);
      return {status: 'ERROR', details: {database: 'ERROR'}};
    }
  }

}
