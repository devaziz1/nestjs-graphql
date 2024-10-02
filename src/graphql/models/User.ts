import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserSettings } from './UserSettings';

@ObjectType()
export class User {
  @Field((type) => Int)
  id: number;

  @Field()
  username: string;

  @Field({ nullable: true })
  displayName?: string;

  @Field({ nullable: true })
  settings?: UserSettings;
}
