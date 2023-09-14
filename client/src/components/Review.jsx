import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { AddressContext } from '../contexts/CheckoutContext';

// {
//   name: 'Product 1',
//   desc: 'A nice thing',
//   price: '$9.99',
// },

// const addresses = [
//   '1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'
// ];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

export default function Review() {
  const { carrito } = useContext(AuthContext);
  const { addresses } = useContext(AddressContext);
  const userId = localStorage.getItem("userId");
  // const [addresses, setAddresses] = useState([]);
  
console.log("carrito---------", carrito);
console.log("userId--------------", userId);
console.log("ADDRESSES--------------", addresses);

const products = [
  carrito.books.map(e=> ({
    name: e.title.slice(0, 35) + "...",
    desc: e.description ? e.description.slice(0, 20) + "..." : "",
    price: e.price
  })),
  // { name: 'Shipping', desc: '', price: 'Free' },
];
console.log("products---------", products);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products[0].map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{"$" + product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {"$" + carrito.cart.price}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>Andreani</Typography>
          {/* <Typography gutterBottom>{addresses.join(', ')}</Typography> */}
          <ul>
            {addresses.map((address, index) => (
              <li key={index}>
                {address.address1}, {address.city}, {address.state}, {address.zip}, {address.country}
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          
          {/* <AddressForm setAddresses={setAddresses} /> */}

          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
