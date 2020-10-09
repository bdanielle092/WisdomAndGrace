import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { QuoteContext } from "../providers/QuoteProvider";

export default function QuoteAddForm() {
  //useHistory give access to the history instance that you may use to navigate
  const history = useHistory();
  //useContext provides a way to pass data through the component tree without having to pass props down 
  //manually at every level
  //declare a  var called add quote and gets the prop from quoteContext.  addquote is an object. The addQuote is in our provider. 
  const { addQuote } = useContext(QuoteContext);
  //useState is a hook that lets you add react state to function components
  //declare a var called quoteText, we setQuoteText so we can update the current quote
  const [quoteText, setQuoteText] = useState();
  //submit form is a function and we are passing e or event 
  const submitForm = (e) => {
    //this is prevent the browser from reloading by default
    e.preventDefault();
    // key is text / value is quoteText 
    addQuote({ text: quoteText })
      // then we are going back to the quote page
      .then(() => history.push("/"))
      //we are catching the error and if there an error we show this err.message
      .catch((err) => alert(`An error ocurred: ${err.message}`));
  };
  //return the submit form
  //this is the label that is displayed for quote
  //we want to change the quote text, its a textarea, we are updating the quoteText
  //the onchange is where we are saving the data. The onChange detects when the value of an input element is changed 
  //then we push the save button
  return (
    <Form onSubmit={submitForm}>
      <FormGroup>
        <Label for="quoteText">Quote</Label>
        <Input id="quoteText" type="textarea" onChange={e => setQuoteText(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Button>Save</Button>
      </FormGroup>
    </Form>
  );
}