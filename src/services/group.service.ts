import { GroupCreationAttributes, GroupModel } from '../models';
import { Group, GroupNotFoundError } from '../types';

class GroupService {
  async getAllGroups(): Promise<Group[]> {
    return GroupModel.findAll();
  }

  async createGroup(group: GroupCreationAttributes): Promise<Group> {
    return GroupModel.create(group);
  }

  async getGroupById(id: string): Promise<Group> {
    const group = await GroupModel.findByPk(id);
    if (!group) {
      throw new GroupNotFoundError(id);
    }
    return group;
  }

  async updateGroup(id: string, fieldsToUpdate: Partial<Group>): Promise<Group> {
    const group = await this.getGroupById(id);
    return (group as GroupModel).update(fieldsToUpdate);
  }

  async deleteGroup(id: string): Promise<void> {
    const group = await this.getGroupById(id);
    await (group as GroupModel).destroy();
  }
}

export const groupService = new GroupService();
