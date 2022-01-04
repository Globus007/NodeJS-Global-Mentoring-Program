import { groupService } from '../../services';
import { GroupCreationAttributes } from '../../db/models';
import { Group } from '../../types';

const testGroup: GroupCreationAttributes = {
  name: 'testName',
  permissions: [],
};

test('getAllGroups should work correct', async () => {
  const groups = await groupService.getAllGroups();
  expect(groups.length).toBe(2);
});

describe('createGroup, deleteGroup, getGroupById', () => {
  let addedGroup: Group;

  test('createUser should work correct', async () => {
    addedGroup = await groupService.createGroup(testGroup);
    const groups = await groupService.getAllGroups();

    expect(addedGroup.name).toBe(testGroup.name);
    expect(groups.length).toBe(3);
  });

  test('getGroupById should work correct', async () => {
    const receivedGroup = await groupService.getGroupById(addedGroup.id);
    expect(receivedGroup.name).toBe(addedGroup.name);
  });

  test('getGroupById should trow error when id incorrect', async () => {
    await expect(() => groupService.getGroupById('wrongId')).rejects.toThrow();
  });

  test('updateGroup should work correct', async () => {
    const newName = { name: 'newName' };
    await groupService.updateGroup(addedGroup.id, newName);
    const receivedGroup = await groupService.getGroupById(addedGroup.id);
    expect(receivedGroup.name).toEqual(newName.name);
  });

  test('deleteUser should work correct', async () => {
    await groupService.deleteGroup(addedGroup.id);

    const groups = await groupService.getAllGroups();
    expect(groups.length).toBe(2);
  });
});
