import { Body, Controller, Post } from '@nestjs/common';
import { RegisterReadingUseCase } from '../application/use-cases/register-reading.usecase';
import { CreateReadingDto } from '../application/dtos/create-reading.dto';

@Controller('meter')
export class MeterController {
    constructor(private readonly registerReading: RegisterReadingUseCase) { }

    @Post(':id/readings')
    async register(@Body() dto: CreateReadingDto) {
        const record = await this.registerReading.execute({
            meterId: dto.meterId,
            value: dto.recordedValue,
            createdBy: dto.createdBy ?? 'system',
        });
        return { id: record.id, meterId: record.meterId, value: record.recordedValue, createdAt: record.createdAt };
    }
}
