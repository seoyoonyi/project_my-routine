import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly repo: ProductsRepository) {}

  async create(createProductDto: CreateProductDto) {
    return this.repo.create(createProductDto);
  }

  async findAll() {
    return this.repo.findAll();
  }

  async findOne(id: number) {
    return this.repo.findOne(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.repo.update(id, updateProductDto);
  }

  async remove(id: number) {
    return this.repo.remove(id);
  }
}
