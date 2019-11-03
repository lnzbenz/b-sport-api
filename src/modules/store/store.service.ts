import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Store } from './store.entity';

@Injectable()
export class StoreService {
  constructor(
    @Inject('StoreToken') private readonly user: Repository<Store>,
  ) {}

  async find($params = {}): Promise<Store[]> {
    return this.user.find($params);
  }

  async save($params): Promise<Store[] | Store> {
    return this.user.save($params);
  }

  async saveOne($params): Promise<Store> {
    return this.user.save($params);
  }

  async create($params) {
    return this.user.save($params);
  }

  async findOne($params = {}): Promise<Store> {
    return this.user.findOne($params);
  }

  async delete($params): Promise<Store[] | Store> {
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
  ): Promise<Store[]> {
    let query = await this.user.createQueryBuilder('store');

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