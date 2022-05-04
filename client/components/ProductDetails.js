import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { addCartItem } from "../store/cart-item";
import { updateProduct } from "../store/products";
import UpdateProduct from "./UpdateProduct";
import { addGuestCartItem } from "./AddGuestCartItem";

const ProductDetails = (props) => {
  const { addCartItem, book, isAdmin } = props;
  if (!book) {
    return null;
  }
  let quantity = 1;
  const inventory = new Array(10);
  for (let i = 0; i < inventory.length; i++) {
    inventory[i] = i + 1;
  }

  //can add isLoggedin ? to seperate addtocart or addtoguestcart
  return (
    <div>
      <div>Book: {book.name}</div>
      <div> Author: {book.author} </div>
      <div>Price: {book.price}</div>
      <div> Category: {book.categoryId} </div>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          props.isLoggedin.id
            ? addCartItem(book.id, quantity)
            : addGuestCartItem(book, quantity * 1);
        }}
      >
        <select onChange={(ev) => (quantity = ev.target.value)}>
          {inventory.map((inv) => {
            return (
              <option value={inv} key={inv}>
                {inv}
              </option>
            );
          })}
        </select>
        <button type="submit">Add to cart</button>
      </form>
      <div>
        {isAdmin ? (
          <Route path="/products/:id" component={UpdateProduct} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

//addCartItem(book.id)

const mapStateToProps = (state, { match }) => {
  return {
    isLoggedin: state.auth,
    isAdmin: state.auth.admin,
    products: state.products,
    book: state.products.find((book) => book.id === parseInt(match.params.id)),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCartItem: (bookId, quantity) => dispatch(addCartItem(bookId, quantity)),
    update: async (book) => await dispatch(updateProduct(book)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
