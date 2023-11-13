import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseMessage, User } from 'src/decorator/customize';
import { I_User } from 'src/users/users.interface';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a job' })
    @ApiBody({ type: CreateJobDto })
    @ApiBearerAuth()
    @ResponseMessage('Create a new job')
    async create(@Body() createJobDto: CreateJobDto, @User() user: I_User) {
        return await this.jobsService.create(createJobDto, user);
    }

    @Get()
    @ApiBearerAuth()
    findAll(
        @Query('currentPage') currentPage: string,
        @Query('limit') limit: string,
        @Query() qs: string
    ) {
        return this.jobsService.findAll(+currentPage, +limit, qs);
    }

    @Get(':id')
    @ApiBearerAuth()
    findOne(@Param('id') id: string) {
        return this.jobsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'update a job' })
    @ApiBody({ type: UpdateJobDto })
    @ApiBearerAuth()
    async update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto, @User() user: I_User) {
        return await this.jobsService.update(id, updateJobDto, user);
    }

    @Delete(':id')
    @ResponseMessage('Delete a job')
    remove(@Param('id') id: string, @User() user: I_User) {
        return this.jobsService.remove(id, user);
    }
}
