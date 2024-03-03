import { Injectable, HttpException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "./entities/task.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const created = this.taskRepository.create({
        title: createTaskDto.title,
        description: createTaskDto.description,
        user_id: createTaskDto.user_id,
      });
      await this.taskRepository.save(created);
      return created;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(
    page: number = 1,
    perPage: number = 10
  ): Promise<{ data: Task[]; total: number }> {
    const [data, total] = await this.taskRepository.findAndCount({
      skip: (page - 1) * perPage,
      take: perPage,
    });
    return { data, total };
  }

  async findOne(id: number) {
    return await this.taskRepository.findOne({ where: { id } });
  }
}
