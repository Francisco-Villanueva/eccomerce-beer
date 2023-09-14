import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState, useContext } from "react";
import { CheckoutContext } from "../contexts/CheckoutContext";

export default function AddressForm() {
  const { addresses, setAddresses } = useContext(CheckoutContext);
  
  const [formData, setFormData] = useState({
    address1: "",
    lastName: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const handleChangeAddress = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSaveAddress =()=>{
    setAddresses([...addresses, formData]);

    setFormData({
      address1: "",
      lastName: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    });
  };

  return (
    <React.Fragment>
      <Typography
        variant="h6"
        gutterBottom
        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        Shipping address
      </Typography>
      <Grid
        container
        spacing={3}
        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            value={formData.address1}
            onChange={handleChangeAddress}
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            value={formData.city}
            onChange={handleChangeAddress}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            value={formData.state}
            onChange={handleChangeAddress}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            value={formData.zip}
            onChange={handleChangeAddress}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            value={formData.country}
            onChange={handleChangeAddress}
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                name="saveAddress"
                value="yes"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              />
            }
            label="Use this address for payment details"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            onChange={(e) => e.target.checked && handleSaveAddress()}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
