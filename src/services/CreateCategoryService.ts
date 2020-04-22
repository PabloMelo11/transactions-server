import { getRepository } from 'typeorm';

import Category from '../models/Category';

import AppError from '../errors/AppError';

interface RequestDTO {
  title: string;
}
class CreateCategoryService {
  async execute({ title }: RequestDTO): Promise<Category> {
    const categoryRepository = getRepository(Category);

    const checkCategory = await categoryRepository.findOne({
      where: { title },
    });

    if (checkCategory) {
      throw new AppError('There is already a category with that title');
    }

    const category = categoryRepository.create({
      title,
    });

    await categoryRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
