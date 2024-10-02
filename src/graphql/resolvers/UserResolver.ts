import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { User } from '../models/User';
import { UserSettings } from '../models/UserSettings';
import { mockUsers } from 'src/__mocks__/mockUsers';
import { mockUserSttings } from 'src/__mocks__/mockUserSettings';
import { createUserInputType } from '../utils/CreateUserInput';

export let IncrementalID = 5;

@Resolver((of) => User)
export class UserResolver {
  @Query((returns) => User)
  getUser() {
    return {
      id: 1,
      username: 'Aziz Naseer',
      displayName: 'Aziz The Developer',
    };
  }

  @Query((returns) => User, { nullable: true, name: 'GetUserById' })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return mockUsers.find((user) => user.id === id);
  }

  @Query((returns) => [User])
  getAllUsers() {
    return mockUsers;
  }

  @ResolveField((returns) => UserSettings, { nullable: true, name: 'settings' })
  getUserSettings(@Parent() user: User) {
    return mockUserSttings.find((setting) => setting.userId === user.id);
  }

  @Mutation((returns) => User)
  createUser(@Args('createUserData') createUserData: createUserInputType) {
    const { username, displayName } = createUserData;
    const newUser = {
      username,
      displayName,
      id: ++IncrementalID,
    };

    mockUsers.push(newUser);
    return newUser;
  }
}
