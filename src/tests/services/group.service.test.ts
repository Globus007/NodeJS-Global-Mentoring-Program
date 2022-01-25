import { groupService } from '../../services';
import { GroupCreationAttributes } from '../../db/models';
import { Group } from '../../types';

const testGroup: GroupCreationAttributes = {
  name: 'testName',
  permissions: [],
};

const INITIAL_GROUPS_LENGTH = 2;
const INCORRECT_GROUP_ID = 'wrongId';

describe('getAllGroups', () => {
  test('should return all groups', async () => {
    const groups = await groupService.getAllGroups();
    expect(groups.length).toBe(INITIAL_GROUPS_LENGTH);
  });
});

describe('createGroup, deleteGroup, getGroupById', () => {
  let addedGroup: Group;

  describe('createGroup', () => {
    test('should create group', async () => {
      addedGroup = await groupService.createGroup(testGroup);
      const groups = await groupService.getAllGroups();
      expect(addedGroup.name).toBe(testGroup.name);
      expect(groups.length).toBe(INITIAL_GROUPS_LENGTH + 1);
    });
  });

  describe('getGroupById', () => {
    test('should return group by id', async () => {
      const receivedGroup = await groupService.getGroupById(addedGroup.id);
      expect(receivedGroup.name).toBe(addedGroup.name);
    });

    test('should trow error when id incorrect', async () => {
      await expect(() => groupService.getGroupById(INCORRECT_GROUP_ID)).rejects.toThrow();
    });
  });

  describe('updateGroup', () => {
    test('should update group with new name', async () => {
      const newName = { name: 'newName' };
      await groupService.updateGroup(addedGroup.id, newName);
      const receivedGroup = await groupService.getGroupById(addedGroup.id);
      expect(receivedGroup.name).toEqual(newName.name);
    });
  });

  describe('deleteUser', () => {
    test('should delete user', async () => {
      await groupService.deleteGroup(addedGroup.id);
      const groups = await groupService.getAllGroups();
      expect(groups.length).toBe(INITIAL_GROUPS_LENGTH);
    });
  });
});
