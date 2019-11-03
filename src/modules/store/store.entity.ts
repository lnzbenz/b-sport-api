import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
  } from 'typeorm';
  import { ApiModelProperty } from '@nestjs/swagger';
  
  @Entity()
  export class Store {
    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiModelProperty()
    @Column()
    store_name: string;
  
    @ApiModelProperty()
    @Column()
    brand_name: string;
  
    @ApiModelProperty()
    @Column()
    price: number;
  
    @ApiModelProperty()
    @Column({ default: false }) //เริ่มต้นคือ 0 = ผู้ทีไม่ถูกลบ ถ้า 1 คือ คนที่ถูกลบ
    isDisable: boolean;
  
    @ApiModelProperty()
    @CreateDateColumn() //จะสร้างเองอัตโนมัติ
    created: Date;
  
    @ApiModelProperty()
    @UpdateDateColumn()
    update: Date;
  }