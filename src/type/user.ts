export interface groupFormdata {
  groupCode: string
  groupName: string
  enable: boolean
  userList:Array
  groupDescription: string
  id:string
}

export interface userFormdata {
  userCode: string
  userName: string
  password: string
  enable: boolean
  groupList:Array
  userDescription: string
  id:string
}
