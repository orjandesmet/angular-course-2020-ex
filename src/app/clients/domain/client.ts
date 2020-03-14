export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  city: string;
  zip: string;
}
export function clientFullName(client: Client) {
  return `${client.firstName} ${client.lastName}`;
}
