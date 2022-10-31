import { sql, NotFoundError } from "slonik";

import type { DatabasePool, DatabasePoolConnection } from "slonik";

class ContactValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

function validateContact(c: Contact | NewContact) {
  if (!c.firstName) {
    throw new ContactValidationError("First name cannot be empty.");
  }
  if (c.firstName.length > 19) {
    throw new ContactValidationError("First name is too long.");
  }
  if (!c.lastName) {
    throw new ContactValidationError("Last name cannot be empty.");
  }
  if (c.lastName.length > 19) {
    throw new ContactValidationError("Last name is too long.");
  }
  if (!/^\d{10}$/.test(c.phone)) {
    throw new ContactValidationError("Invalid phone number.");
  }
}

export class ContactStore implements IContactStore {
  db: DatabasePool;

  constructor(db: DatabasePool) {
    this.db = db;
  }

  async getContacts(): Promise<readonly Contact[]> {
    try {
      const contacts = await this.db.connect(
        async (conn: DatabasePoolConnection) => {
          return await conn.many(
            sql<Contact>`
            SELECT * FROM contact
            ORDER BY id;
            `
          );
        }
      );
      return contacts;
    } catch (e) {
      if (!(e instanceof NotFoundError)) {
        throw e;
      } else {
        return [];
      }
    }
  }

  async addContact(
    firstName: string,
    lastName: string,
    phone: string
  ): Promise<Contact> {
    validateContact({firstName, lastName, phone});
    const newContact = await this.db.connect(
      async (conn: DatabasePoolConnection) => {
        return await conn.one(
          sql<Contact>`
          INSERT INTO contact (first_name, last_name, phone) 
          VALUES (${firstName}, ${lastName}, ${phone})
          RETURNING *;
          `
        );
      }
    );
    return newContact;
  }

  async editContact(
    id: number,
    firstName: string,
    lastName: string,
    phone: string
  ): Promise<Contact> {
    validateContact({id, firstName, lastName, phone});
    const editedContact = await this.db.connect(
      async (conn: DatabasePoolConnection) => {
        return await conn.one(
          sql<Contact>`
          UPDATE contact 
          SET 
            first_name=${firstName},
            last_name=${lastName},
            phone=${phone}
          WHERE id=${id}
          RETURNING *;
          `
        );
      }
    );
    return editedContact;
  }

  async deleteContact(id: number): Promise<Contact> {
    const deletedContact = await this.db.connect(
      async (conn: DatabasePoolConnection) => {
        return await conn.one(
          sql<Contact>`
          DELETE FROM contact 
          WHERE id=${id}
          RETURNING *;
          `
        );
      }
    );
    return deletedContact;
  }
}
