import { Injectable } from '@nestjs/common';
import { ResponseDTO } from './DTO/ResponseDTO';
import { DataDTO } from './DTO/DataDTO';


@Injectable()
export class AppService {


    async monitoringResponser(data: any) {
        const responseDTO = new ResponseDTO()
        let status = 200

        try {
            await this.eventsHandler(data)
        }
        catch (e) {
            console.log("localError--------------> " + e)
            status = 400
        }
        responseDTO.status = status
        return responseDTO
    }

    async eventsHandler(data: any) {
        let dataDTO
        try {
            const obj = JSON.parse(data)
            dataDTO = new DataDTO(obj.service, obj.requestName, obj.status, obj.msg, obj.data, obj.time)
        } catch (e) {
            throw "parsing data error"
        }

        return this.eventsLogic(dataDTO)
    }


    async eventsLogic(dataDTO: DataDTO) {
        if (dataDTO.status == 200) {
            const str = dataDTO.servise + ', ' + dataDTO.requestName + ', status: ' + dataDTO.status + ', ' + dataDTO.msg + ', ' + dataDTO.time + ' ms'
            console.log(str)
        } else {
            const str = dataDTO.servise + ', ' + dataDTO.requestName + ', status: ' + dataDTO.status + ', ' + dataDTO.msg + ', ' + dataDTO.time + ' ms, ' + JSON.stringify(dataDTO.data)
            console.log('%c' + str, 'background-color: yellow')
        }
        return ''
    }
}


