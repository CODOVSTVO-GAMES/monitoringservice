import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { ResponseDTO } from './DTO/ResponseDTO';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @EventPattern('send_log')
    async saveData(data: any): Promise<ResponseDTO> {
        console.log('request')
        return await this.appService.monitoringResponser(data)
    }

}
