import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(dto: CreateCategoryDto): Promise<Category | null> {
    try {
      const category = this.categoryRepo.create(dto);
      return await this.categoryRepo.save(category);
    } catch (err) {
      console.error('Error creating category:', err);
      return null;
    }
  }

  async findAll(options: any): Promise<Pagination<Category> | null> {
    try {
      const { search, searchField, sort, order, page, limit } = options;

      const queryBuilder = this.categoryRepo.createQueryBuilder('category');

      const allowedSearchFields = ['name', 'description'];
      const allowedSortFields = ['id', 'name'];

      // 🔍 BÚSQUEDA
      if (search) {
        if (searchField && allowedSearchFields.includes(searchField)) {
          queryBuilder.where(
            `category.${searchField} ILIKE :search`,
            { search: `%${search}%` },
          );
        } else {
          queryBuilder.where(
            '(category.name ILIKE :search OR category.description ILIKE :search)',
            { search: `%${search}%` },
          );
        }
      }

      // 🔃 ORDENAMIENTO
      const orderField =
        sort && allowedSortFields.includes(sort) ? sort : 'id';

      const orderDirection: 'ASC' | 'DESC' =
        order === 'DESC' ? 'DESC' : 'ASC';

      queryBuilder.orderBy(`category.${orderField}`, orderDirection);

      // 📄 PAGINACIÓN
      return await paginate<Category>(queryBuilder, {
        page,
        limit,
      });
    } catch (err) {
      console.error('Error finding categories:', err);
      return null;
    }
  }

  async findOne(id: string): Promise<Category | null> {
    try {
      return await this.categoryRepo.findOne({ where: { id } });
    } catch (err) {
      console.error('Error finding category:', err);
      return null;
    }
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<Category | null> {
    try {
      const category = await this.findOne(id);
      if (!category) return null;

      Object.assign(category, dto);
      return await this.categoryRepo.save(category);
    } catch (err) {
      console.error('Error updating category:', err);
      return null;
    }
  }

  async remove(id: string): Promise<Category | null> {
    try {
      const category = await this.findOne(id);
      if (!category) return null;

      return await this.categoryRepo.remove(category);
    } catch (err) {
      console.error('Error deleting category:', err);
      return null;
    }
  }
}
