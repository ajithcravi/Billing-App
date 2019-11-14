// Add customer modal code
$(".customerModal").on("show.bs.modal", function(event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var modal = $(this);
  modal.find(".modal-title").text("Customer Details");
});

// Add item modal code
$(".itemModal").on("show.bs.modal", function(event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var modal = $(this);
  modal.find(".modal-title").text("Customer Details");
});

// Get customer details from the add customer form
$(".addCustomerForm").submit(function(event) {
  event.preventDefault();
  let form = $(this);

  //        POST VARIABLES       //
  let customerDetails = form.serializeArray();

  //Clear input fields of the add customer form
  clearInput();
  // form.find(".customerContactNo").val("");
  form.find(".closeModal").trigger("click");

  //        GET VARIABLES       //
  let invoiceNo = 1561395;

  const date = getDate();

  //   Execute these steps once the form is submitted
  //   Remove previously declared divs if available
  $(".customerDetails").remove();
  $(".amountDue").remove();
  $(".addCustomerButton").remove();
  $(".startBilling").remove();

  //   Add or update customer details in customer details section
  $(".customerInvoiceDetails").append(`<div class="customerDetails">
  ${date}<br />
  ${customerDetails[0].value}<br />
  ${customerDetails[1].value}<br />
  Invoice no: ${invoiceNo}<br /> <br />
</div>

<div class="updateCustomerButton">
  <button
  type="button"
  class="btn btn-outline-info btn-lg customDoneButton addCustomerButton"
  data-toggle="modal"
  data-target="#exampleModal"
  data-whatever="@fat"
>
  Update Customer
</button>
</div>`);

  $(
    ".billingSection"
  ).append(`<table id="bill" class="table table-sm table-hover">
  <thead class="heading">
    <tr>
      <th scope="col">S.No</th>
      <th scope="col">Items</th>
      <th scope="col">Category</th>
      <th class="monetaryValue" scope="col">Rate</th>
      <th class="monetaryValue" scope="col">Qty</th>
      <th class="monetaryValue" scope="col">Tax %</th>
      <th class="monetaryValue" scope="col" value=0>Price</th>
    </tr>
  </thead>
  </table>`);

  $(".addItemsOrCheckoutButtons").append(`<button
  id="addItemButton"
  type="button"
  class="btn btn-outline-info btn-lg customDoneButton"
  data-toggle="modal"
  data-target="#exampleModal1"
  data-whatever="@fat"
>
  <i class="fas fa-plus customAddIcon"></i>
  Item
</button>
<br />
<button
  type="button"
  class="btn btn-outline-info btn-lg customAddButton"
>
  <i class="fas fa-check customDoneIcon"></i>
  Checkout
</button>`);
});

$(".addItemForm").submit(function(event) {
  let itemForm = $(this);
  event.preventDefault();
  let rate = 33;
  let tax = 18;

  //        POST VARIABLES       //
  let inputItemDetails = itemForm.serializeArray();
  console.log(inputItemDetails);

  let item = new Item(
    inputItemDetails[0].value,
    inputItemDetails[1].value,
    rate,
    inputItemDetails[2].value,
    tax
  );
  clearInput();
  console.log(item);
  // total = Math.round(total + item.price);
  let total = 0;

  let amountSettled = 0;
  let amountDue = total - amountSettled;

  $(".amountDue").remove();
  $(".summaryAmount").append(`<div class="amountDue">
  <h4>Amount due: ${amountDue}</h4><br />
  </div>`);

  $("#totalRow").remove();
  $("#bill").append(`
  <tbody>
  <tr>
    <td scope="row">${item.sNo}</td>
    <td><span>${item.name}&nbsp;<button type="button" class="btn btn-outline-danger btn-sm"><i class="far fa-trash-alt itemDeleteButton"></i></button></span></td>
    <td>${item.category}</td>
    <td class="monetaryValue">${item.rate}</td>
    <td class="monetaryValue">${item.qty}</td>
    <td class="monetaryValue">${item.tax}</td>
    <td class="monetaryValue priceRow">${item.price}</td>
  </tr>
</tbody>`);

  $(".priceRow").each(function() {
    let value = parseInt($(this).html());
    total += value;
  });

  $("#bill").append(`
  <tr id="totalRow">
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <th class="monetaryValue" scope="row">Total</th>
    <th class="monetaryValue">${total}</th>
  </tr>`);
});

$("#startBillingButton").click(() => {
  $("#navBarButton").trigger("click");
});

// Global functions and classes
// Get tooday's date function
getDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.toLocaleString("default", { month: "short" });
  const day = today.toLocaleString("default", { weekday: "short" });
  const date = today.getDate();
  return `${date} ${month} ${year} - ${day}`;
};

// @Function name         clearInputBoxes
// @Description           This function is to clear the input boxes
// @Usage direction       1. Add class 'clearInput' to the input fields to be cleared. 2. Call the function
// @Example usage         ***** Mention the line where this function is called *****
function clearInput() {
  $(".clearInput").each(function() {
    $(this).val("");
  });
}

class Item {
  constructor(name, category, rate, qty, tax) {
    this.name = name;
    this.category = category;
    this.rate = rate;
    this.qty = qty;
    this.tax = tax;
    this.price =
      Math.round(
        this.rate * this.qty + (this.tax / 100 + this.rate * this.qty) * 100
      ) / 100;
  }
}
