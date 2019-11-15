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

  //        POST VARIABLES       //
  let customerDetails = $(this).serializeArray();
  //        GET VARIABLES       //
  let invoiceNo = 1561395;

  clearInput(); //Clear input fields of the add customer form
  closeModal(); //Close modal

  if ($("table").length == false) {
    //Check if there is a billing table present and execute the following steps (This is to check if the billing has already begun or not)

    $(".addCustomerButton").remove(); //Remove 'Add Customer' button
    $(".startBilling").remove(); //Remove 'Start Billing' button

    updateCustomerDetails(customerDetails, invoiceNo); //Add customer details in customer details section

    createBillTableHeader(); //Add bill table header

    createSummarySectionButtons(); //Create buttons in the summary section
  } else {
    updateCustomerDetails(customerDetails, invoiceNo); //Update customer details in the customer section
  }
});

$(".addItemForm").submit(function(event) {
  event.preventDefault();

  //        POST VARIABLES       //
  let inputItemDetails = $(this).serializeArray();
  console.log(inputItemDetails);

  //        GET VARIABLES       //
  let rate = 33;
  let tax = 18;

  //        CALCULATION VARIABLES       //
  let total = 0;

  let item = new Item(
    inputItemDetails[0].value,
    inputItemDetails[1].value,
    rate,
    inputItemDetails[2].value,
    tax
  );
  clearInput();
  closeModal();

  $("#totalRow").remove();
  $("#bill").append(`
  <tbody>
  <tr>
    <td scope="row" class="serialNoColumn"></td>
    <td><span>${item.name}&nbsp;<button type="button" class="btn btn-outline-danger btn-sm"><i class="far fa-trash-alt itemDeleteButton"></i></button></span></td>
    <td>${item.category}</td>
    <td class="monetaryValue">${item.rate}</td>
    <td class="monetaryValue">${item.quantity}</td>
    <td class="monetaryValue">${item.tax}</td>
    <td class="monetaryValue priceColumn">${item.price}</td>
  </tr>
</tbody>`);

  total = sumOfColumn(".priceColumn", "sum");

  updateAmountDue(total);

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

  updateSerialNo();
});

$("#startBillingButton").click(() => {
  $("#navBarButton").trigger("click");
});

// Function definitions

// @Function name         getDate
// @Description           This function is to get the day, month, year and other information about the present day and display it in Date Month Year - Day format
// @Usage direction       1. Call the function wherever required 2. It returns a value
// @Example usage         ***** Mention the line where this function is called *****
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
clearInput = () => {
  $(".clearInput").each(function() {
    $(this).val("");
  });
};

// @Function name         closeModal
// @Description           This function is to close the currently opened modal
// @Usage direction       1. Add class 'closeModal' to the close buttons of the modals. 2. Call the function
// @Example usage         ***** Mention the line where this function is called *****
closeModal = () => {
  $(".closeModal").trigger("click");
};

// @Function name         updateCustomerDetails
// @Input Arguments       1. Array containing the input data from the form 2. Invoice number
// @Description           This function will add customer details to the customer details section
// @Usage direction       1. Add class 'customerInvoiceDetails' to the division where the customer details has to be rendered. 2. Call the function
// @Example usage         ***** Mention the line where this function is called *****
updateCustomerDetails = (formDetailsArray, invoiceNo) => {
  $(".updateCustomerButton").remove();
  $(".customerDetails").remove();
  $("#customerFormSubmitButton").attr("value", "Update Customer");
  const date = getDate();
  $(".customerInvoiceDetails").append(`<div class="customerDetails">
  ${date}<br />
  ${formDetailsArray[0].value}<br />
  ${formDetailsArray[1].value}<br />
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
};

// @Function name         createSummarySectionButtons
// @Description           This function will add three buttons to the summary section 1. Add item button 2. Checkout button 3. Cancel button
// @Usage direction       1. Add class 'addItemsOrCheckoutButtons' to the division where the buttons has to be rendered 2. Call the function
// @Example usage         ***** Mention the line where this function is called *****
createSummarySectionButtons = () => {
  $(".addItemsOrCheckoutButtons").append(`<button
  type="button"
  class="btn btn-outline-info btn-lg customDoneButton summaryButtons"
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
  class="btn btn-outline-info btn-lg customAddButton summaryButtons"
>
  <i class="fas fa-check customDoneIcon"></i>
  Checkout
</button> <br />
<button
  type="button"
  class="btn btn-outline-danger btn-lg summaryButtons"
>
<i class="fas  fa-times"></i>
  Cancel
</button>`);
};

// @Function name         createBillTableHeader
// @Description           This function will create bill table header to the billing section
// @Usage direction       1. Add class 'billingSection' to the division where the bill has to be rendered 2. Call the function
// @Example usage         ***** Mention the line where this function is called *****
createBillTableHeader = () => {
  $(".billingSection")
    .append(`<table id="bill" class="table table-sm table-hover">
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
};

// @Function name         updateAmountDue
// @Description           This function will update the amount due in the summary section
// @Usage direction       1. Add class '.summaryAmount' to the division where the amount has to be rendered 2. Call the function
// @Example usage         ***** Mention the line where this function is called *****
updateAmountDue = dueValue => {
  $(".amountDue").remove(); //Remove the preexisting due value
  $(".summaryAmount").append(`<div class="amountDue">
<h4>Amount due: ${dueValue}</h4><br />
</div>`);
};

// @Function name         sumOfColumn
// @Input arguments       1. columnClassName : classname of the column in the form of css identifiers 2. request(optional) : sum - to return sum of the colummn or leave it empty to return number of rows
// @Input arguments type  1. string 2. string
// @Description           This function will calculate sum of a given column
// @Usage direction       1. Add a class name to each and every element of the column 2. Call the function passing the class name as input argument
// @Example usage         ***** Mention the line where this function is called *****
sumOfColumn = (columnClassName, request) => {
  let sum = 0;
  let count = 0;
  $(columnClassName).each(function() {
    let value = parseFloat($(this).html());
    sum += value;
    count++;
  });

  if (request === "sum") {
    return Math.round(sum);
  } else {
    return count;
  }
};

// @Function name         updateSerialNo
// @Description           This function will update the serial number a given column
// @Usage direction       1. Add a class name to each and every element of the column 2. Call the function passing the class name as input argument
// @Example usage         ***** Mention the line where this function is called *****
updateSerialNo = () => {
  $(".serialNumber").remove();
  let count = 0;
  $(".serialNoColumn").each(function() {
    count++;
    console.log(count);
    $(this).append(`<p class="serialNumber">${count}</p>`);
  });
};

//Class definitions
class Item {
  constructor(name, category, rate, quantity, tax) {
    this.name = name;
    this.category = category;
    this.rate = rate;
    this.quantity = quantity;
    this.tax = tax;
    this.price =
      Math.round(
        (this.rate * this.quantity +
          (this.tax / 100) * this.rate * this.quantity) *
          100
      ) / 100;
  }
}
