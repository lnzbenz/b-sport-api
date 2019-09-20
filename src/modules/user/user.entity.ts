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
  export class User {
    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiModelProperty()
    @Column()
    firstname: string;
  
    @ApiModelProperty()
    @Column()
    lastname: string;
  
    @ApiModelProperty()
    @Column()
    email: string;
  
    @ApiModelProperty()
    @Column()
    password: string;
   
    @ApiModelProperty()
    @Column()
    phone: string;
  
    @ApiModelProperty()
    @Column()
    address: string;
  
    @ApiModelProperty()
    @Column({ default: 'user' })
    role: string;
  
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