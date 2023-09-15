import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useContext } from 'react';
import { CheckoutContext } from '../contexts/CheckoutContext';

export default function PaymentForm() {
  const { payment, setPayment} = useContext(CheckoutContext);

  // const [formData, setFormData] = useState({
  //   cardName: "",
  //   cardNumber: "",
  //   expDate: "",
  //   cvv: "",
  // });
console.log("payment 1----", payment);
  const updatePayment = (name, value) => {
console.log("payment 2----", payment);

    setPayment((prevPayment) => {
console.log("payment 3----", payment);

      if (Array.isArray(prevPayment)) {
        const updatedPayment = prevPayment.map((paymentField) => {
          console.log("paymentField.name:", paymentField.name);
          console.log("name:", name);
      
          if (paymentField.name === name) {
            return { name, detail: value };
          }
          return paymentField;
        });
      } else {
        console.log("prevPayment is not an array:", prevPayment);
console.log("payment 4----", payment);

      }
      // console.log("updatedPayment-----", updatedPayment);
      // return updatedPayment;
    });
  };


  const handleInputChange = (e) => {
console.log("payment 5----", payment);

    const { name, value } = e.target;
    console.log("Input change:------", name, value);
    updatePayment(name, value);
console.log("payment 6----", payment);

  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            name="cardName"
            // value={payment.cardName}
            onChange={handleInputChange}
            style={{color: "black"}}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            name="card Number"
            // value={payment.cardNumber}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            name="Expiry date"
            // value={payment.expDate}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            name="CVV"
            // value={payment.cvv}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}