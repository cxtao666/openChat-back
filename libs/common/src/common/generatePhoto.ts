import { avatarArr } from '../config/avatar';

export const generatePhoto = () => {
  return avatarArr[Math.floor(Math.random() * 10)];
};
