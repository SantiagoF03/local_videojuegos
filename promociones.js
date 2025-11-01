function money(n) {
  try {
    return n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
  } catch {
    return `$${Math.round(n)}`;
  }
}

function getPrice(selectEl) {
  const opt = selectEl.options[selectEl.selectedIndex];
  const p = Number(opt.getAttribute('data-price')) || 0;
  return p;
}

function calcPromoA() {
  const prod = document.getElementById('productoA');
  const cant = Number(document.getElementById('cantidadA').value) || 0;
  const price = getPrice(prod);

  const subtotal = price * cant;
  const pares = Math.floor(cant / 2);
  const descuento = pares * (price * 0.5);
  const total = Math.max(0, subtotal - descuento);

  document.getElementById('subtotalA').textContent = money(subtotal);
  document.getElementById('descuentoA').textContent = `${money(descuento)}`;
  document.getElementById('totalA').textContent = money(total);
}

function calcPromoB() {
  const prod = document.getElementById('productoB');
  const cant = Number(document.getElementById('cantidadB').value) || 0;
  const price = getPrice(prod);

  const subtotal = price * cant;
  const gratis = Math.floor(cant / 3);
  const descuento = gratis * price;
  const total = Math.max(0, subtotal - descuento);

  document.getElementById('subtotalB').textContent = money(subtotal);
  document.getElementById('descuentoB').textContent = `${money(descuento)}`;
  document.getElementById('totalB').textContent = money(total);
}

function calcPromoC() {
  const prod = document.getElementById('productoC');
  const cant = Number(document.getElementById('cantidadC').value) || 0;
  const price = getPrice(prod);

  const subtotal = price * cant;
  const descuento = subtotal >= 900000 ? subtotal * 0.10 : 0;
  const total = Math.max(0, subtotal - descuento);

  document.getElementById('subtotalC').textContent = money(subtotal);
  document.getElementById('descuentoC').textContent = descuento ? `${money(descuento)}` : money(0);
  document.getElementById('totalC').textContent = money(total);
}

function bindEvents() {
  [['productoA','cantidadA', calcPromoA],
   ['productoB','cantidadB', calcPromoB],
   ['productoC','cantidadC', calcPromoC]].forEach(([selId, qtyId, fn]) => {
    const s = document.getElementById(selId);
    const q = document.getElementById(qtyId);
    s.addEventListener('change', fn);
    q.addEventListener('input', fn);
    fn()
  });
}

document.addEventListener('DOMContentLoaded', bindEvents);
