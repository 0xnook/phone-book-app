import { createContext } from "react";
import type { Contact } from "../graphql/generated";

interface PhoneBookContextProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  contactToEdit?: Contact;
  setContactToEdit: (contact?: Contact) => void;
  searchTerm: string;
}

export const PhoneBookContext = createContext<PhoneBookContextProps>({
  modalOpen: false,
  setModalOpen: () => {},
  setContactToEdit: () => {},
  searchTerm: "",
});

export default PhoneBookContext;
