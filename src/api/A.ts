import {
  NormalGet, NormalDelete, NormalPost, NormalPut,
} from '@/api/basic';

const modelName = '';

export const getUserGroupList = (data) => {  return NormalGet(modelName, '/userGroup', data); };
export const createUserGroup = (data) => { return NormalPost(modelName, '/userGroup', data); };
export const updateUserGroup = (data) => { return NormalPut(modelName, `/userGroup/${data.id}`, data); };
export const deleteUserGroup = (data) => { return NormalDelete(modelName, `/userGroup/${data.id}`, data); };

export const getUserList = (data) => { return NormalGet(modelName, '/user', data); };
export const createUser = (data) => { return NormalPost(modelName, '/user', data); };
export const updateUser = (data) => { return NormalPut(modelName, `/user/${data.id}`, data); };
export const deleteUser = (data) => { return NormalDelete(modelName, `/user/${data.id}`, data); };
