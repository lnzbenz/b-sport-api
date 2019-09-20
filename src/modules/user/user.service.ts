import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserToken') private readonly user: Repository<User>,
  ) {}

  async find($params = {}): Promise<User[]> {
    return this.user.find($params);
  }

  async save($params): Promise<User[] | User> {
    return this.user.save($params);
  }

  async saveOne($params): Promise<User> {
    return this.user.save($params);
  }

  async create($params) {
    return this.user.save($params);
  }

  async findOne($params = {}): Promise<User> {
    return this.user.findOne($params);
  }

  async delete($params): Promise<User[] | User> {
    const user = await this.user.findOne({
      where: $params,
    });
    if (user) {
      user.isDisable = await true;

      return await this.user.save(user);
    }
  }

  async queryBuilder(
    $where = '',
    $relations = [],
    $order = [],
  ): Promise<User[]> {
    let query = await this.user.createQueryBuilder('user');

    if ($where) {
      query = query.where($where);
    }

    if ($relations.length) {
      $relations.map($objRelation => {
        query = query.leftJoinAndSelect($objRelation.field, $objRelation.alias);
      });
    }

    if ($order.length) {
      $order.map(($objOrder, $index) => {
        if (!$index) {
          query = query.orderBy($objOrder.field, $objOrder.direction);
        } else {
          query = query.addOrderBy($objOrder.field, $objOrder.direction);
        }
      });
    }

    return query.getMany();
  }

  async genKey(len = 80) {
    let name = await '';
    let possible = await 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < len; i++) {
      name += await possible.charAt(
        Math.floor(Math.random() * possible.length),
      );
    }

    return name;
  }
}