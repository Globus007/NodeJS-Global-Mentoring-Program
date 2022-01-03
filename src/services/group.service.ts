import { GroupCreationAttributes, GroupModel } from '../db/models';
import { Group, GroupNotFoundError } from '../types';
import { trackTime } from '../decorators';

class GroupService {
  @trackTime
  async getAllGroups(): Promise<Group[]> {
    return GroupModel.findAll();
  }

  @trackTime
  async createGroup(group: GroupCreationAttributes): Promise<Group> {
    return GroupModel.create(group);
  }

  @trackTime
  async getGroupById(id: string): Promise<Group> {
    const group = await GroupModel.findByPk(id);
    if (!group) {
      throw new GroupNotFoundError(id);
    }
    return group;
  }

  @trackTime
  async updateGroup(id: string, fieldsToUpdate: Partial<Group>): Promise<Group> {
    const group = await this.getGroupById(id);
    return (group as GroupModel).update(fieldsToUpdate);
  }

  @trackTime
  async deleteGroup(id: string): Promise<void> {
    const group = await this.getGroupById(id);
    await (group as GroupModel).destroy();
  }
}

export const groupService = new GroupService();
