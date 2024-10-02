import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class createUserInputType {
  @Field()
  username: string;

  @Field({ nullable: true })
  displayName: string;
}
