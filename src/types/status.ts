export interface StatusRoot {
  success: boolean;
  uuid: string;
  session: Session;
}

export interface Session {
  online: boolean;
}
