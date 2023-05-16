import { Injectable } from '@nestjs/common';
import { RequestDTO } from './DTO/RequestDTO';
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
        let requestDTO;
        try {
            requestDTO = new RequestDTO(data.data, data.serverHash)
        } catch (e) {
            throw "server DTO bad"
        }

        if (this.isServerHashBad(requestDTO.serverHash)) {
            throw "server hash bad"
        }

        let dataDTO
        try {
            const obj = JSON.parse(JSON.stringify(requestDTO.data))
            dataDTO = new DataDTO(obj.service, obj.requestName, obj.status, obj.msg, obj.data, obj.time)
        } catch (e) {
            throw "parsing data error"
        }

        return this.eventsLogic(dataDTO)
    }


    async eventsLogic(dataDTO: DataDTO) {
        if (dataDTO.status == 200) {
            console.log(dataDTO.servise + ', ' + dataDTO.requestName + ', status: ' + dataDTO.status + ', ' + dataDTO.msg + ', ' + dataDTO.time + ' ms')
        } else {
            console.log(dataDTO.servise + ', ' + dataDTO.requestName + ', status: ' + dataDTO.status + ', ' + dataDTO.msg + ', ' + dataDTO.time + ' ms, ' + JSON.stringify(dataDTO.data))
        }
        return ''
    }

    //----------------------------------------------------------

    isServerHashBad(serverHash: string): boolean {
        if (serverHash == '89969458273-the-main-prize-in-the-show-psychics') {
            return false
        }
        return true
    }

}


