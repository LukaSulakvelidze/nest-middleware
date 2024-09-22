import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpenseService {
  private expenses = [
    {
      id: 1,
      name: 'Iphone',
      price: 1000,
    },
    {
      id: 2,
      name: 'Car',
      price: 132984,
    },
    {
      id: 3,
      name: 'MacBook',
      price: 100,
    },
  ];

  create(createExpenseDto: CreateExpenseDto) {
    if (!createExpenseDto.name || !createExpenseDto.price)
      throw new HttpException('Fileds are required', HttpStatus.BAD_REQUEST);
    const lastId = this.expenses[this.expenses.length - 1]?.id || 0;
    const newExpense = {
      id: lastId + 1,
      ...createExpenseDto,
    };
    this.expenses.push(newExpense);
    return newExpense;
  }

  findAll() {
    return this.expenses;
  }

  findOne(id: number) {
    const findIndex = this.expenses.findIndex((expens) => expens.id === id);
    if (findIndex === -1)
      throw new HttpException('Can not found', HttpStatus.NOT_FOUND);
    return this.expenses[findIndex];
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const findIndex = this.expenses.findIndex((expens) => expens.id === id);
    if (findIndex === -1)
      throw new HttpException('Can not found', HttpStatus.NOT_FOUND);
    this.expenses[findIndex] = {
      ...this.expenses[findIndex],
      name: updateExpenseDto.name,
      price: updateExpenseDto.price,
    };
    return this.expenses[findIndex];
  }

  remove(id: number) {
    const findIndex = this.expenses.findIndex((expens) => expens.id === id);
    if (findIndex === -1)
      throw new HttpException('Can not found', HttpStatus.NOT_FOUND);
    const deletedExpense = this.expenses.splice(findIndex, 1);
    return deletedExpense;
  }
}
