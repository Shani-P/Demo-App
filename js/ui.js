const reservations = document.querySelector('.reservations');
document.addEventListener('DOMContentLoaded', function(){

    //access nav menu
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'left'});

    //access add reservation form
    const forms = document.querySelectorAll('.side-form');
    M.Sidenav.init(forms, {edge: 'right'});

});

  // render reservation data
export const renderReservation = (data, name, time, date) => {

    const html = `
      <div class="card-panel reservation white row" data-id="${name}">
        <img src="img/user.png" alt="Reservation 1">
        <div class="reservation-details">
          <div class="customer-name">${data.name}</div>
          <div class="reservation-time">${data.time}</div>
          <div class="reservation-date">${data.date}</div>
        </div>
        <div class="reservation-delete">
          <i class="material-icons" data-id="${name}">delete_outline</i>
        </div>
      </div>
    `;

    reservations.innerHTML += html;
}

// remove item from list
export const removeReservation = (name) => {
    const reservation = document.querySelector(`.reservation[data-id=${name}]`);
    reservation.remove();
};