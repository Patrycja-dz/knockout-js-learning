function SeatReservation(name, initialMeal, text) {
  var self = this;
  self.name = name;
  self.meal = ko.observable(initialMeal);
  self.message = ko.observable(text);

  self.formattedPrice = ko.computed(function () {
    const price = self.meal().price;
    return price ? "$" + price.toFixed(2) : "none";
  });
}

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
  var self = this;

  // Non-editable catalog data - would come from the server
  self.availableMeals = [
    { mealName: "Standard (sandwich)", price: 0 },
    { mealName: "Premium (lobster)", price: 34.95 },
    { mealName: "Ultimate (whole zebra)", price: 290 },
  ];
  self.messages = ["Thank you", "It's not my order", "One more please"];
  // Editable data
  self.seats = ko.observableArray([
    new SeatReservation("Steve", self.availableMeals[1], self.messages[0]),
    new SeatReservation("Bert", self.availableMeals[2], self.messages[1]),
    new SeatReservation("Emily", self.availableMeals[0], self.messages[2]),
  ]);

  self.addSeat = function () {
    self.seats.push(
      new SeatReservation("Louis", self.availableMeals[2], self.messages[0])
    );
  };
  self.removeSeat = function (seat) {
    self.seats.remove(seat);
  };
  self.totalSurcharge = ko.computed(function () {
    let total = 0;
    for (let i = 0; i < self.seats().length; i++) {
      total += self.seats()[i].meal().price;
    }

    return total;
  });
  self.firstName = ko.observable("Bert");
  self.lastName = ko.observable("Bertington");
}

ko.applyBindings(new ReservationsViewModel());
