import type { DatabasePool } from "slonik";

declare global {
  type NewContact = {
    firstName: string;
    lastName: string;
    phone: string;
  }

  type Contact = {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
  };

  interface IContactStore {
    db: DatabasePool; 
    getContacts: () => Promise<readonly Contact[]>
    addContact: (firstName: string, lastName: string, phone: string) => Promise<Contact>
    editContact: (id: number, firstName: string, lastName: string, phone: string) => Promise<Contact>
    deleteContact: (id: number) => Promise<Contact>
  }

  type ResolverContext = {
    store: IContactStore
  }
}

export {};
