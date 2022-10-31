import { useContext, useState, useEffect } from "react";

import type { ChangeEvent } from "react";

import {
  Typography,
  Box,
  Modal,
  Backdrop,
  Fade,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

import PhoneBookContext from "./PhoneBookContext";

import MaskedPhoneInput from "./MaskedPhoneInput";

import { useQueryClient } from "@tanstack/react-query";

import { useCreateContactMutation } from "../graphql/generated";

const modalStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  position: "absolute" as "absolute",
  top: "35%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "min(12rem, 55vw)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface FormState {
  firstName: string;
  lastName: string;
  phone: string;
}

type FormErrors = FormState;

// reused for form errors object
const initialFormState = {
  firstName: "",
  lastName: "",
  phone: "",
};

function ContactForm() {
  const { modalOpen, setModalOpen, contactToEdit, setContactToEdit } =
    useContext(PhoneBookContext);
  const [formValues, setFormValues] = useState<FormState>(
    contactToEdit ?? initialFormState
  );
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormState);

  useEffect(() => {
    if (contactToEdit) {
      setFormValues(() => ({ ...contactToEdit }));
    }
  }, [contactToEdit]);

  const queryClient = useQueryClient();

  const createContact = useCreateContactMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["getContacts"]);
      handleClose();
    },
  });

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
    // clear errors
    setFormErrors({
      ...initialFormState,
      [event.target.name]: "",
    });
  };

  const handleSumbit = () => {
    if (validateInput()) {
      createContact.mutate(formValues);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    setContactToEdit(undefined);
    setFormValues(initialFormState);
  };

  const validateInput = () => {
    let formErrs: FormErrors = { ...initialFormState };
    if (!formValues.firstName) {
      formErrs.firstName = "First name cannot be empty!";
    }
    if (formValues.firstName.length > 19) {
      formErrs.firstName = "First name is too long!";
    }
    if (!formValues.lastName) {
      formErrs.lastName = "Last name cannot be empty!";
    }
    if (formValues.lastName.length > 19) {
      formErrs.firstName = "Last name is too long!";
    }
    if (!/^\d{10}$/.test(formValues.phone)) {
      formErrs.phone = "Invalid phone number!";
    }
    if (formErrs.firstName || formErrs.lastName || formErrs.phone) {
      setFormErrors(formErrs);
      return false;
    }
    return true;
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={modalOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 100,
      }}
    >
      <Fade in={modalOpen}>
        <Box sx={modalStyle}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {" "}
            Add new contact
          </Typography>
          <TextField
            value={formValues.firstName}
            onInput={handleInput}
            name="firstName"
            id="contact-first-name"
            label="First name"
            error={formErrors.firstName !== ""}
            helperText={formErrors.firstName}
          />
          <TextField
            value={formValues.lastName}
            onInput={handleInput}
            name="lastName"
            id="contact-last-name"
            label="Last name"
            error={formErrors.lastName !== ""}
            helperText={formErrors.lastName}
          />

          <MaskedPhoneInput
            value={formValues.phone}
            errorMsg={formErrors.phone}
            onChange={handleInput}
          />

          {createContact.isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )}

          {!createContact.isLoading && (
            <Button
              onClick={handleSumbit}
              sx={{ textTransform: "none" }}
              variant="contained"
            >
              Confirm
            </Button>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}

export default ContactForm;
