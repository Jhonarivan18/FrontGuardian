import React from 'react'
import { RegistroRepositoryImpl } from '../../../Data/repositories/RegistroRepository'
const { remove } = new RegistroRepositoryImpl();

export const DeleteRegistroUseCase = async (id: string) => {
  return await remove(id);
}