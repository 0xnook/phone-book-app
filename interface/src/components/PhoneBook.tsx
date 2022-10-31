import { useState } from "react";
import type { Dispatch, ChangeEvent } from "react";

import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";

import {
  Contacts as ContactsIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

import type { Contact } from "../graphql/generated";
import { PhoneBookContext } from "./PhoneBookContext";

import ContactList from "./ContactList";
import ContactFormModal from "./ContactFormModal";

function PhoneBook() {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [contactToEdit, setContactToEdit] = useState(undefined) as [
    Contact | undefined,
    Dispatch<Contact | undefined>
  ];

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <PhoneBookContext.Provider
      value={{
        modalOpen,
        setModalOpen,
        contactToEdit,
        setContactToEdit,
        searchTerm,
      }}
    >
      <Container sx={{ mt: "2rem" }} maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            mb: "2rem",
          }}
        >
          <ContactsIcon fontSize="large" />
          <Typography sx={{ fontWeight: "500" }} variant="h4">
            Phone Book App
          </Typography>
        </Box>

        <Box
          sx={{ display: "flex", justifyContent: "space-between", mb: "1rem" }}
        >
          <Typography sx={{ fontWeight: "500" }} variant="h5">
            Contacts
          </Typography>
          <Button
            sx={{ textTransform: "none" }}
            variant="contained"
            onClick={() => setModalOpen(true)}
          >
            + Add Contact
          </Button>
        </Box>

        <TextField
          sx={{ background: "white", mb: "1.5rem" }}
          fullWidth={true}
          size="small"
          value={searchTerm}
          onInput={handleInput}
          placeholder="Search for contact by last name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <ContactList />

        <ContactFormModal />
      </Container>
    </PhoneBookContext.Provider>
  );
}

export default PhoneBook;
