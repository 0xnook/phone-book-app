import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";

import { Fragment, useContext } from "react";

import { useQueryClient } from "@tanstack/react-query";

import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from "../graphql/generated";

import type { Contact } from "../graphql/generated";

import PhoneBookContext from "./PhoneBookContext";

function ContactList() {
  const { isLoading, error, data } = useGetContactsQuery({});
  const queryClient = useQueryClient();
  const { setModalOpen, setContactToEdit, searchTerm } =
    useContext(PhoneBookContext);

  const deleteContact = useDeleteContactMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["getContacts"]);
    },
  });

  const handleDelete = (id: string) => {
    deleteContact.mutate({ id });
  };

  const handleEdit = (contact: Contact) => {
    setContactToEdit(contact);
    setModalOpen(true);
  };

  const filteredContacts = data?.contacts.filter((c: Contact) => {
    if (searchTerm === "") {
      return c;
    } else {
      const sT = searchTerm.toLowerCase();
      return (
        c.firstName.toLowerCase().includes(sT) ||
        c.lastName.toLowerCase().includes(sT) ||
        c.phone.includes(sT)
      );
    }
  });

  return (
    <List
      sx={{
        border: 1,
        borderColor: "#bdbdbd",
        borderRadius: 1,
        backgroundColor: "white",
      }}
      disablePadding={true}
      aria-label="contact list"
    >
      <>
        {isLoading && (
          <ListItem
            key={"list-loading"}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <CircularProgress />
          </ListItem>
        )}
      </>

      <>
        {error && (
          <ListItem
            key={"list-error"}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <ErrorIcon />
            <Typography>Oops, there was an error fetching contacts</Typography>
          </ListItem>
        )}
      </>

      {!error && !isLoading && data?.contacts?.length === 0 && (
        <ListItem
          key={"list-error"}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Typography>Add a new contact to get started</Typography>
        </ListItem>
      )}

      <>
        {!error &&
          !isLoading &&
          filteredContacts &&
          filteredContacts.map((c) => (
            <Fragment key={c.id}>
              <ListItem key={c.id}>
                <ListItemText
                  primary={`${c.firstName} ${c.lastName}`}
                  primaryTypographyProps={{
                    fontWeight: "500",
                    style: { textOverflow: "ellipsis" },
                  }}
                  secondary={`📞 ${c.phone.replace(
                    /(\d{3})(\d{3})(\d{4})/,
                    "$1-$2-$3"
                  )}`}
                />
                <Button
                  sx={{ minWidth: 0, maxWidth: "2.4rem" }}
                  variant="contained"
                  onClick={() => {
                    handleEdit(c);
                  }}
                >
                  <EditIcon />
                </Button>
                &nbsp;
                <Button
                  sx={{ minWidth: 0, maxWidth: "2.4rem" }}
                  color="error"
                  variant="contained"
                  onClick={() => {
                    handleDelete(c.id);
                  }}
                >
                  <DeleteIcon />
                </Button>
              </ListItem>
              <Divider />
            </Fragment>
          ))}
      </>
    </List>
  );
}

export default ContactList;
