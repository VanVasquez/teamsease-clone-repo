import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DonationWhereUniqueInput } from './donation-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneDonationArgs {

    @Field(() => DonationWhereUniqueInput, {nullable:false})
    @Type(() => DonationWhereUniqueInput)
    where!: Prisma.AtLeast<DonationWhereUniqueInput, 'id'>;
}
