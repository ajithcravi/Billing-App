let serialNo = 0;
let total = 0;

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
  form.find(".customerName").val("");
  form.find(".customerContactNo").val("");
  form.find(".closeModal").trigger("click");

  //        GET VARIABLES       //
  let invoiceNo = 1561395;
  let amountDue = 350;

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

  $(".summaryAmount").append(`<div class="amountDue">
<h4>Amount due: ${amountDue}</h4><br />
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
      <th class="monetaryValue" scope="col">Price</th>
    </tr>
  </thead>
  </table>`);
});

$(".addItemForm").submit(function(event) {
  let itemForm = $(this);
  serialNo += 1;
  event.preventDefault();
  let rate = 33;
  let tax = 18;

  //        POST VARIABLES       //
  let inputItemDetails = itemForm.serializeArray();

  let item = new Item(
    serialNo,
    inputItemDetails[0].value,
    inputItemDetails[1].value,
    rate,
    inputItemDetails[2].value,
    tax
  );
  console.log(item);
  total = Math.round(total + item.price);

  $("#totalRow").remove();
  $("#bill").append(`
  <tbody>
  <tr>
    <td scope="row">${item.sNo}</td>
    <td>${item.name}</td>
    <td>${item.category}</td>
    <td class="monetaryValue">${item.rate}</td>
    <td class="monetaryValue">${item.qty}</td>
    <td class="monetaryValue">${item.tax}</td>
    <td class="monetaryValue price">${item.price}</td>
  </tr>
  <tr id="totalRow">
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <th class="monetaryValue" scope="row">Total</th>
    <th class="monetaryValue">${total}</th>
  </tr>
</tbody>`);
});

$("#startBillingButton").click(() => {
  $("#navBarButton").trigger("click");
});

$("#addItemButton").on("click", () => {});

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

class Item {
  constructor(sNo, name, category, rate, qty, tax) {
    this.sNo = sNo;
    this.name = name;
    this.category = category;
    this.rate = rate;
    this.qty = qty;
    this.tax = tax;
    this.price = this.rate * this.qty + (this.tax / 100 + this.rate * this.qty);
  }
}
