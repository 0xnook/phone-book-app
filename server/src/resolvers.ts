export const resolvers = {
  Query: {
    contacts: async (_parent: any, _args: any, context: ResolverContext) => {
      return await context.store.getContacts();
    },
  },
  Mutation: {
    createContact: async (
      _parent: any,
      args: NewContact,
      context: ResolverContext
    ) => {
      return await context.store.addContact(
        args.firstName,
        args.lastName,
        args.phone
      );
    },
    editContact: async (
      _parent: any,
      args: Contact,
      context: ResolverContext
    ) => {
      return await context.store.editContact(
        args.id,
        args.firstName,
        args.lastName,
        args.phone
      );
    },
    deleteContact: async (
      _parent: any,
      args: {id: number},
      context: ResolverContext
    ) => {
      return await context.store.deleteContact(
        args.id
      );
    },
  },
};
