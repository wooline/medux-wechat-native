export interface CurUser {
  id: string;
  username: string;
  hasLogin: boolean;
  avatar: string;
  expired?: number;
}
