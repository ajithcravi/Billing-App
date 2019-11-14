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

$("")

$("#startBillingButton").click(() => {
  $("#navBarButton").trigger("click");
});

$("#addItemButton").on("click", () => {
  $("#totalRow").remove();

  $("#bill").append(`
  <tbody>
  <tr>
    <td scope="row">1</td>
    <td>Milk</td>
    <td>500 ml</td>
    <td class="monetaryValue">26</td>
    <td class="monetaryValue">2</td>
    <td class="monetaryValue">0</td>
    <td class="monetaryValue">52</td>
  </tr>
  <tr id="totalRow">
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <th class="monetaryValue" scope="row">Total</th>
    <th class="monetaryValue">377</th>
  </tr>
</tbody>`);
});

// Global functions
// Get tooday's date function
getDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.toLocaleString("default", { month: "short" });
  const day = today.toLocaleString("default", { weekday: "short" });
  const date = today.getDate();
  return `${date} ${month} ${year} - ${day}`;
};
